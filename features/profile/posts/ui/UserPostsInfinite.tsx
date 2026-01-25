'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import s from './UserPostsInfinite.module.scss';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};

import { useUserPostsQuery } from '@/entities/post/api/useUserPostsQuery';
import { PostViewModel } from '@/entities/profile';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

type Props = {
  userId: string;
};

const useDebouncedInView = (delay = 150) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '100px',
  });

  const [debouncedInView, setDebouncedInView] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedInView(inView);
    }, delay);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inView, delay]);

  return { ref, inView: debouncedInView };
};

const PostItem = React.memo(({ post }: { post: PostViewModel }) => (
  <li
    key={post.id}
    className={s.postItem}
  >
    <Link href={`/post/${post.id}`}>
      <img
        src={post.images?.[0]?.url}
        alt={`post image by id ${post.images?.[0]?.uploadId}`}
        className={s.postImage}
      />
    </Link>
  </li>
));

PostItem.displayName = 'PostItem';

export const UserPostsInfinite = ({ userId }: Props) => {
  const { posts, hasNext, isLoading, isLoadingMore, error, fetchInitialData, fetchMoreData, refetch } =
    useUserPostsQuery({
      userId,
      initialPageSize: 12,
    });

  const { ref, inView } = useDebouncedInView(150);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchInitialData();
  }, [userId, fetchInitialData]);

  useEffect(() => {
    const shouldLoadMore = () => {
      if (!inView || !hasNext || isLoadingMore) return false;

      if (isMobile) return true;

      if (typeof window !== 'undefined') {
        return window.innerHeight >= document.documentElement.scrollHeight;
      }

      return false;
    };

    if (shouldLoadMore()) {
      fetchMoreData();
    }
  }, [inView, hasNext, isLoadingMore, fetchMoreData, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const remainingScroll = documentHeight - (scrollTop + viewportHeight);
      const shouldLoadMore = remainingScroll < viewportHeight;

      if (shouldLoadMore && hasNext && !isLoadingMore) {
        fetchMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNext, isLoadingMore, fetchMoreData]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return (
      <div className={s.errorContainer}>
        <div className={s.errorContent}>
          <p>Произошла ошибка при загрузке постов</p>
          <Button onClick={handleRetry}>Попробовать снова</Button>
        </div>
      </div>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <div className={s.emptyContainer}>
        <p>У пользователя пока нет постов</p>
      </div>
    );
  }

  return (
    <ul className={s.postsGrid}>
      {posts?.map((item: PostViewModel) => (
        <PostItem
          key={item.id}
          post={item}
        />
      ))}

      {isLoading && posts.length === 0 && (
        <div className={s.loadingInitialContainer}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Card
              key={`initial-skeleton-${index}`}
              className={s.postCard}
            >
              <div className={s.postImageContainer}>
                <Skeleton className={s.imageSkeleton} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {isLoadingMore && (
        <div className={s.loadingMoreContainer}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={`more-skeleton-${index}`}
              className={s.postCard}
            >
              <div className={s.postImageContainer}>
                <Skeleton className={s.imageSkeleton} />
              </div>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && !isLoadingMore && !hasNext && posts.length > 0 && (
        <div className={s.endMessage}>Вы достигли конца ленты</div>
      )}

      <div ref={ref} />
    </ul>
  );
};
