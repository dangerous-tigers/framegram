import clsx from 'clsx';

import s from './SubscriptionsCard.module.scss';

export function SubscriptionsCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(s.container, className)}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.content}>{children}</div>
    </div>
  );
}
