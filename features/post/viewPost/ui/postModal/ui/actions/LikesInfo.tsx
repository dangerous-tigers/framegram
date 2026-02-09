'use client';
import { useTranslations } from 'next-intl';

import s from './LikesInfo.module.scss';

export function LikesInfo({ likesCount }: { likesCount: number }) {
  const t = useTranslations('viewPost');
  return (
    <p className={s.likesCount}>
      {t.rich('likesCount', {
        count: likesCount,
        b: (chunks) => <span className={s.count}>{chunks}</span>,
      })}
    </p>
  );
}
