'use client';
import { useTranslations } from 'next-intl';

import s from './LikesInfo.module.scss';

import { formatLikes } from '@/shared/lib';
import { Button } from '@/shared/ui';

export function LikesInfo({
  likesCount,
  isAuth,
  handleLikesClick,
}: {
  likesCount: number;
  isAuth: boolean;
  handleLikesClick?: () => void;
}) {
  const t = useTranslations('viewPost');
  if (likesCount > 0) {
    return (
      <p className={s.likesCount}>
        {formatLikes(likesCount)} <span>{t('likes')}</span>
      </p>
    );
  }

  if (likesCount === 0 && isAuth) {
    return (
      <div className={s.beTheFirst}>
        {t('beTheFirstLikes')}
        <Button
          variant='text'
          onClick={handleLikesClick}
          className={s.beTheFirstButton}
        >
          {t('like')}
        </Button>
      </div>
    );
  }

  if (likesCount === 0 && !isAuth) {
    return <div className={s.beTheFirst}>{t('noLikesYet')}</div>;
  }

  return null;
}
