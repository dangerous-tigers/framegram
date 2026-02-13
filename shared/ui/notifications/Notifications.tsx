'use client';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { OutlineBell } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { client } from '@/shared/api/client';
import { NOTIFICATION_PORTION } from '@/shared/constants/constants';
import { useIntersection } from '@/shared/lib/hooks';
import { Notification } from '@/shared/ui/notifications/Notification';
import { Scroll } from '@/shared/ui/notifications/ScrollArea';
import { getSocket, SOCKET_EVENTS } from '@/shared/ui/notifications/socket';
import { NotificationsResponse, SelectData } from '@/shared/ui/notifications/types';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import s from './Notifications.module.scss';

type Props = {
  className?: string;
};

export const Notifications = ({ className }: Props) => {
  const { data, isLoading: meIsLoading, isFetching } = useMe();
  const queryClient = useQueryClient();
  const socket = getSocket();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const useAsRead = useMutation({
    mutationKey: ['markAsRead'],
    mutationFn: async () => {
      await client.PUT('/notifications/mark-as-read', {
        body: {
          ids: selectedIds,
        },
      });
      const previousNotifications: SelectData = queryClient.getQueryData(['notifications'])!;

      const optimisticNotifications = {
        ...previousNotifications,
        pages: previousNotifications.pages.map((page) => {
          const idsToRemove = new Set(selectedIds.map((id) => id));

          return page
            ? {
                ...page,
                items: page.items.filter((item) => !idsToRemove.has(item.id)),
                totalCount: page.totalCount - selectedIds.length,
                notReadCount: page.notReadCount - selectedIds.length,
              }
            : page;
        }),
      };
      queryClient.setQueryData(['notifications'], optimisticNotifications);

      return { optimisticNotifications };
    },
    onSuccess: async (data) => {
      setSelectedIds([]);
      queryClient.setQueryData(['notifications'], data.optimisticNotifications);
    },
  });

  const handleAsRead = () => {
    if (!selectedIds.length) {
      return null;
    }
    useAsRead.mutate();
  };

  useDebounce(
    () => {
      handleAsRead();
    },
    1500,
    [selectedIds],
  );

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

  const {
    data: notifications,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['notifications'],
    enabled: isOpen || useAsRead.status === 'success',
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
            isRead: false,
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
      {(data && meIsLoading) || (data && isFetching) ? (
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
          onPointerDownOutside={handleAsRead}
        >
          <Scroll>
            {isLoading ? <Skeleton className={s.skeletonTitle} /> : <span className={s.title}>Уведомления</span>}

            <DropdownMenu.Separator className={s.separator} />
            {notifications?.items.map((notification) => {
              const isRead = selectedIds.includes(notification.id);

              return (
                <Notification
                  notification={notification}
                  key={notification.id}
                  isRead={isRead}
                  setSelectedIds={setSelectedIds}
                />
              );
            })}
            {isLoading &&
              firstBatchOfNotifications &&
              firstBatchOfNotifications.items?.map((notification) => (
                <DropdownMenu.Item key={notification.id}>
                  <Skeleton className={s.notifySkeleton} />
                  <DropdownMenu.Separator className={s.separator} />
                </DropdownMenu.Item>
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

const useDebounce = (callback: () => void | Promise<void>, delay: number, deps: React.DependencyList = []) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, ...deps]);
};

export default useDebounce;
