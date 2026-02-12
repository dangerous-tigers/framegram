'use client';

import { MaximizeOutline } from '@/assets/icons';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { useCropStore } from '@/features/post-create/model/storeCrop';

import Popover from '../components/Popover';

import { Slider } from './components/slider';

export const Size = () => {
  const activeImageIndex = useCreatePostStore((s) => s.activeImageIndex);
  const images = useCreatePostStore((s) => s.images);
  const activeId = images[activeImageIndex]?.id;

  const zoom = useCropStore((s) => (activeId ? s.crops[activeId]?.zoom : 1)) || 1;
  const setZoom = useCropStore((s) => s.setZoom);

  const handleZoomChange = (value: number[]) => {
    if (activeId) {
      setZoom(activeId, value[0]);
    }
  };

  return (
    <Popover>
      <Popover.Button>
        <MaximizeOutline />
      </Popover.Button>
      <Popover.Content position='topRight'>
        <div style={{ width: '124px', height: '36px', display: 'flex', padding: '0 8px' }}>
          <Slider
            max={2}
            min={1}
            step={0.01}
            value={[zoom]}
            onValueChange={handleZoomChange}
          />
        </div>
      </Popover.Content>
    </Popover>
  );
};
