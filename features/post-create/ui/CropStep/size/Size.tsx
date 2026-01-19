'use client';

import { MaximizeOutline } from '@/assets/icons';
import Popover from '../components/Popover';

export const Size = () => {
  return (
    <Popover>
      <Popover.Button>
        <MaximizeOutline />
      </Popover.Button>
      <Popover.Content></Popover.Content>
    </Popover>
  );
};
