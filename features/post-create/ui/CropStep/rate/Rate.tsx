import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { ExpandOutline } from '@/assets/icons';
import { AspectType } from '@/features/post-create/model/CreatePostType';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';

import Popover from '../components/Popover';
import { useCropContext } from '../CropContext';

import s from './Rate.module.scss';

export const Rate = () => {
  const activeImageIndex = useCreatePostStore((s) => s.activeImageIndex);
  const images = useCreatePostStore((s) => s.images);

  const activeId = images[activeImageIndex]?.id;

  const { getState, setCropState, commitCropState, subscribe } = useCropContext();
  const [aspect, setAspect] = useState<AspectType>('original');

  useEffect(() => {
    if (!activeId) return;
    setAspect(getState(activeId).aspect);

    const unsubscribe = subscribe(activeId, (state) => {
      setAspect(state.aspect);
    });
    return () => unsubscribe();
  }, [activeId]);

  const handleAspectChange = (newAspect: AspectType) => {
    if (activeId) {
      setAspect(newAspect);
      setCropState(activeId, { aspect: newAspect });
      commitCropState(activeId);
    }
  };

  const aspects: { label: string; value: AspectType }[] = [
    { label: 'Original', value: 'original' },
    { label: '1:1', value: '1:1' },
    { label: '4:5', value: '4:5' },
    { label: '16:9', value: '16:9' },
  ];

  return (
    <Popover>
      <Popover.Button>
        <ExpandOutline />
      </Popover.Button>
      <Popover.Content position='topRight'>
        <div className={s.container}>
          {aspects.map((item) => (
            <div
              key={item.value}
              className={clsx(s.item, aspect === item.value && s.active)}
              onClick={() => handleAspectChange(item.value)}
            >
              <span className={s.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
};
