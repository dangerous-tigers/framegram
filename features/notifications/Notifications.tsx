'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { OutlineBell } from '@/assets/icons';
import { useMe } from '@/entities/user/model/useMe';
import { useTimeAgo } from '@/shared/lib/hooks';
import {
  notificationWebSocketService,
  useNotificationWSStore,
} from '@/shared/lib/websocket/notification-websocket.service';
import { Scroll } from '@/shared/ui/scroll';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import type { NotificationsView } from './types';

import s from './Notifications.module.scss';

export const Notifications = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { data: meData, isLoading: meLoading } = useMe();
  const notifications = useNotificationWSStore((state) => state.notifications);
  const unreadCount = useNotificationWSStore((state) => state.unreadCount);

  useEffect(() => {
    if (meData?.accessToken) {
      notificationWebSocketService.connect(meData.accessToken);
    }
  }, [meData?.accessToken]);

  const notificationsList = notifications || [];

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedIds([]);
    }
  };

  const handleSelectNotify = (notification: NotificationsView) => {
    setSelectedIds((prev) => {
      if (prev.includes(notification.id)) return prev.filter((id) => id !== notification.id);
      return [...prev, notification.id];
    });
  };

  const handleMarkAsRead = () => {
    if (selectedIds.length > 0) {
      notificationWebSocketService.markAsRead(selectedIds);
      setSelectedIds([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleMarkAsRead();
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedIds]);

  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      {meLoading ? (
        <Skeleton className={s.skeleton} />
      ) : (
        <DropdownMenu.Trigger
          className={s.trigger}
          asChild
        >
          {meData && (
            <div>
              <OutlineBell />
              {unreadCount > 0 && unreadCount <= 99 && <span>{unreadCount}</span>}
              {unreadCount > 99 && <span className={s.ellipsis}>...</span>}
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
          onPointerDownOutside={() => handleMarkAsRead()}
        >
          <Scroll>
            <span className={s.title}>Уведомления</span>
            <DropdownMenu.Separator className={s.separator} />

            {notificationsList.length === 0 ? (
              <DropdownMenu.Item className={s.endOfNotifyFeed}>Нет уведомлений</DropdownMenu.Item>
            ) : (
              notificationsList.map((notification) => {
                const isSelected = selectedIds.includes(notification.id);
                const isRead = notification.isRead || isSelected;

                return (
                  <DropdownMenu.Item
                    key={notification.id}
                    className={s.item}
                    onSelect={() => handleSelectNotify(notification)}
                  >
                    {!notification.isRead && !isSelected && <span className={s.rightSlot}>Новое уведомление!</span>}
                    <p className={clsx(s.notification, isRead && s.isRead)}>{notification.message}</p>
                    <span className={s.timeAgo}>{useTimeAgo(notification.createdAt)}</span>
                    <DropdownMenu.Separator className={s.separator} />
                  </DropdownMenu.Item>
                );
              })
            )}
          </Scroll>
          <DropdownMenu.Arrow className={s.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
