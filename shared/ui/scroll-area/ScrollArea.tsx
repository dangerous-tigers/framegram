'use client';

import * as React from 'react';
import clsx from 'clsx';
import type { OverlayScrollbarsComponentProps } from 'overlayscrollbars-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import 'overlayscrollbars/overlayscrollbars.css';
import styles from './ScrollArea.module.scss';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  options?: OverlayScrollbarsComponentProps['options'];
  events?: OverlayScrollbarsComponentProps['events'];
  style?: React.CSSProperties;
  onScroll?: () => void;
}

const ScrollArea = React.forwardRef<React.ElementRef<typeof OverlayScrollbarsComponent>, ScrollAreaProps>(
  ({ children, className, options, events, style, onScroll, ...props }, ref) => (
    <div
      className={clsx(styles.scrollArea, className)}
      style={style}
    >
      <OverlayScrollbarsComponent
        ref={ref}
        element='div'
        options={{
          scrollbars: {
            autoHide: 'move',
            autoHideDelay: 600,
            dragScroll: true,
            clickScroll: true,
            ...options,
          },
          ...options,
        }}
        events={{
          ...events,
          scroll: onScroll,
        }}
        {...props}
      >
        {children}
      </OverlayScrollbarsComponent>
    </div>
  ),
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
