import { client } from '@/shared/api/client';
import type { SchemaUserWithPaginationViewDto } from '@/shared/api/schema';
import { USERS_PER_PAGE } from '@/shared/constants/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface UserSearchParams {
  search: string;
}

export function useSearchUsersQuery({ search }: UserSearchParams) {
  return useInfiniteQuery({
    queryKey: ['search-users', search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET('/users/search', {
        params: {
          query: {
            search,
            pageSize: USERS_PER_PAGE,
            pageNumber: pageParam,
          },
        },
      });

      if (response.error) {
        throw new Error('Search failed');
      }

      return response.data as SchemaUserWithPaginationViewDto;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = lastPage?.pagesCount || 0;

      if (currentPage >= totalPages) {
        return undefined;
      }

      return currentPage + 1;
    },
    enabled: search.length > 0,
    staleTime: 1000 * 60 * 5, // 5 минут
  });
}
