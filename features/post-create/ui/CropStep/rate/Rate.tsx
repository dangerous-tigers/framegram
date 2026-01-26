'use client';

import Popover from '../components/Popover';

import { ExpandOutline } from '@/assets/icons';

export const Rate = () => {
  return (
    <Popover>
      <Popover.Button>
        <ExpandOutline />
      </Popover.Button>
      <Popover.Content></Popover.Content>
    </Popover>
  );
};
