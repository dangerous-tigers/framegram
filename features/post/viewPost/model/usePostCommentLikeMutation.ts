import { postApi } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostCommentLikeMutation() {
  const qc = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      likeStatus,
    }: {
      postId: number;
      commentId: number;
      likeStatus: 'LIKE' | 'DISLIKE' | 'NONE';
    }) => {
      return postApi.comentLike({ commentId, postId, likeStatus });
    },
    onError: () => {
      show({
        error: 'Like update error',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['comments', variables.postId] });
    },
  });
}
