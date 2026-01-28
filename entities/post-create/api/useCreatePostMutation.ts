import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost, uploadPostImages } from '@/entities/post/api/post.api';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, description }: { files: File[]; description?: string }) => {
      const uploadRes = await uploadPostImages(files);

      const { data, error } = uploadRes;

      if (error || !data) {
        throw error;
      }

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
  });
};
