export type NotificationsView = {
  id: number;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationsResponse = {
  pageSize: number;
  totalCount: number;
  notReadCount: number;
  items: NotificationsView[];
};
