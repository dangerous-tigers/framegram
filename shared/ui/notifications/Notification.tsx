import { Dispatch } from 'react';
import clsx from 'clsx';

import { useTimeAgo } from '@/shared/lib/hooks';
import { NotificationsView } from '@/shared/ui/notifications/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Notification.module.scss';

type Props = {
  notification: NotificationsView;
  isRead: boolean;
  setSelectedIds: Dispatch<React.SetStateAction<number[]>>;
};

export const Notification = ({ notification, isRead, setSelectedIds }: Props) => {
  const timeAgo = useTimeAgo(notification.createdAt);

  const handleSelectNotify = (e: Event) => {
    setSelectedIds((prev) => {
      if (prev.includes(notification.id)) return prev.filter((id: number) => id !== notification.id);
      return [...prev, notification.id];
    });
    e.preventDefault();
  };

  return (
    <DropdownMenu.Item
      className={s.item}
      key={notification.id}
      onSelect={handleSelectNotify}
    >
      {!notification.isRead && !isRead && <span className={s.rightSlot}>Новое уведомление!</span>}
      <p className={clsx(s.notification, isRead && s.isRead)}>{notification.message}</p>
      <span className={s.timeAgo}>{timeAgo}</span>
      <DropdownMenu.Separator className={s.separator} />
    </DropdownMenu.Item>
  );
};
