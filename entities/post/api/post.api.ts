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
};
