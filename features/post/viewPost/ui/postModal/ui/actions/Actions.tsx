'use client';
import { HeartOutline, PaperPlaneOutline, BookmarkOutline, Heart, Bookmark } from '@/assets/icons';
import s from './Actions.module.scss';
import clsx from 'clsx';
import { Button } from '@/shared/ui';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';
import { formatLikes } from '@/shared/lib';
import { useTranslations } from 'next-intl';

export function Actions({
  isLiked,
  isSaved,
  time,
  likesCount,
  avatarWhoLikes,
  isLike,
}: {
  isLiked: boolean;
  isSaved: boolean;
  time: string;
  likesCount: number;
  avatarWhoLikes: string[];
  isLike: boolean;
}) {
  const t = useTranslations('view-post');
  return (
    <div className={s.container}>
      {isLike && (
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
              {isSaved ? <Bookmark /> : <BookmarkOutline />}
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
          {likesCount > 0 ? (
            <p className={s.likesCount}>
              {formatLikes(likesCount)} <span>{t('likes')}</span>
            </p>
          ) : (
            <div className={s.beTheFirst}>
              {'Be the first '}
              <Button
                variant='text'
                className={s.beTheFirstButton}
                onClick={() => alert('like')}
              >
                {t('likes')}
              </Button>
              !
            </div>
          )}
        </div>
        <CompTimeAgo date={new Date(time)} />
      </div>
    </div>
  );
}
