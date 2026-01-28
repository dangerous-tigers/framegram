'use client';

import Popover from '../components/Popover';

import { MaximizeOutline } from '@/assets/icons';

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
