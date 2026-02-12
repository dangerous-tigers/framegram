'use client';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import { OutlineBell } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { client } from '@/shared/api/client';
import { NOTIFICATION_PORTION } from '@/shared/constants/constants';
import { useIntersection } from '@/shared/lib/hooks';
import { Scroll } from '@/shared/ui/notifications/ScrollArea';
import { getSocket, SOCKET_EVENTS } from '@/shared/ui/notifications/socket';
import { NotificationsResponse, SelectData } from '@/shared/ui/notifications/types';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import { Notification } from './Notification';

import s from './Notifications.module.scss';

type Props = {
  className?: string;
};

export const Notifications = ({ className }: Props) => {
  const { data, isLoading, isFetching } = useMe();
  const queryClient = useQueryClient();
  const socket = getSocket();

  useEffect(() => {
    socket.connect();

    socket.on(SOCKET_EVENTS.NOTIFICATIONS, (event) => {
      if (!notifications) {
        queryClient.setQueryData(['first_batch_of_notifications'], (prev: NotificationsResponse) => {
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

  const { data: firstBatchOfNotifications } = useQuery({
    queryKey: ['first_batch_of_notifications'],
    enabled: Boolean(data),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await client.GET('/notifications/{cursor}', {
        params: {
          path: {
            cursor: 0,
          },
          query: {
            pageSize: NOTIFICATION_PORTION,
          },
        },
      });
      return response.data;
    },
  });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = triggerRef.current?.getAttribute('state-open') === 'open';

  const { data: notifications, fetchNextPage } = useInfiniteQuery({
    queryKey: ['notifications'],
    enabled: isOpen,
    refetchOnMount: false,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await client.GET('/notifications/{cursor}', {
        params: {
          path: {
            cursor: pageParam,
          },
          query: {
            pageSize: NOTIFICATION_PORTION,
          },
        },
      });
      return response.data as NotificationsResponse;
    },
    getNextPageParam: (lastPage: NotificationsResponse) => {
      const nextCursor = lastPage.items?.at(-1)?.id;
      return nextCursor;
    },
    select: (data: SelectData) => {
      return {
        items: data.pages.flatMap((page) => page.items),
        totalCount: data.pages[0].totalCount,
        notReadCount: data.pages[0].notReadCount,
      };
    },
  });

  const nextPortionRef = useIntersection(() => fetchNextPage());

  return (
    <DropdownMenu.Root>
      {(data && isLoading) || (data && isFetching) ? (
        <Skeleton className={s.skeleton} />
      ) : (
        <DropdownMenu.Trigger
          className={clsx(s.trigger, className)}
          ref={triggerRef}
          asChild
        >
          {data && (
            <div>
              <OutlineBell />
              {!notifications && <span>{firstBatchOfNotifications?.notReadCount}</span>}
              {notifications && notifications.notReadCount! > 0 && notifications.notReadCount <= 99 && (
                <span>{notifications?.notReadCount}</span>
              )}
              {notifications && notifications.notReadCount > 99 && <span className={s.ellipsis}>...</span>}
            </div>
          )}
        </DropdownMenu.Trigger>
      )}

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align='end'
          arrowPadding={10}
          className={s.content}
          sideOffset={5}
        >
          <Scroll>
            <span className={s.title}>Уведомления</span>
            <DropdownMenu.Separator className={s.separator} />
            {notifications?.items.map((notification) => (
              <Notification
                notification={notification}
                key={notification.id}
              />
            ))}
            {notifications && notifications?.items.length === notifications?.notReadCount && (
              <DropdownMenu.Item className={s.endOfNotifyFeed}>Вы достигли конца ленты</DropdownMenu.Item>
            )}
            <div ref={nextPortionRef}></div>
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
