'use client';

import { useEffect, useCallback, useRef } from 'react';

import styles from './PostsList.module.scss';

import { usePostsFeedQuery } from '@/entities/post/api/usePostsFeedQuery';
import { formatLikes } from '@/shared/lib/formatLikes';
import { useIntersection } from '@/shared/lib/hooks/useIntersection';
import { Button } from '@/shared/ui/button/Button';
import { Card } from '@/shared/ui/card/Card';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';

interface PostsListProps {
  className?: string;
}

export const PostsList = ({ className }: PostsListProps) => {
  const { posts, hasNext, isLoading, isLoadingMore, error, fetchInitialData, fetchMoreData, refetch } =
    usePostsFeedQuery(10);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Загрузка начальных данных
  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Используем хук для определения пересечения с нижней границей
  const handleIntersection = useCallback(() => {
    if (hasNext && !isLoadingMore) {
      fetchMoreData();
    }
  }, [hasNext, isLoadingMore, fetchMoreData]);

  useIntersection(handleIntersection)(loaderRef.current);

  const handleRetry = () => {
    refetch();
  };

  if (error) {
    return (
      <div className={`${styles.errorContainer} ${className || ''}`}>
        <div className={styles.errorContent}>
          <p>Ошибка при загрузке постов</p>
          <Button onClick={handleRetry}>Попробовать снова</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.postsList} ${className || ''}`}>
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <Card
            key={post.id}
            className={styles.postCard}
          >
            <div className={styles.postContent}>
              {/* Изображение поста */}
              <div className={styles.postImageContainer}>
                {post.images && post.images.length > 0 ? (
                  <img
                    src={post.images[0].url}
                    alt={post.description || 'Post image'}
                    className={styles.postImage}
                  />
                ) : (
                  <div className={styles.placeholderImage}>Нет изображения</div>
                )}
              </div>

              {/* Информация о посте */}
              <div className={styles.postInfo}>
                <div className={styles.userInfo}>
                  <span className={styles.username}>{post.userName || post.owner?.firstName || 'Автор'}</span>
                </div>

                <div className={styles.postDescription}>{post.description}</div>

                <div className={styles.postMeta}>
                  <span className={styles.likesCount}>{formatLikes(post.likesCount || 0)} likes</span>
                  <span className={styles.createdAt}>
                    <CompTimeAgo date={post.createdAt} />
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {isLoading && (
          <div className={styles.loadingSkeletons}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                key={`skeleton-${index}`}
                className={styles.postCard}
              >
                <div className={styles.postContent}>
                  <div className={styles.postImageContainer}>
                    <Skeleton className={styles.imageSkeleton} />
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.userInfo}>
                      <Skeleton
                        width='80px'
                        height='20px'
                      />
                    </div>
                    <div className={styles.postDescription}>
                      <Skeleton
                        width='100%'
                        height='20px'
                      />
                      <Skeleton
                        width='70%'
                        height='20px'
                      />
                    </div>
                    <div className={styles.postMeta}>
                      <Skeleton
                        width='60px'
                        height='16px'
                      />
                      <Skeleton
                        width='40px'
                        height='16px'
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {isLoadingMore && (
          <div className={styles.loadingMore}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={`more-skeleton-${index}`}
                className={styles.postCard}
              >
                <div className={styles.postContent}>
                  <div className={styles.postImageContainer}>
                    <Skeleton className={styles.imageSkeleton} />
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.userInfo}>
                      <Skeleton
                        width='80px'
                        height='20px'
                      />
                    </div>
                    <div className={styles.postDescription}>
                      <Skeleton
                        width='100%'
                        height='20px'
                      />
                      <Skeleton
                        width='70%'
                        height='20px'
                      />
                    </div>
                    <div className={styles.postMeta}>
                      <Skeleton
                        width='60px'
                        height='16px'
                      />
                      <Skeleton
                        width='40px'
                        height='16px'
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Элемент для отслеживания пересечения */}
      <div
        ref={loaderRef}
        className={styles.intersectionObserverTrigger}
      />

      {!hasNext && posts.length > 0 && <div className={styles.endMessage}>Вы достигли конца ленты</div>}
    </div>
  );
};
