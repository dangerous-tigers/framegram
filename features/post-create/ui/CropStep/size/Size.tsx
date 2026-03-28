'use client';

import { useEffect, useState } from 'react';

import { MaximizeOutline } from '@/assets/icons';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';

import Popover from '../components/Popover';
import { useCropContext } from '../CropContext';

import { Slider } from './components/slider';

export const Size = () => {
  const activeImageIndex = useCreatePostStore((s) => s.activeImageIndex);
  const images = useCreatePostStore((s) => s.images);
  const activeId = images[activeImageIndex]?.id;

  const { getState, setCropState, commitCropState } = useCropContext();
  const [val, setVal] = useState(1);

  useEffect(() => {
    if (!activeId) return;
    setVal(getState(activeId).zoom || 1);
  }, [activeId]);

  const handleZoomChange = (value: number[]) => {
    const newZoom = value[0] as number;
    setVal(newZoom);
    if (activeId) {
      setCropState(activeId, { zoom: newZoom });
    }
  };

  const handleCommit = () => {
    if (activeId) {
      commitCropState(activeId);
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
            max={5}
            min={1}
            step={0.01}
            value={[val]}
            onValueChange={handleZoomChange}
            onValueCommit={handleCommit}
          />
        </div>
      </Popover.Content>
    </Popover>
  );
};
