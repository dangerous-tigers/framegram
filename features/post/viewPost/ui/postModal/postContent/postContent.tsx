'use client';
import { Comment, Actions, Publish, Header, Description, ActionsSkeleton, DescriptionSkeleton } from '../ui';
import { Separator } from '@/shared/ui';

import { useGetPostById, useViewPostStore } from '../../../model';
import { type Post } from '../../../model/types';
import s from './postContent.module.scss';
import { useEffect, useRef } from 'react';
import { useGetPostCommentsInfinity } from '../../../model/useGetPostCommentsInfinity';

type Props = {
  initialPost: Post;
  userId: number;
  isMobile: boolean;
  isAuth: boolean;
  isLoading?: boolean;
};

export function PostContent({ initialPost, isAuth, userId, isMobile, isLoading }: Props) {
  const { data: clientPost } = useGetPostById(initialPost.id);
  const isEdit = useViewPostStore((state) => state.isEdit);

  const post = clientPost ?? initialPost;

  const targetRef = useRef(null);

  const {
    comments,
    isLoading: isLoadingComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostCommentsInfinity({
    postId: post.id,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className={s.container}>
      <div className={s.left}>
        {/* LEFT SIDE */}
        {!isLoading && post.images ? (
          <img
            className={s.image}
            src={post.images[0].url}
            alt='loader'
          />
        ) : (
          <div className={s.slider}>Slider</div>
        )}
      </div>
      {/* RIGHT SIDE */}
      <div className={s.right}>
        {isEdit ? (
          <div>Edit</div>
        ) : (
          <>
            {!isMobile && (
              <>
                <Header
                  avatar={post.avatarOwner}
                  userName={post.userName}
                  postOwnerId={post.ownerId}
                  userId={userId}
                  isAuth={isAuth}
                />
              </>
            )}
            {/* DESCRIPTION & COMMENTS */}
            <Separator orientation='horizontal' />
            <div className={s.comments}>
              <Description
                avatar={post.avatarOwner ?? ''}
                userName={post.userName || ''}
                text={post.description || ''}
                timeStamp={post.createdAt || ''}
              />
              {/*    COMMENTS      */}
              {isLoadingComments
                ? Array.from({ length: 3 }).map((_, i) => <DescriptionSkeleton key={i} />)
                : comments?.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      postId={post.id}
                      isAuth={isAuth}
                    />
                  ))}
              <div ref={targetRef} />
            </div>
            {/*    ACTIONS       */}
            <Separator orientation='horizontal' />
            {isLoading ? (
              <ActionsSkeleton />
            ) : (
              <Actions
                isLiked={post.isLiked ?? false}
                likesCount={post.likesCount}
                avatarWhoLikes={post.avatarWhoLikes}
                isSaved={true}
                time={post?.createdAt || ''}
                isLike={isAuth}
              />
            )}
            {/*    PUBLISH      */}
            {userId && (
              <>
                <Separator orientation='horizontal' />
                {isLoading ? <div>Loading...</div> : <Publish postId={post.id} />}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
