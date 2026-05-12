'use client';

import { useCallback, useEffect, useRef } from 'react';

import { getSocket } from '@/features/notifications/api/socket';
import { SOCKET_EVENTS } from '@/features/notifications/api/types';
import { ensureFreshAccessToken } from '@/shared/api/client';
import { components } from '@/shared/api/schema';
import { useQueryClient } from '@tanstack/react-query';

import { messengerKeys } from './queryKeys';

type MessageViewModel = components['schemas']['MessageViewModel'];
type MessengerDialogCache = {
  pages: Array<{ items?: MessageViewModel[] }>;
  pageParams: unknown[];
};

export type SocketMessagePayload = MessageViewModel & {
  messageText: string;
};

type SendMessagePayload = {
  receiverId: number;
  message: string;
};

type UpdateMessagePayload = {
  id: number;
  message: string;
};

type UseMessengerSocketArgs = {
  myUserId?: number;
  onReceiveMessage?: (payload: SocketMessagePayload) => void;
  onErrorMessage?: (error: { message: string; error?: string }) => void;
};

type SocketErrorPayload = {
  message?: string;
  status?: string;
  error?: string | { message?: string; error?: string };
};

export const useMessengerSocket = ({ myUserId, onReceiveMessage, onErrorMessage }: UseMessengerSocketArgs) => {
  const socket = getSocket();
  const queryClient = useQueryClient();
  const reconnectPromiseRef = useRef<Promise<boolean> | null>(null);

  const reconnectWithFreshToken = useCallback(async (): Promise<boolean> => {
    if (reconnectPromiseRef.current) {
      return reconnectPromiseRef.current;
    }

    reconnectPromiseRef.current = (async () => {
      const accessToken = await ensureFreshAccessToken();

      if (!accessToken) {
        return false;
      }

      socket.io.opts.query = {
        ...(socket.io.opts.query as Record<string, string>),
        accessToken,
      };

      await new Promise<void>((resolve, reject) => {
        function cleanup() {
          window.clearTimeout(timeoutId);
          socket.off('connect', handleConnect);
          socket.off('connect_error', handleConnectError);
        }

        function handleConnect() {
          cleanup();
          resolve();
        }

        function handleConnectError() {
          cleanup();
          reject(new Error('Socket reconnect failed'));
        }

        const timeoutId = window.setTimeout(() => {
          cleanup();
          reject(new Error('Socket reconnect timeout'));
        }, 5000);

        socket.once('connect', handleConnect);
        socket.once('connect_error', handleConnectError);
        socket.disconnect();
        socket.connect();
      });

      return socket.connected;
    })().finally(() => {
      reconnectPromiseRef.current = null;
    });

    return reconnectPromiseRef.current;
  }, [socket]);

  useEffect(() => {
    let isMounted = true;

    const connectWithFreshToken = async () => {
      const token = await ensureFreshAccessToken();

      if (!isMounted || !token) {
        return;
      }

      socket.io.opts.query = {
        ...(socket.io.opts.query as Record<string, string>),
        accessToken: token,
      };

      if (!socket.connected) {
        socket.connect();
      }
    };

    const handleIncoming = (payload: SocketMessagePayload) => {
      if (!payload) {
        return;
      }

      const dialogPartnerId = payload.ownerId === myUserId ? payload.receiverId : payload.ownerId;

      if (dialogPartnerId) {
        queryClient.setQueryData(messengerKeys.dialog(dialogPartnerId), (prev: MessengerDialogCache | undefined) => {
          if (!prev?.pages?.length) {
            return prev;
          }

          const pages = [...prev.pages];
          const firstPage = pages[0];
          const items = firstPage?.items ?? [];
          const exists = items.some((item: MessageViewModel) => item.id === payload.id);

          if (exists) {
            return prev;
          }

          pages[0] = {
            ...firstPage,
            items: [payload, ...items],
          };

          return { ...prev, pages };
        });
      }

      queryClient.invalidateQueries({ queryKey: messengerKeys.all });
      onReceiveMessage?.(payload);
    };

    const handleMessageSend = (
      payload: SocketMessagePayload,
      callback?: (ack: { message: string; receiverId: number }) => void,
    ) => {
      handleIncoming(payload);

      if (callback && myUserId) {
        callback({
          message: payload.messageText,
          receiverId: myUserId,
        });
      }
    };

    const handleReconnect = () => {
      queryClient.invalidateQueries({ queryKey: messengerKeys.all });
    };

    const handleUpdateMessage = (payload: SocketMessagePayload) => {
      if (!payload) {
        return;
      }

      const dialogPartnerId = payload.ownerId === myUserId ? payload.receiverId : payload.ownerId;

      if (!dialogPartnerId) {
        return;
      }

      queryClient.setQueryData(messengerKeys.dialog(dialogPartnerId), (prev: MessengerDialogCache | undefined) => {
        if (!prev?.pages?.length) {
          return prev;
        }

        const pages = prev.pages.map((page) => ({
          ...page,
          items: (page.items ?? []).map((item) =>
            item.id === payload.id ? { ...item, messageText: payload.messageText, updatedAt: payload.updatedAt } : item,
          ),
        }));

        return { ...prev, pages };
      });
      queryClient.invalidateQueries({ queryKey: messengerKeys.dialogs('') });
    };

    const handleDeleteMessage = (payload: { id?: number; ownerId?: number; receiverId?: number }) => {
      if (!payload?.id) {
        return;
      }

      const possibleDialogIds = [payload.ownerId, payload.receiverId].filter(Boolean) as number[];

      possibleDialogIds.forEach((dialogId) => {
        queryClient.setQueryData(messengerKeys.dialog(dialogId), (prev: MessengerDialogCache | undefined) => {
          if (!prev?.pages?.length) {
            return prev;
          }

          const pages = prev.pages.map((page) => ({
            ...page,
            items: (page.items ?? []).filter((item) => item.id !== payload.id),
          }));

          return { ...prev, pages };
        });
      });

      queryClient.invalidateQueries({ queryKey: messengerKeys.all });
    };

    const handleConnectError = async () => {
      if (reconnectPromiseRef.current) {
        return;
      }

      await reconnectWithFreshToken().catch(() => undefined);
    };

    const normalizeSocketError = (error: SocketErrorPayload): { message: string; error?: string } => {
      if (typeof error.error === 'object' && error.error !== null) {
        return {
          message: error.error.message || error.message || 'Socket error',
          error: error.error.error,
        };
      }

      return {
        message: error.message || 'Socket error',
        error: error.error,
      };
    };

    const isAuthSocketError = (error: SocketErrorPayload) => {
      const normalized = normalizeSocketError(error);
      const text = `${normalized.message} ${normalized.error ?? ''} ${error.status ?? ''}`.toLowerCase();

      return (
        text.includes('auth_error') ||
        text.includes('authentication') ||
        text.includes('forbidden') ||
        text.includes('unauthorized') ||
        text.includes('token') ||
        text.includes('jwt')
      );
    };

    const handleError = (error: SocketErrorPayload) => {
      const normalized = normalizeSocketError(error);

      if (isAuthSocketError(error)) {
        if (!reconnectPromiseRef.current) {
          void reconnectWithFreshToken().catch(() => onErrorMessage?.(normalized));
        }
        return;
      }

      onErrorMessage?.(normalized);
    };

    const handleException = (error: SocketErrorPayload) => {
      const normalized = normalizeSocketError(error);

      if (isAuthSocketError(error)) {
        if (!reconnectPromiseRef.current) {
          void reconnectWithFreshToken().catch(() => onErrorMessage?.(normalized));
        }
        return;
      }

      onErrorMessage?.(normalized);
    };

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleIncoming);
    socket.on(SOCKET_EVENTS.MESSAGE_SEND, handleMessageSend);
    socket.on(SOCKET_EVENTS.UPDATE_MESSAGE, handleUpdateMessage);
    socket.on(SOCKET_EVENTS.MESSAGE_DELETED, handleDeleteMessage);
    socket.on(SOCKET_EVENTS.ERROR, handleError);
    socket.on('exception', handleException);
    socket.on('connect_error', handleConnectError);
    socket.on('reconnect', handleReconnect);
    void connectWithFreshToken();

    return () => {
      isMounted = false;
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleIncoming);
      socket.off(SOCKET_EVENTS.MESSAGE_SEND, handleMessageSend);
      socket.off(SOCKET_EVENTS.UPDATE_MESSAGE, handleUpdateMessage);
      socket.off(SOCKET_EVENTS.MESSAGE_DELETED, handleDeleteMessage);
      socket.off(SOCKET_EVENTS.ERROR, handleError);
      socket.off('exception', handleException);
      socket.off('connect_error', handleConnectError);
      socket.off('reconnect', handleReconnect);
    };
  }, [myUserId, onErrorMessage, onReceiveMessage, queryClient, reconnectWithFreshToken, socket]);

  const sendMessage = useCallback(
    ({ receiverId, message }: SendMessagePayload) => {
      const text = message.trim();

      if (!text) {
        return;
      }

      void reconnectWithFreshToken()
        .then((isConnected) => {
          if (!isConnected) {
            throw new Error('Socket reconnect failed');
          }

          socket.emit(SOCKET_EVENTS.RECEIVE_MESSAGE, {
            receiverId,
            message: text,
          });
        })
        .catch(() => {
          onErrorMessage?.({ message: 'Authentication error', error: 'AUTH_ERROR' });
        });
    },
    [onErrorMessage, reconnectWithFreshToken, socket],
  );

  const updateMessage = useCallback(
    ({ id, message }: UpdateMessagePayload) => {
      const text = message.trim();

      if (!text) {
        return;
      }

      void reconnectWithFreshToken()
        .then((isConnected) => {
          if (!isConnected) {
            throw new Error('Socket reconnect failed');
          }

          socket.emit(SOCKET_EVENTS.UPDATE_MESSAGE, {
            id,
            message: text,
          });
        })
        .catch(() => {
          onErrorMessage?.({ message: 'Authentication error', error: 'AUTH_ERROR' });
        });
    },
    [onErrorMessage, reconnectWithFreshToken, socket],
  );

  return { sendMessage, updateMessage };
};
