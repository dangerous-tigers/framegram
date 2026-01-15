import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/api/client';

export function useGetPostComments({ postId }: { postId: number }) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const response = await client.GET('/posts/{postId}/comments', {
        params: {
          path: {
            postId: postId,
          },
        },
      });
      return response.data;
    },
  });
}
