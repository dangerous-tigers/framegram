import { Dispatch } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

import { NotificationIntl } from '@/features/notifications/types';
import { useTimeAgo } from '@/shared/lib/hooks';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Notification.module.scss';

type Props = {
  notification: NotificationIntl;
  isRead: boolean;
  setSelectedIds: Dispatch<React.SetStateAction<number[]>>;
};

export const Notification = ({ notification, isRead, setSelectedIds }: Props) => {
  const timeAgo = useTimeAgo(notification.createdAt);

  const t = useTranslations('profile.notifications');

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
      {/* <p className={clsx(s.notification, isRead && s.isRead)}>{notification.message}</p> */}
      <p className={clsx(s.notification, isRead && s.isRead)}>
        {t('notification', {
          type: notification.type,
          date: notification.message.substring(notification.message.length - 11),
        })}
      </p>
      <span className={s.timeAgo}>{timeAgo}</span>
      <DropdownMenu.Separator className={s.separator} />
    </DropdownMenu.Item>
  );
};
