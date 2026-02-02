import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

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
