import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/api/client';

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
