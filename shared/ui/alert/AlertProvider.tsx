import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  duration?: number;
};

const hotkey = 'F8';

export const AlertProvider = ({ children, duration = 5000 }: Props) => {
  return (
    <Toast.Provider
      swipeDirection='right'
      duration={duration}
    >
      {children}
      <Toast.Viewport
        hotkey={[hotkey]}
        label={`Notifications (${hotkey})`}
      />
    </Toast.Provider>
  );
};
