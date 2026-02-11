import { useEffect } from 'react';

import { useNotificationWSStore } from '@/shared/lib/websocket/notification-websocket.service';

// Хук для работы с уведомлениями
export const useNotifications = () => {
  const {
    notifications,
    unreadCount,
    isConnected,
    connect,
    disconnect,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationWSStore();

  // Функция для получения последних уведомлений за определенный период
  const getRecentNotifications = (days = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return notifications.filter((notification) => {
      const notificationDate = new Date(notification.createdAt);
      return notificationDate >= cutoffDate;
    });
  };

  // Эффект для автоматического подключения к WebSocket при аутентификации
  useEffect(() => {
    // Проверка на SSR (localStorage недоступен на сервере)
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('accessToken');
    if (token) {
      connect(token);
    }

    return () => {
      if (isConnected) {
        disconnect();
      }
    };
  }, [connect, disconnect, isConnected]);

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getRecentNotifications,
  };
};
