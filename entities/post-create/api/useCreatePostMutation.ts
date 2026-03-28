import { createPost, uploadPostImages } from '@/entities/post/api/post.api';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePostMutation = () => {
  const { show } = useAlertStore();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, description }: { files: File[]; description?: string }) => {
      const uploadRes = await uploadPostImages(files);

      const { data, error } = uploadRes;

      if (error || !data) throw error;

      const uploadIds = data.images.map((img) => img.uploadId);

      const postRes = await createPost({
        description,
        uploadIds,
      });
      return postRes.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user-posts'] });
    },
    onError: (error) => {
      show({
        error: error.message ? error.message : 'Some occurred error',
        severity: 'error',
        variant: 'default',
        description: null,
      });
    },
  });
};
