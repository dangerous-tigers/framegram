import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import { useTimeAgo } from '@/shared/lib/hooks';
import { NotificationsView } from '@/shared/ui/notifications/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Notification.module.scss';

export const Notification = ({
  notification,
  setIsRead,
}: {
  notification: NotificationsView;
  setIsRead: (ids: number[]) => void;
}) => {
  const timeAgo = useTimeAgo(notification.createdAt);

  return (
    <DropdownMenu.Item
      className={s.item}
      key={notification.id}
      onSelect={(e) => {
        setIsRead((prev) => {
          // если id уже есть — не добавляем (защита от дублей)
          if (prev.includes(notification.id)) return prev;

          return [...prev, notification.id];
        });
        e.preventDefault();
      }}
    >
      {!notification.isRead && <span className={s.rightSlot}>Новое уведомление!</span>}
      <p className={clsx(s.notification, notification.isRead && s.isRead)}>{notification.message}</p>
      <span className={s.timeAgo}>{timeAgo}</span>
      <DropdownMenu.Separator className={s.separator} />
    </DropdownMenu.Item>
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

export default { useDebounce };
