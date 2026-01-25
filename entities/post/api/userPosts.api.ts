import { client } from '@/shared/api/client';

interface GetPostsByUserParams {
  userId: number;
  pageSize?: number;
  endCursorPostId?: number;
}

export const getPostsByUser = async (params: GetPostsByUserParams) => {
  const url = params.endCursorPostId
    ? `/posts/user/${params.userId}/${params.endCursorPostId}`
    : `/posts/user/${params.userId}`;

  const response = await client.GET(url, {
    params: {
      query: {
        pageSize: 12,
      },
    },
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};
