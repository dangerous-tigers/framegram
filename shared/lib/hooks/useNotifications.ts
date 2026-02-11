import { useEffect } from 'react';

import { useNotificationWSStore } from '@/shared/lib/websocket/notification-websocket.service';

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

  const getRecentNotifications = (days = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return notifications.filter((notification) => {
      const notificationDate = new Date(notification.createdAt);
      return notificationDate >= cutoffDate;
    });
  };

  useEffect(() => {
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
