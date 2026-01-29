'use client';

import Link from 'next/link';
import React, { useCallback } from 'react';

import s from './UserPostsInfinite.module.scss';

import { useUserPostsInfiniteQuery } from '@/entities/post/api/useUserPostsInfiniteQuery';
import { PostsByUserId, PostViewModel } from '@/entities/profile';
import { useIntersection } from '@/shared/lib/hooks/useIntersection';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

type Props = {
  userId: string;
  firstBatchOfPosts: PostsByUserId;
};

const PostItem = React.memo(({ post }: { post: PostViewModel }) => (
  <li
    key={post.id}
    className={s.postItem}
  >
    <Link
      href={`?postId=${post.id}`}
      scroll={false}
    >
      <img
        src={post.images?.[0]?.url}
        alt={`post image by id ${post.images?.[0]?.uploadId}`}
        className={s.postImage}
      />
    </Link>
  </li>
));

PostItem.displayName = 'PostItem';

export const UserPostsInfinite = ({ userId, firstBatchOfPosts }: Props) => {
  const { posts, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, isOver, isFetching } =
    useUserPostsInfiniteQuery({ userId, firstBatchOfPosts });

  // Создаем ref для хранения актуальных значений
  const intersectionDataRef = React.useRef({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Обновляем ref при каждом рендере
  intersectionDataRef.current = {
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };

  const cursorRef = useIntersection(() => {
    const {
      hasNextPage: currentHasNextPage,
      isFetchingNextPage: currentIsFetchingNextPage,
      fetchNextPage: currentFetchNextPage,
    } = intersectionDataRef.current;

    if (currentHasNextPage && !currentIsFetchingNextPage) {
      currentFetchNextPage();
    }
  });

  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

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

  if (!isLoading && !isFetching && posts.length === 0) {
    return (
      <div className={s.emptyContainer}>
        <p>У пользователя пока нет постов</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={s.loadingInitialContainer}>
        {Array.from({ length: 8 }).map((_, index) => (
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
      {isOver && <div className={s.endMessage}>Вы достигли конца ленты</div>}
      {isFetchingNextPage &&
        Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={`more-skeleton-${index}`}
            className={s.postCard}
          >
            <div className={s.postImageContainer}>
              <Skeleton className={s.imageSkeleton} />
            </div>
          </Card>
        ))}
      <div ref={cursorRef} />
    </ul>
  );
};
