import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import s from './Scroll.module.scss';

type ScrollProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(({ children, className, ...props }, ref) => (
  <ScrollArea.Root className={s.root}>
    <ScrollArea.Viewport
      ref={ref}
      className={className ? `${s.viewport} ${className}` : s.viewport}
      {...props}
    >
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className={s.scrollbar}
      orientation='vertical'
    >
      <ScrollArea.Thumb className={s.thumb} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
));

Scroll.displayName = 'Scroll';
