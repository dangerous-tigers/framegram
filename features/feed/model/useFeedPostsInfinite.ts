'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { feedApi } from './feed.api';

export function useFeedPostsInfinite() {
  return useInfiniteQuery({
    queryKey: ['feed-posts'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      return feedApi.getFeedPosts({
        pageNumber: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}
