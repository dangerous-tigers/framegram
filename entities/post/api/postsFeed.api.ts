import { client } from '@/shared/api/client';
import { PublicationsFollowersWithPaginationViewModel, PostViewModel } from '@/shared/api/schema.d.ts';

export interface GetPostsFeedParams {
  pageSize?: number;
  endCursorPostId?: number;
}

export const getPostsFeed = async (params: GetPostsFeedParams = {}) => {
  const response = await client.GET('/home/publications-followers', {
    params: {
      query: {
        pageSize: params.pageSize ?? 10,
        endCursorPostId: params.endCursorPostId,
      },
    },
  });

  if (response.error) {
    throw response.error;
  }

  return response.data as PublicationsFollowersWithPaginationViewModel;
};

export interface UsePostsFeedReturn {
  posts: PostViewModel[];
  hasNext: boolean;
  endCursor: number | null;
  isLoading: boolean;
  error: unknown;
  loadMore: () => void;
  refetch: () => void;
}
