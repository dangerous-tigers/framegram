import clsx from 'clsx';

import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

import s from './ActionsSkeleton.module.scss';

export function ActionsSkeleton() {
  return (
    <div className={clsx(s.container)}>
      <div className={s.top}>
        <div className={s.topLeft}>
          <Skeleton className={s.actions} />
          <Skeleton className={s.actions} />
        </div>
        <Skeleton className={s.actions} />
      </div>
      <div className={s.bottom}>
        <Skeleton className={s.bottomBlock} />
        <Skeleton className={s.bottomTime} />
      </div>
    </div>
  );
}
