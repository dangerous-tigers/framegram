'use client';
import clsx from 'clsx';

import { Bookmark, BookmarkOutline, Heart, HeartOutline, PaperPlaneOutline } from '@/assets/icons';
import { usePostLikesMutation } from '@/features/post/viewPost/model/usePostLikeMutation';
import { useTimeAgo } from '@/shared/lib/hooks/useTimeAgo';
import { Button } from '@/shared/ui';

import { LikesInfo } from './LikesInfo';

import s from './Actions.module.scss';

export function Actions({
  isLiked,
  isSaved,
  time,
  likesCount,
  avatarWhoLikes,
  isAuth,
  postId,
}: {
  isLiked: boolean;
  isSaved: boolean;
  time: string;
  likesCount: number;
  avatarWhoLikes: string[];
  isAuth: boolean;
  postId: number;
}) {
  const timeago = useTimeAgo(time);

  const likeStatus = isLiked ? 'DISLIKE' : ('LIKE' as const);
  const mutation = usePostLikesMutation();

  const handleLike = () => {
    mutation.mutate({ id: postId, likeStatus });
  };

  return (
    <div className={s.container}>
      {isAuth && (
        <div className={s.top}>
          <div className={s.left}>
            <Button
              variant='text'
              onClick={handleLike}
              disabled={mutation.isPending}
              className={clsx(s.likeButton, isLiked && s.liked)}
            >
              {isLiked ? <Heart className={s.heartIsLiked} /> : <HeartOutline />}
            </Button>
            <Button
              variant='text'
              onClick={() => alert('plane')}
              className={clsx(s.planeButton)}
            >
              <PaperPlaneOutline />
            </Button>
          </div>
          <div className={s.right}>
            <Button
              variant='text'
              onClick={() => alert('saved')}
              className={clsx(s.saveButton, isSaved && s.saved)}
            >
              {isSaved ? <BookmarkOutline /> : <Bookmark />}
            </Button>
          </div>
        </div>
      )}
      <div className={s.bottom}>
        <div className={s.avatarWhoLikes}>
          {avatarWhoLikes
            .slice(0, 3)
            .reverse()
            .map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt='avatar'
                className={s.avatar}
              />
            ))}

          <LikesInfo likesCount={likesCount} />
        </div>
        {timeago}
      </div>
    </div>
  );
}
