import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const clientResponse = await client.GET('/auth/me');

      if (clientResponse.error) {
        return null;
      }

      return clientResponse.data;
    },
    retry: 0,
    staleTime: 5 * 60 * 100,
  });
};
