import { UserProfileByIdWithPostsResponse } from '@/entities/profile';
import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export function useGetProfileByUserName(userName: string) {
  return useQuery({
    queryKey: ['profile', userName],
    queryFn: async () => {
      const response = await client.GET('/users/{userName}', {
        params: {
          path: {
            userName,
          },
        },
      });

      if (response.error) {
        throw new Error('Failed to fetch profile');
      }

      return response.data as UserProfileByIdWithPostsResponse;
    },
    enabled: !!userName,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
