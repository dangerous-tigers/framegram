import { useTranslations } from 'next-intl';

import { UploadPostImagesResponse } from '@/entities/post/model/postTypes';
import { ResponseLikesType } from '@/features/post/viewPost/model/types';
import { client } from '@/shared/api/client';
// export const uploadPostImages = async (files: File[]) => {
//   return client.POST('/posts/image', {
//     body: {
//       file: files, // Тут типизация не дает передать файл - там стоит String
//     },
//   })
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

export const postApi = {
  getPostById: async ({ id }: { id: number }) => {
    const t = useTranslations('createPost');

    try {
      const response = await client.GET('/posts/id/{postId}', {
        params: {
          path: {
            postId: id,
          },
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(t('Error loading the post') + error);
    }
  },
  getPostByIdServer: async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/posts/id/${id}`, {
        cache: 'no-store',
        credentials: 'include',
      });
      return res.json();
    } catch (error) {
      throw new Error('Error loading the post' + error);
    }
  },
  getPostsByUser: async (userId: number, endCursorPostId: number = 0) => {
    try {
      const response = await client.GET('/posts/user/{userId}/{endCursorPostId}', {
        params: {
          path: {
            userId,
            endCursorPostId,
          },
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error loading posts' + error);
    }
  },
  deletePost: async (id: number) => {
    try {
      const response = await client.DELETE('/posts/{postId}', {
        params: {
          path: {
            postId: id,
          },
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error deleting a post' + error);
    }
  },
  getPostLikes: async (id: number) => {
    try {
      const response = await client.GET('/posts/{postId}/likes', {
        params: {
          path: {
            postId: id,
          },
        },
      });
      return response.data as ResponseLikesType;
    } catch (error) {
      throw new Error('Error loading likes' + error);
    }
  },
  postLike: async ({ id, likeStatus }: { id: number; likeStatus: 'LIKE' | 'DISLIKE' | 'NONE' }) => {
    try {
      const response = await client.PUT('/posts/{postId}/like-status', {
        body: {
          likeStatus,
        },
        params: {
          path: {
            postId: id,
          },
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error loading likes' + error);
    }
  },
};
