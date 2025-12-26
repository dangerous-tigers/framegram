import { client } from '@/shared/api/client';
import { useMutation } from '@tanstack/react-query';

type UploadImageResponse = {
  images: {
    uploadId: string;
    url: string;
    width: number;
    height: number;
    fileSize: number;
    createdAt: string;
  }[];
};

export const uploadPostImages = async (files: File[]) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('file', file);
  });

  const res = await client.POST('/posts/image', {
    body: formData,
  });

  return res.data as UploadImageResponse;
};

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: async ({ files, description }: { files: File[]; description?: string }) => {
      const uploadRes = await uploadPostImages(files);

      const uploadIds = uploadRes.images.map((img) => img.uploadId);

      const postRes = await createPost({
        description,
        uploadIds,
      });

      return postRes.data;
    },
  });
};
