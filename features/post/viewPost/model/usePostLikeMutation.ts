import { postApi } from '@/entities/post/api/post.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostLikesMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, likeStatus }: { id: number; likeStatus: 'LIKE' | 'DISLIKE' | 'NONE' }) => {
      return postApi.postLike({ id, likeStatus });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['post-likes'] });
    },
  });
}
