import { client } from '@/shared/api/client';
import { PORTION_COMMENTS } from '@/shared/constants/constants';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetPostCommentsInfinity({ postId }: { postId: number }) {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const response = await client.GET('/posts/{postId}/comments', {
          params: {
            path: {
              postId: postId,
            },
            query: {
              pageNumber: pageParam,
              pageSize: PORTION_COMMENTS,
            },
          },
        });
        return response.data;
      } catch (error) {
        throw new Error('Ошибка загрузки комментариев' + error);
      }
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
