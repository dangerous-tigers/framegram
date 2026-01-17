import { UploadPostImagesResponse } from '@/entities/post/model/postTypes';
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
  getPostsByUser: async (userId: number, endCursorPostId: number = 0) => {
    const response = await client.GET('/posts/user/{userId}/{endCursorPostId}', {
      params: {
        path: {
          userId,
          endCursorPostId,
        },
      },
    });
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
  deletePost: async (id: number) => {
    if (!id) {
      throw new Error('Post ID is required for deletion');
    }

    const response = await client.DELETE('/posts/{postId}', {
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
};
