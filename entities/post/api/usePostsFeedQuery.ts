import { useState, useCallback } from 'react';

import { getPostsFeed } from './postsFeed.api';

import { PostViewModel } from '@/shared/api/schema.d.ts';

export const usePostsFeedQuery = (initialPageSize: number = 10) => {
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [endCursor, setEndCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getPostsFeed({
        pageSize: initialPageSize,
      });

      setPosts(data.items || []);
      setHasNext(data.hasNext);
      setEndCursor(data.endCursorPostId ? Number(data.endCursorPostId) : null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [initialPageSize]);

  const fetchMoreData = useCallback(async () => {
    if (!hasNext || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const data = await getPostsFeed({
        pageSize: initialPageSize,
        endCursorPostId: endCursor ? endCursor : undefined,
      });

      setPosts((prev) => [...prev, ...(data.items || [])]);
      setHasNext(data.hasNext);
      setEndCursor(data.endCursorPostId ? Number(data.endCursorPostId) : null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasNext, isLoadingMore, initialPageSize, endCursor]);

  const refetch = useCallback(() => {
    setPosts([]);
    setHasNext(true);
    setEndCursor(null);
    fetchInitialData();
  }, [fetchInitialData]);

  return {
    posts,
    hasNext,
    endCursor,
    isLoading,
    isLoadingMore,
    error,
    fetchInitialData,
    fetchMoreData,
    refetch,
  };
};
