import { io, Socket } from 'socket.io-client';

import { getToken } from '@/features/notifications/api/getToken';

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
