import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  duration?: number;
  swipeDirection?: 'right' | 'left' | 'up' | 'down';
  swipeThreshold?: number;
};

const hotkey = 'F8';

export const AlertProvider = ({ children, duration = 5000, swipeDirection = 'right', swipeThreshold = 50 }: Props) => {
  return (
    <Toast.Provider
      swipeDirection={swipeDirection}
      duration={duration}
      swipeThreshold={swipeThreshold}
    >
      {children}
      <Toast.Viewport
        hotkey={[hotkey]}
        label={`Notifications (${hotkey})`}
      />
    </Toast.Provider>
  );
};
