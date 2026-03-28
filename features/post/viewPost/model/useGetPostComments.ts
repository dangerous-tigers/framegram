import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export function useGetPostComments({ postId }: { postId: number }) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      try {
        const response = await client.GET('/posts/{postId}/comments', {
          params: {
            path: {
              postId: postId,
            },
          },
        });
        return response.data;
      } catch (error) {
        throw new Error('Ошибка загрузки комментариев' + error);
      }
    },
  });
}
