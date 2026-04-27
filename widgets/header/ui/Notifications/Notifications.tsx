import { Notifications as NotificationsUI } from '@/features/notifications';

type PropsNotifications = {
  className?: string;
};

export const Notifications = (props: PropsNotifications) => {
  const { className } = props;

  return (
    <div className={className}>
      <NotificationsUI />
    </div>
  );
};
