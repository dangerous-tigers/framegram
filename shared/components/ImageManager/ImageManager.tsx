'use client';

import Popover from './Popover';

import { Sortable } from './dndkit/Sortable';
import { Image } from '@/assets/icons';

export const ImageManager = () => {
  return (
    <Popover>
      <Popover.Button>
        <Image />
      </Popover.Button>
      <Popover.Content>
        <Sortable />
      </Popover.Content>
    </Popover>
  );
};
