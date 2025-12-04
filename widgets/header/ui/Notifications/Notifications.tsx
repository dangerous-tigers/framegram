import s from './notifications.module.scss';
import clsx from 'clsx';
import { OutlineBell } from '@/assets/icons';

type PropsNotifications = {
  className?: string;
};

export const Notifications = (props: PropsNotifications) => {
  const { className } = props;

  return (
    <div className={clsx(className, s.notifications)}>
      <OutlineBell />
      <span>9</span>
    </div>
  );
};
