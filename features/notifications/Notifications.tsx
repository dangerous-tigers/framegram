'use client';
import { useEffect, useRef } from 'react';

import { OutlineBell } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { getSocket, SOCKET_EVENTS } from '@/features/notifications/api';
import { useGetNotifications, useInfinityNotifications, useMarkAsRead } from '@/features/notifications/model';
import { NotificationsResponse, SelectData } from '@/features/notifications/types';
import { useDebounce } from '@/shared/hooks';
import { useIntersection } from '@/shared/lib/hooks';
import { Scroll } from '@/shared/ui/scroll';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';

import { Notification } from './Notification';

import s from './Notifications.module.scss';

export const Notifications = () => {
  const queryClient = useQueryClient();
  const socket = getSocket();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = triggerRef.current?.getAttribute('state-open') === 'open';

  const { data, isLoading: meIsLoading, isFetching } = useMe();
  const { mutate, status, selectedIds, setSelectedIds } = useMarkAsRead();
  const { initNotifications, notReadCount } = useGetNotifications();
  const { notifications, fetchNextPage, isLoading } = useInfinityNotifications({ isOpen, status });

  const nextPortionRef = useIntersection(() => fetchNextPage());

  const handleAsRead = () => {
    if (!selectedIds.length) {
      return null;
    }
    mutate();
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
        queryClient.setQueryData(['initNotifications'], (prev: NotificationsResponse) => {
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

  return (
    <DropdownMenu.Root>
      {(data && meIsLoading) || (data && isFetching) ? (
        <Skeleton className={s.skeleton} />
      ) : (
        <DropdownMenu.Trigger
          className={s.trigger}
          ref={triggerRef}
          asChild
        >
          {data && (
            <div>
              <OutlineBell />
              {!notifications && <span>{notReadCount}</span>}
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
              initNotifications &&
              initNotifications.map((notification) => (
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
