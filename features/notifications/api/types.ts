export const SOCKET_EVENTS = {
  NOTIFICATIONS: 'notifications',
  RECEIVE_MESSAGE: 'receive-message',
  UPDATE_MESSAGE: 'update-message',
  MESSAGE_DELETED: 'message-deleted',
  MESSAGE_SEND: 'message-send',
  ERROR: 'error',
} as const;
export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];

export type SocketResponseEvent = [
  'notifications',
  {
    id: number;
    clientId: string;
    message: string;
    isRead: boolean;
    notifyAt: string;
    eventType: number;
  },
];

export type MeData = {
  userId: number;
  userName: string;
  email: string;
  isBlocked: boolean;
};
