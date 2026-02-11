import type { components } from '@/shared/api/schema.d';

// Тип уведомления из API
export type NotificationViewDto = components['schemas']['NotificationViewDto'];

// Дополнительные типы для UI
export type NotificationsResponse = {
  pageSize: number;
  totalCount: number;
  items?: NotificationViewDto[];
};

// Типы для WebSocket сообщений
export type WSMessageType = 'notification' | 'unread_count' | 'bulk_notifications' | 'notification_deleted';

export interface WSNotificationPayload {
  id: number;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface WSUnreadCountPayload {
  unreadCount: number;
}

export interface WSBulkNotificationsPayload {
  items: Array<{
    id: number;
    message: string;
    isRead: boolean;
    createdAt: string;
  }>;
  unreadCount?: number;
}

export interface WSNotificationDeletedPayload {
  id: number;
}

export interface WSMessage {
  type: WSMessageType;
  payload: WSNotificationPayload | WSUnreadCountPayload | WSBulkNotificationsPayload | WSNotificationDeletedPayload;
}
