'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { searchApi } from './search.api';

export const useSearchUsersInfinite = (search: string) => {
  return useInfiniteQuery({
    queryKey: ['search-users', search],
    queryFn: ({ pageParam }) =>
      searchApi.getUsers({
        search,
        cursor: pageParam ? Number(pageParam) : undefined,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: search.trim().length > 0,
  });
};
