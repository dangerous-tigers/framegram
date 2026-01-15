import { useQuery } from '@tanstack/react-query';

import { client } from '@/shared/api/client';

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
      const response = await client.GET('/posts/{postId}/comments/{commentId}/answers', {
        params: {
          path: {
            postId: postId,
            commentId: commentId,
          },
        },
      });
      return response.data?.items;
    },
  });
}
