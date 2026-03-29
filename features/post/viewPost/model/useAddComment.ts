import { postApi } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddComment() {
  const qc = useQueryClient();
  const { show } = useAlertStore();

  return useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) => postApi.addComent({ id, content }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => {
      show({
        error: 'Error adding a comment',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
}
