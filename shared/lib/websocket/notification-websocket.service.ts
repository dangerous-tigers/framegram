
import { NotificationsView } from '@/shared/ui/notifications/types';
import { create } from 'zustand';
import { client } from '@/shared/api/client';

export interface NotificationWebSocketService {
  // Состояние соединения
  isConnected: boolean;
  // Ошибка соединения
  error: string | null;
  // Уведомления
  notifications: NotificationsView[];
  // Количество непрочитанных уведомлений
  unreadCount: number;
  
  // Методы
  connect: (token: string) => void;
  disconnect: () => void;
  markAsRead: (ids: number[]) => void;
  markAllAsRead: () => void;
  addNotification: (notification: NotificationsView) => void;
  updateUnreadCount: () => void;
  deleteNotification: (id: number) => void;
}

// Создаем глобальное хранилище для уведомлений
export const useNotificationWSStore = create<NotificationWebSocketService>((set, get) => {
  let ws: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;
  const maxReconnectAttempts = 5;
  let reconnectAttempts = 0;

  return {
    isConnected: false,
    error: null,
    notifications: [],
    unreadCount: 0,

    connect: (token: string) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        return; // Уже подключено
      }

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
            const data = JSON.parse(event.data);
            
            // Обработка входящего уведомления
            if (data.type === 'notification') {
              const notification: NotificationsView = {
                id: data.payload.id,
                message: data.payload.message,
                isRead: data.payload.isRead || false,
                createdAt: data.payload.createdAt || new Date().toISOString(),
              };
              
              get().addNotification(notification);
            } else if (data.type === 'unread_count') {
              // Обновление количества непрочитанных уведомлений
              set({ unreadCount: data.payload.unreadCount });
            } else if (data.type === 'bulk_notifications') {
              // Обновление списка уведомлений (например, при первом подключении)
              const notifications: NotificationsView[] = data.payload.items.map((item: { id: number; message: string; isRead: boolean; createdAt: string }) => ({
                id: item.id,
                message: item.message,
                isRead: item.isRead,
                createdAt: item.createdAt,
              }));
              
              set({
                notifications: [...notifications, ...get().notifications],
                unreadCount: data.payload.unreadCount || get().unreadCount
              });
            } else if (data.type === 'notification_deleted') {
              // Обработка удаленного уведомления
              get().deleteNotification(data.payload.id);
            }
          } catch (_error: any) {
            // console.error('Error parsing WebSocket message:', error);
          }
        };

        ws.onclose = (event) => {
          // console.log('WebSocket disconnected:', event.code, event.reason);
          set({ isConnected: false });
          
          // Попытка переподключения
          if (reconnectAttempts < maxReconnectAttempts && event.code !== 1000) {
            reconnectAttempts++;
            // console.log(`Attempting to reconnect... (${reconnectAttempts}/${maxReconnectAttempts})`);
            
            if (reconnectTimeout) {
              clearTimeout(reconnectTimeout);
            }
            
            reconnectTimeout = setTimeout(() => {
              get().connect(token);
            }, 3000 * reconnectAttempts); // Экспоненциальная задержка
          }
        };

        ws.onerror = (_error) => {
          // console.error('WebSocket error:', error);
          set({ error: 'WebSocket connection error' });
        };
      } catch (_error) {
        // console.error('Failed to create WebSocket connection:', error);
        set({ error: 'Failed to establish WebSocket connection' });
      }
    },

    disconnect: () => {
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
        const updatedNotifications = state.notifications.map(notification =>
          ids.includes(notification.id) ? { ...notification, isRead: true } : notification
        );
        
        const newUnreadCount = updatedNotifications.filter(n => !n.isRead).length;
        
        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount
        };
      });
      
      // Отправляем запрос на сервер для сохранения состояния
      try {
        await client.PUT('/notifications/mark-as-read', {
          body: { ids }
        });
      } catch (_error) {
      // console.error('Failed to mark notifications as read on server:', error);
      // Восстанавливаем состояние в случае ошибки
      set((state) => {
        const revertedNotifications = state.notifications.map(notification =>
          ids.includes(notification.id) ? { ...notification, isRead: false } : notification
        );
        
        const revertedUnreadCount = revertedNotifications.filter(n => !n.isRead).length;
        
        return {
          notifications: revertedNotifications,
          unreadCount: revertedUnreadCount
        };
      });
    }
    },

    markAllAsRead: () => {
      set((state) => {
        const idsToMark = state.notifications.filter(n => !n.isRead).map(n => n.id);
        
        if (idsToMark.length > 0) {
          get().markAsRead(idsToMark);
        }
        
        return { unreadCount: 0 };
      });
    },

    addNotification: (notification: NotificationsView) => {
      set((state) => {
        // Проверяем, существует ли уже уведомление с таким ID
        const exists = state.notifications.some(n => n.id === notification.id);
        if (exists) {
          // Обновляем существующее уведомление
          const updatedNotifications = state.notifications.map(n =>
            n.id === notification.id ? notification : n
          );
          
          const newUnreadCount = state.unreadCount + (notification.isRead ? 0 : 1) - (state.notifications.find(n => n.id === notification.id)?.isRead ? 0 : 1);
          
          return {
            notifications: updatedNotifications,
            unreadCount: newUnreadCount
          };
        } else {
          // Добавляем новое уведомление в начало списка
          const newNotifications = [notification, ...state.notifications];
          
          // Обновляем количество непрочитанных уведомлений
          const newUnreadCount = notification.isRead ? state.unreadCount : state.unreadCount + 1;
          
          return {
            notifications: newNotifications,
            unreadCount: newUnreadCount
          };
        }
      });
    },

    updateUnreadCount: () => {
      set((state) => {
        const unreadCount = state.notifications.filter(n => !n.isRead).length;
        return { unreadCount };
      });
    },
    
    deleteNotification: async (id: number) => {
      set((state) => {
        const updatedNotifications = state.notifications.filter(notification => notification.id !== id);
        const removedNotification = state.notifications.find(notification => notification.id === id);
        
        // Обновляем количество непрочитанных уведомлений
        const newUnreadCount = removedNotification && !removedNotification.isRead
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount;
        
        return {
          notifications: updatedNotifications,
          unreadCount: newUnreadCount
        };
      });
      
      // Отправляем запрос на сервер для удаления уведомления
      try {
        await client.DELETE('/notifications/{id}', {
          params: { path: { id } }
        });
      } catch (_error) {
        // console.error('Failed to delete notification on server:', error);
        // В случае ошибки, восстанавливаем удаленное уведомление
        set((state) => {
          // Для восстановления нужно получить уведомление с сервера, что невозможно без кэширования
          // Поэтому просто выводим ошибку
          // console.warn(`Could not restore notification ${id} after failed deletion`);
          return state;
        });
      }
    }
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
  deleteNotification: (id: number) => useNotificationWSStore.getState().deleteNotification(id)
};