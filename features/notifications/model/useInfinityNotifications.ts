import { NotificationsResponse, SelectData } from '@/features/notifications/types';
import { client } from '@/shared/api/client';
import { NOTIFICATION_PORTION } from '@/shared/constants/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props = {
  isOpen: boolean;
  status: 'success' | 'error' | 'idle' | 'pending';
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
        items: data.pages.flatMap((page) => page.items),
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
