import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/api/client';

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const clientResponce = await client.GET('/auth/me');
      return clientResponce.data;
    },
    retry: 0,
    staleTime: 0,
  });
};
