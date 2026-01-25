import { useState, useCallback, useEffect, useRef } from 'react';

import { getPostsByUser } from './userPosts.api';

import { PostViewModel } from '@/entities/profile';

interface UseUserPostsQueryParams {
  userId: string;
  initialPageSize?: number;
}

export const useUserPostsQuery = ({ userId, initialPageSize = 12 }: UseUserPostsQueryParams) => {
  const [posts, setPosts] = useState<PostViewModel[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [endCursor, setEndCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const isFetchingRef = useRef(false);

  useEffect(() => {
    setCurrentUserId(userId);
    setPosts([]);
    setHasNext(true);
    setEndCursor(null);
    setError(null);
    setIsLoading(false);
    setIsLoadingMore(false);
  }, [userId]);

  const fetchWithRetry = useCallback(async (operation: () => Promise<unknown>, attempt = 1, maxAttempts = 3) => {
    try {
      return await operation();
    } catch (error) {
      if (attempt < maxAttempts) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(operation, attempt + 1, maxAttempts);
      }
      throw error;
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    if (currentUserId !== userId) {
      return;
    }

    if (isFetchingRef.current) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWithRetry(() =>
        getPostsByUser({
          userId: parseInt(userId, 10),
          pageSize: 12,
        }),
      );

      if (currentUserId !== userId) {
        return;
      }

      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid API response format: items is not an array');
      }

      const uniqueItems = data.items.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));

      if (uniqueItems.length !== data.items.length) {
        // Optional: log warning about duplicates if needed for debugging
      }

      setPosts(uniqueItems);

      const hasNextPage = data.totalCount !== undefined && data.totalCount > uniqueItems.length;
      setHasNext(hasNextPage);

      if (data.endCursorPostId !== undefined && data.endCursorPostId !== null) {
        setEndCursor(Number(data.endCursorPostId));
      } else if (data.items && data.items.length > 0) {
        const lastPost = data.items[data.items.length - 1];
        setEndCursor(Number(lastPost.id));
      } else {
        setEndCursor(null);
      }
    } catch (err) {
      setError(err);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [userId, initialPageSize, currentUserId, fetchWithRetry]);

  const fetchMoreData = useCallback(async () => {
    if (currentUserId !== userId) {
      return;
    }

    if (!hasNext || isLoadingMore || isFetchingRef.current) {
      return;
    }

    if (!endCursor) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoadingMore(true);
    setError(null);

    try {
      const data = await fetchWithRetry(() =>
        getPostsByUser({
          userId: parseInt(userId, 10),
          pageSize: 12,
          endCursorPostId: endCursor,
        }),
      );

      if (currentUserId !== userId) {
        return;
      }

      setPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post.id));
        const uniqueNewPosts = (data.items || []).filter((post) => !existingIds.has(post.id));
        return [...prev, ...uniqueNewPosts];
      });

      const totalLoaded = [...posts, ...(data.items || [])].length;
      const hasNextPage = data.totalCount !== undefined && data.totalCount > totalLoaded;
      setHasNext(hasNextPage);

      if (data.endCursorPostId !== undefined && data.endCursorPostId !== null) {
        setEndCursor(Number(data.endCursorPostId));
      } else if (data.items && data.items.length > 0) {
        const lastPost = data.items[data.items.length - 1];
        setEndCursor(Number(lastPost.id));
      } else {
        setEndCursor(null);
      }
    } catch (err) {
      setError(err);
    } finally {
      isFetchingRef.current = false;
      setIsLoadingMore(false);
    }
  }, [hasNext, isLoadingMore, userId, initialPageSize, endCursor, currentUserId, fetchWithRetry]);

  const refetch = useCallback(() => {
    setPosts([]);
    setHasNext(true);
    setEndCursor(null);
    setError(null);
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
