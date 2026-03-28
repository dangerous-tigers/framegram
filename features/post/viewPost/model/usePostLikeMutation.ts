import { postApi } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePostLikesMutation() {
  const qc = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: ({ id, likeStatus }: { id: number; likeStatus: 'LIKE' | 'DISLIKE' | 'NONE' }) => {
      return postApi.postLike({ id, likeStatus });
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
      qc.invalidateQueries({ queryKey: ['post-likes'] });
    },
  });
}
