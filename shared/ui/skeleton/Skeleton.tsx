import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import s from './Skeleton.module.scss';

type Props = {
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

function Skeleton({ className, ...props }: Props) {
  return (
    <div
      data-slot='skeleton'
      className={clsx(s.root, className)}
      {...props}
    />
  );
}
export { Skeleton };
