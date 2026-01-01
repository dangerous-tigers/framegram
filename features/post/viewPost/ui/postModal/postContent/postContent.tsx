'use client';
import { Comment, Actions, Publish, Header, Description, ActionsSkeleton, DescriptionSkeleton } from '../ui';
import { Separator } from '@/shared/ui';

import { useGetPostById, useGetPostComments } from '../../../model';
import { type Post } from '../../../model/types';
import s from './postContent.module.scss';

type Props = {
  post: Post;
  userId: number;
  isMobile: boolean;
  isEdit?: boolean;
  isAuth: boolean;
  isLoading?: boolean;
};

export function PostContent({ post, isAuth, userId, isMobile, isLoading }: Props) {
  const { data: clientPost } = useGetPostById(post.id);
  const { data: comments, isLoading: isLoadingComments } = useGetPostComments({ postId: post.id });

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
        {!isMobile && (
          <>
            <Header
              avatar={post?.avatarOwner}
              userName={post?.userName}
              postOwnerId={post?.ownerId}
              userId={userId}
              isAuth={isAuth}
            />
          </>
        )}
        {/* DESCRIPTION & COMMENTS */}
        <Separator orientation='horizontal' />
        <div className={s.comments}>
          <Description
            avatar={post?.avatarOwner ?? ''}
            userName={post?.userName || ''}
            text={post?.description || ''}
            timeStamp={post?.createdAt || ''}
          />
          {/*    COMMENTS      */}
          {isLoadingComments
            ? Array.from({ length: 3 }).map((_, i) => <DescriptionSkeleton key={i} />)
            : comments?.items?.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  postId={post.id}
                  isAuth={isAuth}
                />
              ))}
        </div>
        {/*    ACTIONS       */}
        <Separator orientation='horizontal' />
        {isLoading ? (
          <ActionsSkeleton />
        ) : (
          <Actions
            isLiked={clientPost?.isLiked ?? false}
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
      </div>
    </div>
  );
}
