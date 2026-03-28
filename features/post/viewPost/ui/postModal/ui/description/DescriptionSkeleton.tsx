import clsx from 'clsx';

import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

import s from './DescriptionSkeleton.module.scss';

export function DescriptionSkeleton() {
  return (
    <div className={clsx(s.container)}>
      <Skeleton className={s.avatar} />

      <div className={s.content}>
        <Skeleton className={s.body} />

        <div className={s.footer}>
          <Skeleton className={s.footerItemLarge} />
          <Skeleton className={s.footerItemSmall} />
        </div>
      </div>
    </div>
  );
}
