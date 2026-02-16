import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

import { client } from '@/shared/api/client';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { NotificationViewDto } from '@/shared/ui/notifications/types';

import { Message, MessageSendRequest, WebSocketConfig, WebSocketError, WebSocketMetrics } from './types';

const WS_EVENT_PATH = {
  NOTIFICATIONS: 'notifications',
  UNREAD_COUNT: 'unread_count',
  BULK_NOTIFICATIONS: 'bulk_notifications',
  NOTIFICATION_DELETED: 'notification_deleted',
  RECEIVE_MESSAGE: 'receive_message',
  MESSAGE_SEND: 'message_send',
  UPDATE_MESSAGE: 'update_message',
  MESSAGE_DELETED: 'message_deleted',
  ERROR: 'error',
} as const;

interface WebSocketConnectionConfig {
  url: string;
  path: string;
  query: Record<string, string>;
  transports: string[];
  reconnection: boolean;
  reconnectionAttempts: number;
  reconnectionDelay: number;
  timeout: number;
}

// Тип для обработчиков событий WebSocket
interface WebSocketMessageHandler {
  [WS_EVENT_PATH.NOTIFICATIONS]: (data: unknown) => void;
  [WS_EVENT_PATH.UNREAD_COUNT]: (data: unknown) => void;
  [WS_EVENT_PATH.BULK_NOTIFICATIONS]: (data: unknown) => void;
  [WS_EVENT_PATH.NOTIFICATION_DELETED]: (data: unknown) => void;
  [WS_EVENT_PATH.RECEIVE_MESSAGE]: (data: unknown) => void;
  [WS_EVENT_PATH.MESSAGE_SEND]: (data: unknown) => void;
  [WS_EVENT_PATH.UPDATE_MESSAGE]: (data: unknown) => void;
  [WS_EVENT_PATH.MESSAGE_DELETED]: (data: unknown) => void;
  [WS_EVENT_PATH.ERROR]: (data: unknown) => void;
  disconnect: (reason: string) => void;
  connect_error: (error: unknown) => void;
  connect: () => void;
  pong: (latency: number) => void;
  notification: (data: unknown) => void;
  new_notification: (data: unknown) => void;
  newNotification: (data: unknown) => void;
  ping: () => void;
  [key: string]: (data: unknown) => void;
}

export interface NotificationWebSocketService {
  isConnected: boolean;
  error: WebSocketError | null;
  notifications: NotificationViewDto[];
  unreadCount: number;
  showToast: boolean;
  metrics: WebSocketMetrics;
  config: WebSocketConfig;
  messages: Message[];

  connect: (token: string) => void;
  disconnect: () => void;
  markAsRead: (ids: number[]) => void;
  markAllAsRead: () => void;
  addNotification: (notification: NotificationViewDto, showToast?: boolean) => void;
  updateUnreadCount: () => void;
  deleteNotification: (id: number) => void;
  setShowToast: (show: boolean) => void;
  getMetrics: () => WebSocketMetrics;
  validateMessage: (message: unknown) => boolean;
  sendMessage: (message: MessageSendRequest, receiverId: number) => void;
  updateMessage: (id: number, message: string) => void;
  deleteMessage: (id: number) => void;
  getMessages: () => Message[];
  cleanup: () => void;
}

export const useNotificationWSStore = create<NotificationWebSocketService>((set, get) => {
  let socket: Socket | null = null;
  let savedToken: string | null = null;
  let pingInterval: NodeJS.Timeout | null = null;
  let lastConnectionAttempt: number = 0;
  let retryCount: number = 0;
  let messages: Message[] = [];

  const config: WebSocketConfig = {
    url: process.env.NEXT_PUBLIC_WS_URL || 'https://inctagram.work',
    path: '/socket.io',
    pingInterval: 30000,
    maxRetries: 10,
    retryDelay: 1000,
    maxRetryDelay: 30000,
    timeout: 10000,
  };

  const metrics: WebSocketMetrics = {
    connectionAttempts: 0,
    successfulConnections: 0,
    failedConnections: 0,
    messagesReceived: 0,
    messagesSent: 0,
    averageLatency: 0,
    currentLatency: 0,
  };

  const log = (level: 'debug' | 'info' | 'warn' | 'error', message: string, data?: unknown) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    if (process.env.NODE_ENV === 'production' && level === 'error') {
      // В production режиме отправляем ошибки на сервер
      if (typeof window !== 'undefined') {
        (window as Record<string, unknown>).gtag('event', 'websocket_error', {
          event_category: 'error',
          event_label: message,
          value: data ? JSON.stringify(data) : null,
        });
      }
    }

    // В development режиме можно использовать console.log для отладки
    if (process.env.NODE_ENV !== 'production') {
      if (data) {
        log('debug', logEntry, data);
      } else {
        log('debug', logEntry);
      }
    }
  };

  const validateObject = (data: unknown, requiredKeys: string[]): data is Record<string, unknown> => {
    if (typeof data !== 'object' || data === null) return false;
    const obj = data as Record<string, unknown>;
    return requiredKeys.every((key) => key in obj);
  };

  const validateNotification = (data: unknown): data is NotificationViewDto => {
    if (!validateObject(data, ['id', 'message', 'isRead', 'createdAt'])) return false;
    const notification = data as NotificationViewDto;
    return (
      typeof notification.id === 'number' &&
      typeof notification.message === 'string' &&
      typeof notification.isRead === 'boolean' &&
      typeof notification.createdAt === 'string'
    );
  };

  const validateMessage = (data: unknown): data is Message => {
    if (
      !validateObject(data, [
        'id',
        'ownerId',
        'receiverId',
        'messageText',
        'status',
        'messageType',
        'createdAt',
        'updatedAt',
      ])
    )
      return false;
    const message = data as Message;
    return (
      typeof message.id === 'number' &&
      typeof message.ownerId === 'number' &&
      typeof message.receiverId === 'number' &&
      typeof message.messageText === 'string' &&
      typeof message.status === 'string' &&
      typeof message.messageType === 'string' &&
      typeof message.createdAt === 'string' &&
      typeof message.updatedAt === 'string'
    );
  };

  const validateMessageSize = (message: string): boolean => {
    const MAX_MESSAGE_SIZE = 10000; // 10KB
    return message.length <= MAX_MESSAGE_SIZE;
  };

  const exponentialBackoff = (attempt: number): number => {
    const delay = Math.min(config.maxRetryDelay, config.retryDelay * Math.pow(2, attempt));
    const jitter = Math.random() * 1000;
    return delay + jitter;
  };

  const updateMetrics = (type: 'connection' | 'message' | 'error') => {
    switch (type) {
      case 'connection':
        metrics.connectionAttempts++;
        break;
      case 'message':
        metrics.messagesReceived++;
        break;
      case 'error':
        metrics.failedConnections++;
        break;
    }
    set({ metrics: { ...metrics } });
  };

  // Graceful shutdown при размонтировании компонента
  const cleanup = () => {
    if (socket) {
      log('info', 'WebSocket: Component unmounting, disconnecting');
      socket.disconnect();
      socket = null;
    }

    if (pingInterval) {
      clearInterval(pingInterval);
      pingInterval = null;
    }
  };

  const connectWithRetry = (token: string, attempt: number = 0): void => {
    // Increment retry count when attempting reconnection
    if (attempt > 0) {
      retryCount = attempt;
    }
    const now = Date.now();
    const timeSinceLastAttempt = now - lastConnectionAttempt;

    if (timeSinceLastAttempt < 1000) {
      setTimeout(() => connectWithRetry(token, attempt), 1000 - timeSinceLastAttempt);
      return;
    }

    // Update retry count for tracking
    retryCount = attempt;

    lastConnectionAttempt = now;
    updateMetrics('connection');

    if (attempt > 0) {
      const delay = exponentialBackoff(attempt - 1);
      log('info', `Reconnection attempt ${attempt}, waiting ${delay}ms`);
      setTimeout(() => attemptConnection(token, attempt), delay);
    } else {
      attemptConnection(token, attempt);
    }
  };

  const attemptConnection = (token: string, attempt: number): void => {
    if (socket?.connected) {
      log('debug', 'WebSocket: Already connected');
      return;
    }

    savedToken = token;
    const wsUrl = config.url;

    log('info', 'WebSocket: Connecting to', wsUrl);
    log('debug', 'WebSocket: Using token', token.substring(0, 10) + '...');

    const connectionConfig: WebSocketConnectionConfig = {
      url: wsUrl,
      path: config.path,
      query: { accessToken: token },
      transports: ['websocket'],
      reconnection: false,
      reconnectionAttempts: 1,
      reconnectionDelay: 0,
      timeout: config.timeout,
      // Добавим дополнительные настройки для лучшей совместимости
      withCredentials: true,
    };

    socket = io(wsUrl, connectionConfig);

    const messageHandlers: WebSocketMessageHandler = {
      [WS_EVENT_PATH.NOTIFICATIONS]: (data: unknown) => {
        if (validateNotification(data)) {
          const notification = data as NotificationViewDto;
          log('debug', 'WebSocket: New notification received', notification);
          get().addNotification(notification);
          metrics.messagesReceived++;
          set({ metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid notification message received', data);
        }
      },
      // Добавим дополнительные возможные события для получения уведомлений
      notification: (data: unknown) => {
        if (validateNotification(data)) {
          const notification = data as NotificationViewDto;
          log('debug', 'WebSocket: New notification received via "notification" event', notification);
          get().addNotification(notification);
          metrics.messagesReceived++;
          set({ metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid notification message received via "notification" event', data);
        }
      },
      new_notification: (data: unknown) => {
        if (validateNotification(data)) {
          const notification = data as NotificationViewDto;
          log('debug', 'WebSocket: New notification received via "new_notification" event', notification);
          get().addNotification(notification);
          metrics.messagesReceived++;
          set({ metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid notification message received via "new_notification" event', data);
        }
      },
      newNotification: (data: unknown) => {
        if (validateNotification(data)) {
          const notification = data as NotificationViewDto;
          log('debug', 'WebSocket: New notification received via "newNotification" event', notification);
          get().addNotification(notification);
          metrics.messagesReceived++;
          set({ metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid notification message received via "newNotification" event', data);
        }
      },
      [WS_EVENT_PATH.RECEIVE_MESSAGE]: (data: unknown) => {
        if (validateMessage(data)) {
          const message = data as Message;
          log('debug', 'WebSocket: New message received', message);
          messages.push(message);
          set({ messages: [...messages], metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid message received', data);
        }
      },
      [WS_EVENT_PATH.MESSAGE_SEND]: (data: unknown) => {
        if (validateMessage(data)) {
          const message = data as Message;
          log('debug', 'WebSocket: Message sent', message);
          messages.push(message);
          set({ messages: [...messages], metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid message send data', data);
        }
      },
      [WS_EVENT_PATH.UPDATE_MESSAGE]: (data: unknown) => {
        if (validateMessage(data)) {
          const message = data as Message;
          log('debug', 'WebSocket: Message updated', message);
          const index = messages.findIndex((m) => m.id === message.id);
          if (index !== -1) {
            messages[index] = message;
            set({ messages: [...messages], metrics: { ...metrics } });
          }
        } else {
          log('warn', 'WebSocket: Invalid message update data', data);
        }
      },
      [WS_EVENT_PATH.MESSAGE_DELETED]: (data: unknown) => {
        if (typeof data === 'object' && data !== null && 'id' in data) {
          const payload = data as { id: number };
          log('debug', 'WebSocket: Message deleted', payload);
          messages = messages.filter((m) => m.id !== payload.id);
          set({ messages: [...messages], metrics: { ...metrics } });
        } else {
          log('warn', 'WebSocket: Invalid message delete data', data);
        }
      },
      [WS_EVENT_PATH.ERROR]: (data: unknown) => {
        if (typeof data === 'object' && data !== null && 'message' in data) {
          const error = data as { message: string };
          log('error', 'WebSocket: Error received', error);
          set({
            error: { code: 'WS_ERROR', message: error.message, timestamp: new Date().toISOString(), retryable: true },
          });
        }
      },
      ping: () => {
        log('debug', 'WebSocket: Ping received from server');
        if (socket?.connected) {
          socket.emit('pong');
        }
      },
      disconnect: (reason: string) => {
        log('info', 'WebSocket: Disconnected. Reason:', reason);
        set({ isConnected: false });
        if (reason === 'io server disconnect' && savedToken && attempt < config.maxRetries) {
          log('info', 'WebSocket: Attempting to reconnect');
          connectWithRetry(savedToken, attempt + 1);
        }
      },
      connect_error: (error: unknown) => {
        log('error', 'WebSocket: Connection error', error);
        set({
          error: {
            code: 'CONNECT_ERROR',
            message: 'Connection failed',
            timestamp: new Date().toISOString(),
            retryable: true,
          },
          isConnected: false,
        });

        if (attempt < config.maxRetries) {
          connectWithRetry(savedToken!, attempt + 1);
        } else {
          log('error', 'WebSocket: Max retry attempts reached');
        }
      },
      connect: () => {
        log('info', 'WebSocket: Connected successfully');
        metrics.successfulConnections++;
        retryCount = 0;
        set({ isConnected: true, error: null, metrics: { ...metrics }, retryCount });

        if (pingInterval) {
          clearInterval(pingInterval);
        }

        pingInterval = setInterval(() => {
          if (socket?.connected) {
            log('debug', 'WebSocket: Sending ping');
            socket.emit('ping');
            metrics.messagesSent++;
            set({ metrics: { ...metrics } });
          }
        }, config.pingInterval);
      },
      pong: (latency: number) => {
        log('debug', 'WebSocket: Pong received with latency', latency);
        metrics.currentLatency = latency;
        metrics.averageLatency = (metrics.averageLatency + latency) / 2;
        set({ metrics: { ...metrics } });
      },
    };

    // Подписываемся на конкретные обработчики событий
    Object.keys(messageHandlers).forEach((event) => {
      socket?.on(event, (data: unknown) => {
        const handler = messageHandlers[event];
        if (handler) {
          handler(data);
        }
      });
    });

    // Обработчик для любых других событий, которые могут приходить от сервера
    socket?.onAny((event, data) => {
      log('debug', `WebSocket: Received unexpected event '${event}' with data`, data);
    });

    // Добавим обработчики для основных событий Socket.IO для диагностики
    socket?.on('connect', () => {
      log('info', 'WebSocket: Socket.IO connect event fired');
    });

    socket?.on('disconnect', (reason) => {
      log('info', 'WebSocket: Socket.IO disconnect event fired', reason);
    });

    socket?.on('reconnect', (attemptNumber) => {
      log('info', 'WebSocket: Socket.IO reconnect event fired', attemptNumber);
    });

    socket?.on('connect_error', (error) => {
      log('error', 'WebSocket: Socket.IO connect_error event fired', error);
    });

    socket?.on('connect_timeout', () => {
      log('error', 'WebSocket: Socket.IO connect_timeout event fired');
    });
  };

  return {
    isConnected: false,
    error: null,
    notifications: [],
    unreadCount: 0,
    showToast: true,
    metrics: metrics,
    config: config,
    messages: messages,

    setShowToast: (show: boolean) => {
      set({ showToast: show });
    },

    connect: (token: string) => {
      if (!token) {
        log('error', 'WebSocket: Connection failed - empty token');
        set({
          error: {
            code: 'AUTH_ERROR',
            message: 'Authentication failed',
            timestamp: new Date().toISOString(),
            retryable: false,
          },
        });
        return;
      }
      connectWithRetry(token, 0);
    },

    disconnect: () => {
      if (socket) {
        log('info', 'WebSocket: Disconnecting');
        socket.disconnect();
        socket = null;
      }
      set({ isConnected: false, error: null });

      if (pingInterval) {
        clearInterval(pingInterval);
        pingInterval = null;
      }
    },

    markAsRead: async (ids: number[]) => {
      if (ids.length === 0) return;

      set((state) => {
        const updatedNotifications = state.notifications.map((n) => (ids.includes(n.id) ? { ...n, isRead: true } : n));
        const newUnreadCount = updatedNotifications.filter((n) => !n.isRead).length;

        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount,
        };
      });

      try {
        log('info', 'WebSocket: Marking notifications as read', ids);
        await client.PUT('/notifications/mark-as-read', {
          body: { ids },
        });
      } catch (error) {
        log('error', 'WebSocket: Failed to mark notifications as read', error);
        set((state) => {
          const revertedNotifications = state.notifications.map((n) =>
            ids.includes(n.id) ? { ...n, isRead: false } : n,
          );
          const newUnreadCount = revertedNotifications.filter((n) => !n.isRead).length;

          return {
            notifications: revertedNotifications,
            unreadCount: newUnreadCount,
          };
        });
      }
    },

    markAllAsRead: () => {
      const unreadIds = get()
        .notifications.filter((n) => !n.isRead)
        .map((n) => n.id);
      get().markAsRead(unreadIds);
    },

    addNotification: (notification: NotificationViewDto, showToastMessage = true) => {
      set((state) => {
        const exists = state.notifications.some((n) => n.id === notification.id);
        if (exists) return state;

        const newNotifications = [notification, ...state.notifications];
        const newUnreadCount = notification.isRead ? state.unreadCount : state.unreadCount + 1;

        if (showToastMessage && state.showToast && !notification.isRead) {
          useAlertStore.getState().show({
            error: null,
            description: notification.message,
            severity: 'success',
            variant: 'default',
          });
        }

        return {
          notifications: newNotifications,
          unreadCount: newUnreadCount,
        };
      });
    },

    updateUnreadCount: () => {
      const unreadCount = get().notifications.filter((n) => !n.isRead).length;
      set({ unreadCount });
    },

    deleteNotification: async (id: number) => {
      set((state) => {
        const notification = state.notifications.find((n) => n.id === id);
        const updatedNotifications = state.notifications.filter((n) => n.id !== id);
        const newUnreadCount = notification && !notification.isRead ? state.unreadCount - 1 : state.unreadCount;

        return {
          notifications: updatedNotifications,
          unreadCount: Math.max(0, newUnreadCount),
        };
      });

      try {
        log('info', 'WebSocket: Deleting notification', id);
        await client.DELETE('/notifications/{id}', {
          params: { path: { id } },
        });
      } catch (error) {
        log('error', 'WebSocket: Failed to delete notification', error);
      }
    },

    sendMessage: (message: MessageSendRequest, receiverId: number) => {
      if (!validateMessageSize(message.message)) {
        log('error', 'WebSocket: Message size exceeds limit', { size: message.message.length });
        return;
      }

      if (socket?.connected) {
        log('info', 'WebSocket: Sending message', { message, receiverId });
        socket.emit(WS_EVENT_PATH.RECEIVE_MESSAGE, { message: message.message, receiverId });
        metrics.messagesSent++;
        set({ metrics: { ...metrics } });
      } else {
        log('warn', 'WebSocket: Cannot send message, not connected');
      }
    },

    updateMessage: (id: number, message: string) => {
      if (!validateMessageSize(message)) {
        log('error', 'WebSocket: Message size exceeds limit', { size: message.length });
        return;
      }

      if (socket?.connected) {
        log('info', 'WebSocket: Updating message', { id, message });
        socket.emit(WS_EVENT_PATH.UPDATE_MESSAGE, { id, message });
        metrics.messagesSent++;
        set({ metrics: { ...metrics } });
      } else {
        log('warn', 'WebSocket: Cannot update message, not connected');
      }
    },

    deleteMessage: (id: number) => {
      if (socket?.connected) {
        log('info', 'WebSocket: Deleting message', { id });
        socket.emit(WS_EVENT_PATH.MESSAGE_DELETED, { id });
        metrics.messagesSent++;
        set({ metrics: { ...metrics } });
      } else {
        log('warn', 'WebSocket: Cannot delete message, not connected');
      }
    },

    getMessages: () => messages,

    getMetrics: () => metrics,

    validateMessage: (message: unknown) => {
      return validateNotification(message) || validateMessage(message);
    },
    cleanup: cleanup,
  };
});

export const notificationWebSocketService = {
  connect: (token: string) => useNotificationWSStore.getState().connect(token),
  disconnect: () => useNotificationWSStore.getState().disconnect(),
  markAsRead: (ids: number[]) => useNotificationWSStore.getState().markAsRead(ids),
  markAllAsRead: () => useNotificationWSStore.getState().markAllAsRead(),
  subscribe: (listener: () => void) => useNotificationWSStore.subscribe(listener),
  getState: () => useNotificationWSStore.getState(),
  deleteNotification: (id: number) => useNotificationWSStore.getState().deleteNotification(id),
  setShowToast: (show: boolean) => useNotificationWSStore.getState().setShowToast(show),
  getMetrics: () => useNotificationWSStore.getState().getMetrics(),
  validateMessage: (message: unknown) => useNotificationWSStore.getState().validateMessage(message),
  healthCheck: () => {
    const state = useNotificationWSStore.getState();
    return {
      isConnected: state.isConnected,
      error: state.error,
      metrics: state.metrics,
      config: state.config,
    };
  },
  sendMessage: (message: MessageSendRequest, receiverId: number) =>
    useNotificationWSStore.getState().sendMessage(message, receiverId),
  updateMessage: (id: number, message: string) => useNotificationWSStore.getState().updateMessage(id, message),
  deleteMessage: (id: number) => useNotificationWSStore.getState().deleteMessage(id),
  getMessages: () => useNotificationWSStore.getState().getMessages(),
  cleanup: () => useNotificationWSStore.getState().cleanup(),
};

// ============ MOCK DATA ДЛЯ РАЗРАБОТКИ ============

const MOCK_NOTIFICATIONS: NotificationViewDto[] = [
  {
    id: 1,
    message: 'Your subscription is activated and valid until 2025-12-31',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 2,
    message: 'Your next payment will be deducted in 3 days',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: 3,
    message: 'Your subscription expires in 7 days',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 4,
    message: 'New feature: Dark mode is now available!',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

/** Загружает mock-уведомления в store (только для dev) */
export const loadMockNotifications = () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const store = useNotificationWSStore.getState();

  // Очищаем старые
  useNotificationWSStore.setState({ notifications: [], unreadCount: 0 });

  // Добавляем mock-уведомления
  MOCK_NOTIFICATIONS.forEach((notification) => {
    store.addNotification(notification, false);
  });

  // Устанавливаем счетчик непрочитанных и соединение
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;
  useNotificationWSStore.setState({ unreadCount, isConnected: true });
};

/** Добавляет тестовое уведомление (только для dev) */
export const addTestNotification = (message?: string) => {
  if (process.env.NODE_ENV === 'production') return;

  const store = useNotificationWSStore.getState();
  const newNotification: NotificationViewDto = {
    id: Date.now(),
    message: message || `Test notification at ${new Date().toLocaleTimeString()}`,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  store.addNotification(newNotification, true);
};

// Экспортируем в window для удобства тестирования в консоли браузера
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as unknown as Record<string, unknown>).loadMockNotifications = loadMockNotifications;
  (window as unknown as Record<string, unknown>).addTestNotification = addTestNotification;
  (window as unknown as Record<string, unknown>).notificationWebSocketService = notificationWebSocketService;
  (window as unknown as Record<string, unknown>).useNotificationWSStore = useNotificationWSStore;
}
