import { ReactNode } from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import s from './Scroll.module.scss';

export const Scroll = ({ children }: { children: ReactNode }) => (
  <ScrollArea.Root className={s.root}>
    <ScrollArea.Viewport className={s.viewport}>{children}</ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className={s.scrollbar}
      orientation='vertical'
    >
      <ScrollArea.Thumb className={s.thumb} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);
