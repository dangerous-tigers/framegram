export type NotificationsView = {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
};
export interface NotificationIntl extends NotificationsView {
  type: 'hasBeenActivated' | 'nextPayment' | 'endsAfterWeek' | 'endsAfterDay';
}

export type SocketNotificationsResponse = {
  pageSize?: number;
  totalCount: number;
  notReadCount: number;
  items: NotificationsView[];
};

export type NotificationsResponse = {
  pageSize?: number;
  totalCount: number;
  notReadCount: number;
  items: NotificationIntl[];
};

export type SelectData = {
  pageParams: number[];
  pages: NotificationsResponse[];
};
