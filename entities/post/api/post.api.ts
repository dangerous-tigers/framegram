import { client } from '@/shared/api/client';

export const postApi = {
  deletePost: (postId: number) => {
    return client.DELETE('/posts/{postId}', {
      params: {
        path: {
          postId,
        },
      },
    });
  },
  getPostsByUser: (userId: number, endCursorPostId: number = 0) => {
    return client.GET('/posts/user/{userId}/{endCursorPostId}', {
      params: {
        path: {
          userId,
          endCursorPostId,
        },
      },
    });
  },
};
