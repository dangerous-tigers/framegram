import { useEffect } from 'react';

import { getSocket } from '@/features/notifications/api/socket';
import { SOCKET_EVENTS } from '@/features/notifications/api/types';
import { SelectData, SocketNotificationsResponse } from '@/features/notifications/types';
import { useQueryClient } from '@tanstack/react-query';

export const useNotificationsSocket = ({ notifications }: { notifications?: SocketNotificationsResponse }) => {
  const queryClient = useQueryClient();
  const socket = getSocket();

  useEffect(() => {
    socket.connect();

    socket.on(SOCKET_EVENTS.NOTIFICATIONS, (event) => {
      if (!notifications) {
        queryClient.setQueryData(['initNotifications'], (prev: SocketNotificationsResponse) => {
          if (!prev) return prev;

          return {
            ...prev,
            items: [event, ...prev.items],
            totalCount: prev.totalCount + 1,
            notReadCount: prev.notReadCount + 1,
          };
        });
      }
      queryClient.setQueryData(['notifications'], (prev: SelectData) => {
        if (!prev) return prev;
        return {
          ...prev,
          pages: prev.pages.map((page, index) =>
            index === 0
              ? {
                  ...page,
                  items: [event, ...page.items],
                  totalCount: page.totalCount + 1,
                  notReadCount: page.notReadCount + 1,
                }
              : page,
          ),
        };
      });
    });
    return () => {
      socket.off(SOCKET_EVENTS.NOTIFICATIONS);
      socket.disconnect();
    };
  }, []);
};
