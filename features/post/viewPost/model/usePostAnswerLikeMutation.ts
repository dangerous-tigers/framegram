import { postApi } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostAnswerLikeMutation() {
  const qc = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
      answerId,
      likeStatus,
    }: {
      postId: number;
      commentId: number;
      answerId: number;
      likeStatus: 'LIKE' | 'DISLIKE' | 'NONE';
    }) => {
      return postApi.answerLike({ commentId, postId, answerId, likeStatus });
    },
    onError: () => {
      show({
        error: 'Like update error',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['answers'] });
    },
  });
}
