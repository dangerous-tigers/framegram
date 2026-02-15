export interface WebSocketError {
  code: string;
  message: string;
  timestamp: string;
  retryable: boolean;
}

export interface WebSocketMetrics {
  connectionAttempts: number;
  successfulConnections: number;
  failedConnections: number;
  messagesReceived: number;
  messagesSent: number;
  averageLatency: number;
  currentLatency: number;
}

export interface WebSocketConfig {
  url: string;
  path: string;
  pingInterval: number;
  maxRetries: number;
  retryDelay: number;
  maxRetryDelay: number;
  timeout: number;
}

export interface WebSocketMessage {
  type: WSMessageType;
  payload: WSMessage['payload'] | undefined;
  timestamp: string;
  connectionId?: string;
}

export interface WebSocketState {
  isConnected: boolean;
  error: WebSocketError | null;
  metrics: WebSocketMetrics;
  lastMessage: WebSocketMessage | null;
  connectionId?: string;
}

export interface ServerNotification {
  id: number;
  clientId?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: number;
  ownerId: number;
  receiverId: number;
  messageText: string;
  status: 'SENT' | 'RECEIVED' | 'READ';
  messageType: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageSendRequest {
  message: string;
  receiverId: number;
}

export interface MessageUpdateRequest {
  id: number;
  message: string;
}

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

export interface WSReceiveMessagePayload {
  message: Message;
}

export interface WSMessageSendPayload {
  message: MessageSendRequest;
}

export interface WSMessageUpdatePayload {
  message: Message;
}

export interface WSMessageDeletedPayload {
  id: number;
}

export interface WSErrorPayload {
  message: string;
  error: string;
}

export type WSMessageType =
  | 'notification'
  | 'unread_count'
  | 'bulk_notifications'
  | 'notification_deleted'
  | 'receive_message'
  | 'message_send'
  | 'update_message'
  | 'message_deleted'
  | 'error';

export interface WSMessage {
  type: WSMessageType;
  payload:
    | WSNotificationPayload
    | WSUnreadCountPayload
    | WSBulkNotificationsPayload
    | WSNotificationDeletedPayload
    | WSReceiveMessagePayload
    | WSMessageSendPayload
    | WSMessageUpdatePayload
    | WSMessageDeletedPayload
    | WSErrorPayload;
}
