'use client';
import { useTranslations } from 'next-intl';

import s from './Description.module.scss';
import { DescriptionInfo } from './DescriptionInfo';

import { Button } from '@/shared/ui';
import CompTimeAgo from '@/shared/ui/timeAgo/CompTimeAgo';

type Props = {
  avatar: string;
  userName: string;
  text: string;
  timeStamp: string;
  likeCount?: number;
  isLikeCount?: boolean;
  isAnswer?: boolean;
  onAnswerClick?: () => void;
};

export function Description({
  avatar,
  userName,
  text,
  timeStamp,
  likeCount = 0,
  isLikeCount = false,
  isAnswer = false,
  onAnswerClick,
}: Props) {
  const t = useTranslations('viewPost');
  return (
    <div className={s.description}>
      <div className={s.userInfo}>
        <img
          src={avatar}
          alt='avatar'
          width={36}
          height={36}
          className={s.avatar}
        />
        <div className={s.postInfo}>
          <DescriptionInfo
            userName={userName}
            text={text}
          />
          <div className={s.footer}>
            <CompTimeAgo date={new Date(timeStamp)} />
            {isLikeCount && likeCount > 0 && (
              <>
                <span className={s.likeCount}>
                  {t('likes')} {likeCount}
                </span>
              </>
            )}
            {isAnswer && (
              <Button
                variant='text'
                onClick={onAnswerClick}
                className={s.answer}
              >
                {t('reply')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
