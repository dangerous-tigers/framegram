import { createPost, uploadPostImages } from '@/entities/post/api/post.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files, description }: { files: File[]; description?: string }) => {
      try {
        const uploadRes = await uploadPostImages(files);

        const { data, error } = uploadRes;

        if (error || !data) throw error;

        const uploadIds = data.images.map((img) => img.uploadId);

        const postRes = await createPost({
          description,
          uploadIds,
        });
        return postRes.data;
      } catch (error) {
        throw new Error('Ошибка загрузки файлов' + error);
      }
    },
    onSuccess: async () => {
      try {
        await queryClient.invalidateQueries({ queryKey: ['user-posts'] });
      } catch (error) {
        throw new Error('Ошибка обновления кэша' + error);
      }
    },
    onError: (error) => {
      throw new Error('Ошибка загрузки файлов' + error);
    },
  });
};
