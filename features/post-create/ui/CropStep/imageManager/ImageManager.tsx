'use client';

import { Image } from '@/assets/icons';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';

import Popover from '../components/Popover';

import { Sortable } from './dndkit/Sortable';

export const ImageManager = () => {
  const images = useCreatePostStore((s) => s.images);
  const setImages = useCreatePostStore((s) => s.setImages);

  return (
    <Popover>
      <Popover.Button>
        <Image />
      </Popover.Button>
      <Popover.Content>
        <Sortable
          images={images}
          setImages={setImages}
        />
      </Popover.Content>
    </Popover>
  );
};
