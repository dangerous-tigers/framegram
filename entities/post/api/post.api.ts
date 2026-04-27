import { UploadPostImagesResponse } from '@/entities/post/model/postTypes';
import { ResponseLikesType } from '@/features/post/viewPost/model/types';
import { client } from '@/shared/api/client';

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
      throw new Error('Error loading the post' + error);
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
      if (response.error) {
        throw response.error;
      }
      return response.data as ResponseLikesType;
    } catch (error) {
      throw new Error('Error loading likes' + error);
    }
  },
  postLike: async ({ id, likeStatus }: { id: number; likeStatus: 'LIKE' | 'DISLIKE' | 'NONE' }) => {
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

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
  addComent: async ({ id, content }: { id: number; content: string }) => {
    const response = await client.POST('/posts/{postId}/comments', {
      body: {
        content,
      },
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
  addAnswerToComment: async ({
    postId,
    commentId,
    content,
  }: {
    postId: number;
    commentId: number;
    content: string;
  }) => {
    const response = await client.POST('/posts/{postId}/comments/{commentId}/answers', {
      body: {
        content,
  comentLike: async ({
    postId,
    commentId,
    likeStatus,
  }: {
    postId: number;
    commentId: number;
    likeStatus: 'LIKE' | 'DISLIKE' | 'NONE';
  }) => {
    const response = await client.PUT('/posts/{postId}/comments/{commentId}/like-status', {
      body: {
        likeStatus,
      },
      params: {
        path: {
          postId: postId,
          commentId: commentId,
        },
      },
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
  answerLike: async ({
    postId,
    commentId,
    answerId,
    likeStatus,
  }: {
    postId: number;
    commentId: number;
    answerId: number;
    likeStatus: 'LIKE' | 'DISLIKE' | 'NONE';
  }) => {
    const response = await client.PUT('/posts/{postId}/comments/{commentId}/answers/{answerId}/like-status', {
      body: {
        likeStatus,
      },
      params: {
        path: {
          postId: postId,
          commentId: commentId,
          answerId: answerId,
        },
      },
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  },
};
