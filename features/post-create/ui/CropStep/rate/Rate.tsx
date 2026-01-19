'use client';

import { ExpandOutline } from '@/assets/icons';
import Popover from '../components/Popover';

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
