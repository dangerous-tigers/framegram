import { forwardRef, type HTMLAttributes } from 'react';

import { Scroll } from './Scroll';

export const VirtuosoScroll = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, ...props }, ref) => (
    <Scroll
      ref={ref}
      {...props}
    >
      {children}
    </Scroll>
  ),
);

VirtuosoScroll.displayName = 'VirtuosoScroll';
