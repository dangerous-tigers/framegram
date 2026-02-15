'use client';
import { useRef } from 'react';

import { OutlineBell } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { useNotificationsSocket } from '@/features/notifications/api/useNotificationsSocket';
import { useGetNotifications, useInfinityNotifications, useMarkAsRead } from '@/features/notifications/model';
import { useDebounce } from '@/shared/hooks';
import { useIntersection } from '@/shared/lib/hooks';
import { Scroll } from '@/shared/ui/scroll';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Notification } from './Notification';

import s from './Notifications.module.scss';

export const Notifications = () => {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = triggerRef.current?.getAttribute('state-open') === 'open';

  const { data, isLoading: meIsLoading, isFetching } = useMe();
  const { mutate, status, selectedIds, setSelectedIds } = useMarkAsRead();
  const { initNotifications, notReadCount } = useGetNotifications();
  const { notifications, fetchNextPage, isLoading } = useInfinityNotifications({ isOpen, status });
  useNotificationsSocket({ notifications });

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
