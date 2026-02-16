import { NotificationIntl, NotificationsResponse, SelectData } from '@/features/notifications/types';
import { client } from '@/shared/api/client';
import { NOTIFICATION_PORTION } from '@/shared/constants/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props = {
  isOpen: boolean;
  status: 'success' | 'error' | 'idle' | 'pending';
};

const i18Notify = (item: NotificationIntl) => {
  const message = item.message;

  if (
    message.substring(0, item.message.length - 12).includes('Your subscription has been activated and is valid until')
  ) {
    return { ...item, type: 'hasBeenActivated' };
  }
  if (message.includes('Your next payment will be charged in 1 day')) {
    return { ...item, type: 'nextPayment' };
  }
  if (message.includes('Your subscription ends in 7 days')) {
    return { ...item, type: 'endsAfterWeek' };
  }
  if (message.includes('Your subscription expires in 1 days')) {
    return { ...item, type: 'endsAfterDay' };
  }

  return item;
};

export const useInfinityNotifications = ({ isOpen, status }: Props) => {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['notifications'],
    enabled: isOpen || status === 'success',
    refetchOnMount: false,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await client.GET('/notifications/{cursor}', {
        params: {
          path: {
            cursor: pageParam,
          },
          query: {
            pageSize: NOTIFICATION_PORTION,
            isRead: false,
          },
        },
      });
      return response.data as NotificationsResponse;
    },
    getNextPageParam: (lastPage: NotificationsResponse) => {
      const nextCursor = lastPage.items?.at(-1)?.id;
      return nextCursor;
    },
    select: (data: SelectData) => {
      return {
        items: data.pages.flatMap((page) => page.items).map(i18Notify),
        totalCount: data.pages[0].totalCount,
        notReadCount: data.pages[0].notReadCount,
      };
    },
  });
  return {
    notifications: data,
    fetchNextPage,
    isLoading,
  };
};
