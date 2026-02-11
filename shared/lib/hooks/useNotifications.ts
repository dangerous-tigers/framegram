import { useEffect, useRef } from 'react';

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

  const isMountedRef = useRef(false);

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

    isMountedRef.current = true;

    const token = localStorage.getItem('accessToken');
    if (token) {
      connect(token);
    }

    return () => {
      if (isMountedRef.current) {
        isMountedRef.current = false;
        disconnect();
      }
    };
  }, [connect, disconnect]);

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
