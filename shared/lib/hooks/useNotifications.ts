import { useEffect } from 'react';
import { useNotificationWSStore } from '@/shared/lib/websocket/notification-websocket.service';

// Типы уведомлений
export enum NotificationType {
  SUBSCRIPTION_ACTIVATED = 'subscription_activated', // Активация подписки
  PAYMENT_WARNING = 'payment_warning', // Предупреждение о списании платежа
  SUBSCRIPTION_EXPIRY_7_DAYS = 'subscription_expiry_7_days', // Окончание подписки через 7 дней
  SUBSCRIPTION_EXPIRY_1_DAY = 'subscription_expiry_1_day', // Окончание подписки через 1 день
  OTHER = 'other'
}

// Используем типизацию для параметров
interface NotificationParams {
  endDate?: string;
  days?: number;
  message?: string;
}

// Используем типы уведомлений в других частях приложения
export type { NotificationParams };

// Интерфейс для типа уведомления
export interface NotificationTypeInfo {
  type: NotificationType;
  title: string;
  messageTemplate: (params?: NotificationParams) => string;
  icon?: string;
}

// Конфигурация типов уведомлений
export const NOTIFICATION_TYPES: Record<NotificationType, NotificationTypeInfo> = {
  [NotificationType.SUBSCRIPTION_ACTIVATED]: {
    type: NotificationType.SUBSCRIPTION_ACTIVATED,
    title: 'Активация подписки',
    messageTemplate: (params?: NotificationParams) => {
      // Используем параметры, даже если они не всегда требуются
      const endDate = params?.endDate || 'даты окончания';
      return `Ваша подписка активирована и действует до ${endDate}`;
    },
    icon: '✅'
  },
  [NotificationType.PAYMENT_WARNING]: {
    type: NotificationType.PAYMENT_WARNING,
    title: 'Предупреждение о платеже',
    messageTemplate: (params?: NotificationParams) => {
      // Используем параметры, даже если они не всегда требуются
      const days = params?.days || 1;
      return `Следующий платеж у вас спишется через ${days} ${getDayWord(days)}`;
    },
    icon: '💳'
  },
  [NotificationType.SUBSCRIPTION_EXPIRY_7_DAYS]: {
    type: NotificationType.SUBSCRIPTION_EXPIRY_7_DAYS,
    title: 'Окончание подписки',
    messageTemplate: (params?: NotificationParams) => {
      // Параметр может использоваться в будущем
      return `Ваша подписка истекает через 7 дней`;
    },
    icon: '⏰'
  },
  [NotificationType.SUBSCRIPTION_EXPIRY_1_DAY]: {
    type: NotificationType.SUBSCRIPTION_EXPIRY_1_DAY,
    title: 'Окончание подписки',
    messageTemplate: (params?: NotificationParams) => {
      // Параметр может использоваться в будущем
      return `Ваша подписка истекает через 1 день`;
    },
    icon: '⚠️'
  },
  [NotificationType.OTHER]: {
    type: NotificationType.OTHER,
    title: 'Уведомление',
    messageTemplate: (params?: NotificationParams) => {
      // Используем параметры, даже если они не всегда требуются
      const message = params?.message;
      return message || 'Новое уведомление';
    },
    icon: '🔔'
  }
};

// Вспомогательная функция для склонения слова "день"
function getDayWord(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) {
    return 'день';
  } else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
    return 'дня';
  } else {
    return 'дней';
  }
}

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
    deleteNotification
  } = useNotificationWSStore();

  // Функция для определения типа уведомления
  const getNotificationType = (message: string): NotificationType => {
    if (message.includes('подписка активирована')) {
      return NotificationType.SUBSCRIPTION_ACTIVATED;
    } else if (message.includes('следующий платеж') && message.includes('спишется')) {
      return NotificationType.PAYMENT_WARNING;
    } else if (message.includes('истекает через 7 дней')) {
      return NotificationType.SUBSCRIPTION_EXPIRY_7_DAYS;
    } else if (message.includes('истекает через 1 день')) {
      return NotificationType.SUBSCRIPTION_EXPIRY_1_DAY;
    } else {
      return NotificationType.OTHER;
    }
  };

  // Функция для получения информации о типе уведомления
  const getNotificationTypeInfo = (message: string): NotificationTypeInfo => {
    const type = getNotificationType(message);
    return NOTIFICATION_TYPES[type];
  };

  // Функция для получения последних уведомлений за определенный период
  const getRecentNotifications = (days: number = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return notifications.filter(notification => {
      const notificationDate = new Date(notification.createdAt);
      return notificationDate >= cutoffDate;
    });
  };

  // Эффект для автоматического подключения к WebSocket при аутентификации
  useEffect(() => {
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
    getNotificationType,
    getNotificationTypeInfo,
    getRecentNotifications
  };
};