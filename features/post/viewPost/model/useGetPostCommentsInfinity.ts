import { useInfiniteQuery } from '@tanstack/react-query';

import { client } from '@/shared/api/client';

export function useGetPostCommentsInfinity({ postId }: { postId: number }) {
  const pageSize = 4;

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET('/posts/{postId}/comments', {
        params: {
          path: {
            postId: postId,
          },
          query: {
            pageNumber: pageParam,
            pageSize: pageSize,
          },
        },
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Проверяем, есть ли еще данные
      const totalLoaded = allPages.reduce((sum, page) => sum + (page?.items?.length || 0), 0);
      const totalCount = lastPage?.totalCount || 0;

      // Если загрузили все - возвращаем undefined
      if (totalLoaded >= totalCount) {
        return undefined;
      }

      // Возвращаем номер следующей страницы
      return allPages.length + 1;
    },
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    comments: data?.pages.flatMap((page) => page?.items || []) || [],
  };
}
