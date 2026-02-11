import { create } from 'zustand';

import { client } from '@/shared/api/client';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import {
  NotificationViewDto,
  WSBulkNotificationsPayload,
  WSMessage,
  WSNotificationDeletedPayload,
  WSNotificationPayload,
  WSUnreadCountPayload,
} from '@/shared/ui/notifications/types';

export interface NotificationWebSocketService {
  // Состояние соединения
  isConnected: boolean;
  // Ошибка соединения
  error: string | null;
  // Уведомления
  notifications: NotificationViewDto[];
  // Количество непрочитанных уведомлений
  unreadCount: number;
  // Показывать ли toast при новых уведомлениях
  showToast: boolean;

  // Методы
  connect: (token: string) => void;
  disconnect: () => void;
  markAsRead: (ids: number[]) => void;
  markAllAsRead: () => void;
  addNotification: (notification: NotificationViewDto, showtoast?: boolean) => void;
  updateUnreadCount: () => void;
  deleteNotification: (id: number) => void;
  setShowToast: (show: boolean) => void;
}

// Создаем глобальное хранилище для уведомлений
export const useNotificationWSStore = create<NotificationWebSocketService>((set, get) => {
  let ws: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;
  const maxReconnectAttempts = 5;
  let reconnectAttempts = 0;
  let savedToken: string | null = null; // Сохраняем токен для переподключения

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
      if (ws && ws.readyState === WebSocket.OPEN) {
        return; // Уже подключено
      }

      // Сохраняем токен для переподключения
      savedToken = token;

      try {
        // URL для WebSocket соединения (предполагаемый)
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'}/notifications?token=${token}`;
        ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          set({ isConnected: true, error: null });
          reconnectAttempts = 0; // Сброс попыток подключения при успешном подключении
        };

        ws.onmessage = (event) => {
          try {
            const data: WSMessage = JSON.parse(event.data);

            // Обработка входящего уведомления
            if (data.type === 'notification') {
              const payload = data.payload as WSNotificationPayload;
              const notification: NotificationViewDto = {
                id: payload.id,
                message: payload.message,
                isRead: payload.isRead || false,
                createdAt: payload.createdAt || new Date().toISOString(),
              };

              get().addNotification(notification);
            } else if (data.type === 'unread_count') {
              // Обновление количества непрочитанных уведомлений
              const payload = data.payload as WSUnreadCountPayload;
              set({ unreadCount: payload.unreadCount });
            } else if (data.type === 'bulk_notifications') {
              // Обновление списка уведомлений (например, при первом подключении)
              const payload = data.payload as WSBulkNotificationsPayload;
              const notifications: NotificationViewDto[] = payload.items.map((item) => ({
                id: item.id,
                message: item.message,
                isRead: item.isRead,
                createdAt: item.createdAt,
              }));

              set({
                notifications: [...notifications, ...get().notifications],
                unreadCount: payload.unreadCount || get().unreadCount,
              });
            } else if (data.type === 'notification_deleted') {
              // Обработка удаленного уведомления
              const payload = data.payload as WSNotificationDeletedPayload;
              get().deleteNotification(payload.id);
            }
          } catch {
            // console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = (event) => {
          // console.log('WebSocket disconnected:', event.code, event.reason);
          set({ isConnected: false });

          // Попытка переподключения с сохраненным токеном
          if (reconnectAttempts < maxReconnectAttempts && event.code !== 1000 && savedToken) {
            reconnectAttempts++;
            // console.log(`Attempting to reconnect... (${reconnectAttempts}/${maxReconnectAttempts})`);

            if (reconnectTimeout) {
              clearTimeout(reconnectTimeout);
            }

            reconnectTimeout = setTimeout(() => {
              if (savedToken) {
                get().connect(savedToken);
              }
            }, 3000 * reconnectAttempts); // Экспоненциальная задержка
          }
        };

        ws.onerror = () => {
          // console.error('WebSocket error:', error);
          set({ error: 'WebSocket connection error' });
        };
      } catch {
        // console.error('Failed to create WebSocket connection:', error);
        set({ error: 'Failed to establish WebSocket connection' });
      }
    },

    disconnect: () => {
      // Очищаем сохраненный токен при явном отключении
      savedToken = null;
      reconnectAttempts = 0;

      if (ws) {
        ws.close(1000, 'User disconnected');
        ws = null;
      }

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }

      set({ isConnected: false });
    },

    markAsRead: async (ids: number[]) => {
      set((state) => {
        const updatedNotifications = state.notifications.map((notification) =>
          ids.includes(notification.id) ? { ...notification, isRead: true } : notification,
        );

        const newUnreadCount = updatedNotifications.filter((n) => !n.isRead).length;

        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount,
        };
      });

      // Отправляем запрос на сервер для сохранения состояния
      try {
        await client.PUT('/notifications/mark-as-read', {
          body: { ids },
        });
      } catch {
        // console.error('Failed to mark notifications as read on server:', error);
        // Восстанавливаем состояние в случае ошибки
        set((state) => {
          const revertedNotifications = state.notifications.map((notification) =>
            ids.includes(notification.id) ? { ...notification, isRead: false } : notification,
          );

          const revertedUnreadCount = revertedNotifications.filter((n) => !n.isRead).length;

          return {
            notifications: revertedNotifications,
            unreadCount: revertedUnreadCount,
          };
        });
      }
    },

    markAllAsRead: () => {
      set((state) => {
        const idsToMark = state.notifications.filter((n) => !n.isRead).map((n) => n.id);

        if (idsToMark.length > 0) {
          get().markAsRead(idsToMark);
        }

        return { unreadCount: 0 };
      });
    },

    addNotification: (notification: NotificationViewDto, showToastMessage = true) => {
      set((state) => {
        // Проверяем, существует ли уже уведомление с таким ID
        const exists = state.notifications.some((n) => n.id === notification.id);
        if (exists) {
          // Обновляем существующее уведомление
          const updatedNotifications = state.notifications.map((n) => (n.id === notification.id ? notification : n));

          const newUnreadCount =
            state.unreadCount +
            (notification.isRead ? 0 : 1) -
            (state.notifications.find((n) => n.id === notification.id)?.isRead ? 0 : 1);

          return {
            notifications: updatedNotifications,
            unreadCount: newUnreadCount,
          };
        } else {
          // Добавляем новое уведомление в начало списка
          const newNotifications = [notification, ...state.notifications];

          // Обновляем количество непрочитанных уведомлений
          const newUnreadCount = notification.isRead ? state.unreadCount : state.unreadCount + 1;

          // Показываем toast при новом уведомлении (если включено)
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
        }
      });
    },

    updateUnreadCount: () => {
      set((state) => {
        const unreadCount = state.notifications.filter((n) => !n.isRead).length;
        return { unreadCount };
      });
    },

    deleteNotification: async (id: number) => {
      set((state) => {
        const updatedNotifications = state.notifications.filter((notification) => notification.id !== id);
        const removedNotification = state.notifications.find((notification) => notification.id === id);

        // Обновляем количество непрочитанных уведомлений
        const newUnreadCount =
          removedNotification && !removedNotification.isRead ? Math.max(0, state.unreadCount - 1) : state.unreadCount;

        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount,
        };
      });

      // Отправляем запрос на сервер для удаления уведомления
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

// Функция для получения экземпляра сервиса
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
// Запуск: loadMockNotifications() в консоли браузера или в useEffect

const MOCK_NOTIFICATIONS: NotificationViewDto[] = [
  {
    id: 1,
    message: 'Your subscription is activated and valid until 31-12-2026',
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
}
