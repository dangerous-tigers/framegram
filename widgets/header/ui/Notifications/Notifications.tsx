import clsx from 'clsx';

import s from './notifications.module.scss';

import { OutlineBell } from '@/assets/icons';

type PropsNotifications = {
  className?: string;
};

export const Notifications = (props: PropsNotifications) => {
  const { className } = props;

  return (
    <div className={clsx(s.notifications, className)}>
      <OutlineBell />
      <span>9</span>
    </div>
  );
};
