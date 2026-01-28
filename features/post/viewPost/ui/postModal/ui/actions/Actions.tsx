'use client';
import clsx from 'clsx';

import s from './Actions.module.scss';
import { LikesInfo } from './LikesInfo';

import { HeartOutline, PaperPlaneOutline, BookmarkOutline, Heart, Bookmark } from '@/assets/icons';
import { Button } from '@/shared/ui';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';

export function Actions({
  isLiked,
  isSaved,
  time,
  likesCount,
  avatarWhoLikes,
  isAuth,
}: {
  isLiked: boolean;
  isSaved: boolean;
  time: string;
  likesCount: number;
  avatarWhoLikes: string[];
  isAuth: boolean;
}) {
  return (
    <div className={s.container}>
      {isAuth && (
        <div className={s.top}>
          <div className={s.left}>
            <Button
              variant='text'
              onClick={() => alert('like')}
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
          {avatarWhoLikes.slice(0, 3).map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt='avatar'
              className={s.avatar}
            />
          ))}

          <LikesInfo
            likesCount={likesCount}
            isAuth={isAuth}
            handleLikesClick={() => alert('show likes')}
          />
        </div>
        <CompTimeAgo date={new Date(time)} />
      </div>
    </div>
  );
}
