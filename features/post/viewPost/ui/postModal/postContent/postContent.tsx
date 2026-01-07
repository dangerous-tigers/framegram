'use client';
import { Comment, Actions, Publish, Header, Description, ActionsSkeleton, DescriptionSkeleton } from '../ui';
import { Separator } from '@/shared/ui';

import { useGetPostById, useViewPostStore } from '../../../model';
import { type Post } from '../../../model/types';
import s from './postContent.module.scss';
import { useEffect, useRef } from 'react';
import { useGetPostCommentsInfinity } from '../../../model/useGetPostCommentsInfinity';
import { Swiper } from '@/shared/ui/swiper';

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
        {post && post.images && !clientPost && (
          <img
            className={s.image}
            src={post.images[0]?.url ?? ''}
            alt='loader'
          />
        )}
        {clientPost && clientPost.images && (
          <div>
            <Swiper
              slides={clientPost.images.map((image) => (
                <img
                  className={s.image}
                  key={image.uploadId}
                  src={image.url}
                  alt='loader'
                />
              ))}
            />
          </div>
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
                isAuth={isAuth}
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
