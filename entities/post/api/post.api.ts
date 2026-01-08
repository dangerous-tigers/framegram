import { client } from '@/shared/api/client';
import { UploadPostImagesResponse } from '@/entities/post/model/postTypes';

// export const uploadPostImages = async (files: File[]) => {
//   return client.POST('/posts/image', {
//     body: {
//       file: files, // Тут типизация не дает передать файл - там стоит String
//     },
//   });
// };

export async function uploadPostImages(files: File[]): Promise<{ data?: UploadPostImagesResponse; error?: unknown }> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('file', file);
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/posts/image`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });

  if (!res.ok) {
    return { error: await res.json() };
  }

  const data: UploadPostImagesResponse = await res.json();
  return { data };
}

export const createPost = async (args: { description?: string; uploadIds: string[] }) => {
  return client.POST('/posts', {
    body: {
      description: args.description,
      childrenMetadata: args.uploadIds.map((id) => ({
        uploadId: id,
      })),
    },
  });
};
