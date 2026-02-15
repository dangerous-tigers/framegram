import { useMe } from '@/entities/user/model/useMe';
import { client } from '@/shared/api/client';
import { NOTIFICATION_PORTION } from '@/shared/constants/constants';
import { useQuery } from '@tanstack/react-query';

export const useGetNotifications = () => {
  const { data: me } = useMe();

  const { data } = useQuery({
    queryKey: ['initNotifications'],
    enabled: Boolean(me),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await client.GET('/notifications/{cursor}', {
        params: {
          path: {
            cursor: 0,
          },
          query: {
            pageSize: NOTIFICATION_PORTION,
          },
        },
      });
      return response.data;
    },
  });
  return {
    initNotifications: data?.items,
    notReadCount: data?.notReadCount,
  };
};
