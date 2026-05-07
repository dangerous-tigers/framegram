'use client';

import { useCallback, useEffect } from 'react';

import { getSocket } from '@/features/notifications/api/socket';
import { SOCKET_EVENTS } from '@/features/notifications/api/types';
import { refreshClient } from '@/shared/api/client';
import { components } from '@/shared/api/schema';
import { ACCESS_TOKEN } from '@/shared/constants/constants';
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

export const useMessengerSocket = ({ myUserId, onReceiveMessage, onErrorMessage }: UseMessengerSocketArgs) => {
  const socket = getSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    let isMounted = true;

    const refreshAccessToken = async () => {
      const response = await refreshClient.POST('/auth/update');
      const accessToken = response.data?.accessToken;

      if (!accessToken) {
        return null;
      }

      localStorage.setItem(ACCESS_TOKEN, accessToken);
      return accessToken;
    };

    const connectWithFreshToken = async () => {
      const localToken = localStorage.getItem(ACCESS_TOKEN);
      const token = localToken || (await refreshAccessToken());

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
      await connectWithFreshToken();
    };

    const handleError = (error: { message: string; error?: string }) => {
      onErrorMessage?.(error);
    };

    const handleException = (error: { message: string; error?: string }) => {
      onErrorMessage?.(error);
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
  }, [myUserId, onErrorMessage, onReceiveMessage, queryClient, socket]);

  const sendMessage = useCallback(
    ({ receiverId, message }: SendMessagePayload) => {
      const text = message.trim();

      if (!text) {
        return;
      }

      socket.emit(SOCKET_EVENTS.RECEIVE_MESSAGE, {
        receiverId,
        message: text,
      });
    },
    [socket],
  );

  const updateMessage = useCallback(
    ({ id, message }: UpdateMessagePayload) => {
      const text = message.trim();

      if (!text) {
        return;
      }

      socket.emit(SOCKET_EVENTS.UPDATE_MESSAGE, {
        id,
        message: text,
      });
    },
    [socket],
  );

  return { sendMessage, updateMessage };
};
