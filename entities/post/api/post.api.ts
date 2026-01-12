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

import { client } from '@/shared/api/client';

export const postApi = {
  getPostById: async ({ id }: { id: number }) => {
    const response = await client.GET('/posts/id/{postId}', {
      params: {
        path: {
          postId: id,
        },
      },
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
  getPostByIdServer: async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/posts/${id}`, {
      cache: 'no-store',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post ${id}`);
    }

    return res.json();
  },
  deletePost: async (id: number) => {
    if (!id) {
      throw new Error('Post ID is required for deletion');
    }
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Access token not found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.text();

      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
    }

    // Для статуса 204 (No Content) не нужно парсить JSON
    if (response.status === 204) {
      return {};
    }
    const data = await response.json();

    return data;
  },
};
