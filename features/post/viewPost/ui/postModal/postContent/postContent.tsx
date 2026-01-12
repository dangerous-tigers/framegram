'use client';

import { EditMode } from '@/features/post/editPost/ui/editMode/EditMode';
import { Separator } from '@/shared/ui';
import { useEffect, useRef } from 'react';
import { Actions, ActionsSkeleton, Comment, Description, DescriptionSkeleton, Header, Publish } from '../ui';

import { useGetPostById, useGetPostCommentsInfinity, useViewPostStore } from '@/features/post/viewPost/model';
import { Post } from '@/features/post/viewPost/model/types';
import { Swiper } from '@/shared/ui/swiper';
import s from './postContent.module.scss';

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
          <EditMode
            profileImage={clientPost?.avatarOwner}
            userName={clientPost?.userName}
            description={clientPost?.description}
            postId={post.id}
          />
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
                  postId={post.id || 0}
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
