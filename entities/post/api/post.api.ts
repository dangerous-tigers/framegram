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
};
