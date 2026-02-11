import { Notifications as NotificationsUI } from '@/shared/ui/notifications';

type PropsNotifications = {
  className?: string;
};

export const Notifications = (props: PropsNotifications) => {
  const { className } = props;

  return <NotificationsUI className={className} />;
};
