import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = () =>
  useQuery({
    queryKey: ['general'],
    queryFn: async () => {
      const response = await client.GET('/users/profile');
      if (response.error) {
        throw new Error(response.error);
      }

      return response.data;
    },
  });
