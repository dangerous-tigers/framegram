import { io, Socket } from 'socket.io-client';

import { getToken } from '@/shared/ui/notifications/getToken';

export type ErrorSocket =
  | { error: { message: string; error: string }; message: string }
  | { status: string; message: string };

let socket: Socket | null = null;

function setQueryToken(s: Socket, token: string) {
  // менеджер-уровень (участвует в следующем handshake)
  s.io.opts.query = { ...(s.io.opts.query as Record<string, string>), accessToken: token };
}

export function getSocket(): Socket {
  if (!socket) {
    socket = io('https://inctagram.work', {
      autoConnect: false,
      transports: ['websocket'],
      query: { accessToken: getToken() },
    });
  }
  socket.on('reconnect_attempt', () => {
    setQueryToken(socket!, getToken());
  });
  return socket;
}

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
