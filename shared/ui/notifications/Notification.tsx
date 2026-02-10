import { useTimeAgo } from '@/shared/lib/hooks';
import { NotificationsView } from '@/shared/ui/notifications/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import s from './Notification.module.scss';

export const Notification = ({ notification }: { notification: NotificationsView }) => {
  const timeAgo = useTimeAgo(notification.createdAt);

  return (
    <DropdownMenu.Item
      className={s.item}
      key={notification.id}
    >
      {!notification.isRead && <span className={s.rightSlot}>Новое уведомление!</span>}
      <p className={s.notification}>Ваша подписка активирована и действует до 03.02.2025</p>
      <span className={s.timeAgo}>{timeAgo}</span>
      <DropdownMenu.Separator className={s.separator} />
    </DropdownMenu.Item>
  );
};
