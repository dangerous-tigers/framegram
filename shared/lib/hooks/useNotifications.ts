import { useNotificationWSStore } from '@/shared/lib/websocket/notification-websocket.service';

export const useNotifications = () => {
  const { notifications, unreadCount, isConnected, markAsRead, markAllAsRead, deleteNotification } =
    useNotificationWSStore();

  // Убрали useRef, так как логика подключения теперь обрабатывается в другом месте

  const getRecentNotifications = (days = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return notifications.filter((notification) => {
      const notificationDate = new Date(notification.createdAt);
      return notificationDate >= cutoffDate;
    });
  };

  // Логика подключения теперь обрабатывается в отдельном хуке useNetworkStatus
  // и в компоненте Notifications

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
