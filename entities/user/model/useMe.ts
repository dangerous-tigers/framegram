import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const clientResponse = await client.GET('/auth/me');
      return clientResponse.data;
    },
    retry: 0,
    staleTime: 0,
  });
};
