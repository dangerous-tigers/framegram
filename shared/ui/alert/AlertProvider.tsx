import { ReactNode } from 'react';
import clsx from 'clsx';

import * as Toast from '@radix-ui/react-toast';

import s from './AlertProvider.module.css';

type Props = {
  children?: ReactNode;
  isStories?: boolean;
  duration?: number;
  swipeDirection?: 'right' | 'left' | 'up' | 'down';
  swipeThreshold?: number;
};

const hotkey = 'F8';

export const AlertProvider = ({
  children,
  duration = 5000,
  swipeDirection = 'right',
  swipeThreshold = 50,
  isStories = false,
}: Props) => {
  return (
    <Toast.Provider
      swipeDirection={swipeDirection}
      duration={duration}
      swipeThreshold={swipeThreshold}
    >
      {children}
      <Toast.Viewport
        className={clsx(s.viewPort, isStories && s.viewPortStories)}
        hotkey={[hotkey]}
        label={`Notifications (${hotkey})`}
      />
    </Toast.Provider>
  );
};
