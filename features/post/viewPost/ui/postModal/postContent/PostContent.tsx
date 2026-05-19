'use client';

import { useTranslations } from 'next-intl';
import { Virtuoso } from 'react-virtuoso';

import { EditMode } from '@/features/post/editPost/ui/editMode/EditMode';
import { useGetPostById, useGetPostCommentsInfinity, useViewPostStore } from '@/features/post/viewPost/model';
import { Post } from '@/features/post/viewPost/model/types';
import { Separator } from '@/shared/ui';
import { VirtuosoScroll } from '@/shared/ui/scroll';
import { Swiper } from '@/shared/ui/swiper';

import { usePostLikes } from '../../../model/useGetPostLikes';
import { Actions, ActionsSkeleton, Comment, Description, DescriptionSkeleton, Header, Publish } from '../ui';

import s from './PostContent.module.scss';

type Props = {
  initialPost: Post;
  userId: number;
  isMobile: boolean;
  isAuth: boolean;
  isLoading?: boolean;
};

export function PostContent({ initialPost, isAuth, userId, isMobile, isLoading }: Props) {
  const { data: clientPost } = useGetPostById(initialPost.id);
  const { data: postLikes } = usePostLikes({ id: initialPost.id });
  const isEdit = useViewPostStore((state) => state.isEdit);
  const t = useTranslations('viewPost');

  const post = clientPost ?? initialPost;
  const {
    comments,
    isLoading: isLoadingComments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostCommentsInfinity({
    postId: post.id,
  });
  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

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
          <Swiper
            rootClassName={s.slider}
            withNavigation={clientPost.images.length > 1}
            withPagination={clientPost.images.length > 1}
            slides={clientPost.images.map((image) => (
              <div
                key={image.uploadId}
                className={s.imageWrapper}
              >
                <img
                  className={s.image}
                  src={image.url}
                  alt='loader'
                />
                <img
                  className={s.imagOverlay}
                  src={image.url}
                  alt='loader'
                />
              </div>
            ))}
          />
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
            {!post.description && !comments.length ? (
              <div className={s.noComments}>
                <h3>{t('noCommentsYet')}</h3>
                <p>{t('beTheFirstToComment')}</p>
              </div>
            ) : (
              <div className={s.comments}>
                <Description
                  avatar={post.avatarOwner}
                  userName={post.userName || ''}
                  text={post.description || ''}
                  timeStamp={post.createdAt || ''}
                />
                {/* COMMENTS      */}
                {isLoadingComments ? (
                  Array.from({ length: 3 }).map((_, i) => <DescriptionSkeleton key={i} />)
                ) : (
                  <Virtuoso
                    style={{ height: '100%' }}
                    endReached={handleEndReached}
                    data={comments}
                    components={{ Scroller: VirtuosoScroll }}
                    computeItemKey={(_, comment) => comment.id}
                    itemContent={(_, comment) => (
                      <Comment
                        comment={comment}
                        postId={post.id}
                        isAuth={isAuth}
                      />
                    )}
                  />
                )}
              </div>
            )}

            {/*    ACTIONS       */}
            <Separator orientation='horizontal' />
            {isLoading ? (
              <ActionsSkeleton />
            ) : (
              <Actions
                isLiked={postLikes?.isLiked ?? false}
                likesCount={postLikes?.totalCount || 0}
                avatarWhoLikes={postLikes?.items?.map((item) => item.avatars[0].url) || []}
                isSaved
                time={post?.createdAt || ''}
                isAuth={isAuth}
                postId={post.id}
              />
            )}
            {/*    PUBLISH      */}
            {isAuth && (
              <>
                <Separator orientation='horizontal' />
                <Publish postId={post.id} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
