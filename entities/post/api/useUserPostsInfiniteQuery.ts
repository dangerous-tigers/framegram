import { PostsByUserId } from '@/entities/profile';
import { client } from '@/shared/api/client';
import { PORTION_POSTS } from '@/shared/constants/constants';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export function useUserPostsInfiniteQuery({
  userId,
  firstBatchOfPosts,
}: {
  userId: string;
  firstBatchOfPosts: PostsByUserId;
}) {
  const initialData: InfiniteData<PostsByUserId, number> = {
    pages: [
      {
        totalCount: firstBatchOfPosts.totalCount, // ⚠ если знаешь реальный totalCount — подставь его
        pageSize: PORTION_POSTS,
        totalUsers: firstBatchOfPosts.totalUsers,
        items: firstBatchOfPosts.items,
      },
    ],
    pageParams: [1],
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery<
    PostsByUserId,
    Error,
    InfiniteData<PostsByUserId>,
    string[],
    number
  >({
    queryKey: ['user-posts', userId],
    initialData,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      // Используем маршрут /posts/{param} с username и pageNumber
      const response = await client.GET('/posts/{param}', {
        params: {
          path: {
            param: userId, // Используем userId как строку (это username)
          },
          query: {
            pageSize: PORTION_POSTS,
            pageNumber: pageParam,
          },
        },
      });

      if (!response.data) {
        throw new Error('Posts not found');
      }

      return response.data as PostsByUserId;
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const pageSize = PORTION_POSTS || lastPage?.pageSize;
      const totalCount = lastPage?.totalCount || 0;
      const currentPageItemsCount = lastPage?.items?.length || 0;

      if (currentPageItemsCount < pageSize) {
        return undefined;
      }

      const totalLoaded = allPages.reduce((sum, page) => sum + (page?.items?.length || 0), 0);
      if (totalCount > 0 && totalLoaded >= totalCount) {
        return undefined;
      }

      return currentPage + 1;
    },
  });

  const posts = data?.pages.flatMap((page) => page?.items || []) || [];

  const loadedCount = posts.length;
  const lastPage = data?.pages[data?.pages.length - 1];
  const totalCount = lastPage?.totalCount || 0;
  const isOver = totalCount > 0 && loadedCount >= totalCount;

  return {
    posts,
    isLoading,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isOver,
  };
}
