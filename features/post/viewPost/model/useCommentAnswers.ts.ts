import { client } from '@/shared/api/client';
import { useQuery } from '@tanstack/react-query';

export function useCommentAnswers({
  commentId,
  postId,
  openAnswer,
}: {
  commentId: number;
  postId: number;
  openAnswer: boolean;
}) {
  return useQuery({
    queryKey: ['answers', postId, commentId],
    enabled: openAnswer,
    queryFn: async () => {
      try {
        const response = await client.GET('/posts/{postId}/comments/{commentId}/answers', {
          params: {
            path: {
              postId: postId,
              commentId: commentId,
            },
          },
        });
        return response.data?.items;
      } catch (error) {
        throw new Error('Ошибка загрузки ответов' + error);
      }
    },
  });
}
