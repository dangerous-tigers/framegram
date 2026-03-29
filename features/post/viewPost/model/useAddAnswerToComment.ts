import { postApi } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddAnswerToComment() {
  const qc = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: ({ postId, commentId, content }: { postId: number; commentId: number; content: string }) =>
      postApi.addAnswerToComment({ postId, commentId, content }),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['comments', variables.postId] });
      qc.invalidateQueries({ queryKey: ['answers', variables.postId, variables.commentId] });
    },
    onError: () => {
      show({
        error: 'Add answer error, try again',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
}
