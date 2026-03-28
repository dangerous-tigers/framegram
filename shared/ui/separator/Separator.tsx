import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

import s from './Separator.module.scss';

type SeparatorProps = ComponentPropsWithoutRef<'div'> & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

export function Separator({ orientation = 'horizontal', decorative, className, ...props }: SeparatorProps) {
  return (
    <div
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      data-orientation={orientation}
      className={clsx(s.root, className)}
      {...props}
    />
  );
}
