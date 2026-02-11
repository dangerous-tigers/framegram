import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

import { client } from '@/shared/api/client';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { NotificationViewDto } from '@/shared/ui/notifications/types';

const WS_EVENT_PATH = {
  NOTIFICATIONS: 'notifications',
  ERROR: 'error',
} as const;

interface ServerNotification {
  id: number;
  clientId?: string;
  message: string;
  isRead: boolean;
  notifyAt: string;
}

export interface NotificationWebSocketService {
  isConnected: boolean;
  error: string | null;
  notifications: NotificationViewDto[];
  unreadCount: number;
  showToast: boolean;

  connect: (token: string) => void;
  disconnect: () => void;
  markAsRead: (ids: number[]) => void;
  markAllAsRead: () => void;
  addNotification: (notification: NotificationViewDto, showToast?: boolean) => void;
  updateUnreadCount: () => void;
  deleteNotification: (id: number) => void;
  setShowToast: (show: boolean) => void;
}

export const useNotificationWSStore = create<NotificationWebSocketService>((set, get) => {
  let socket: Socket | null = null;
  let savedToken: string | null = null;

  return {
    isConnected: false,
    error: null,
    notifications: [],
    unreadCount: 0,
    showToast: true,

    setShowToast: (show: boolean) => {
      set({ showToast: show });
    },

    connect: (token: string) => {
      if (socket?.connected) {
        return;
      }

      savedToken = token;

      // Socket.IO подключение
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'https://inctagram.work';

      socket = io(wsUrl, {
        path: '/socket.io',
        query: {
          accessToken: token,
        },
        transports: ['websocket'], // Только websocket, polling вызывает 400
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on('connect', () => {
        set({ isConnected: true, error: null });
      });

      socket.on(WS_EVENT_PATH.NOTIFICATIONS, (notification: ServerNotification) => {
        const notificationDto: NotificationViewDto = {
          id: notification.id,
          message: notification.message,
          isRead: notification.isRead,
          createdAt: notification.notifyAt,
        };
        get().addNotification(notificationDto);
      });

      socket.on(WS_EVENT_PATH.ERROR, (error: { message: string; error: string }) => {
        set({ error: error.message });
      });

      socket.on('disconnect', (reason) => {
        set({ isConnected: false });
        if (reason === 'io server disconnect') {
          if (savedToken) {
            setTimeout(() => get().connect(savedToken!), 1000);
          }
        }
      });

      socket.on('connect_error', (error) => {
        set({ error: error.message, isConnected: false });
      });
    },

    disconnect: () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
      set({ isConnected: false, error: null });
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
        await client.PUT('/notifications/mark-as-read', {
          body: { ids },
        });
      } catch {
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
        await client.DELETE('/notifications/{id}', {
          params: { path: { id } },
        });
      } catch {
        // Ошибка удаления уведомления на сервере - уведомление уже удалено локально
      }
    },
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
