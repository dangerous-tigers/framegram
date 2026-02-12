import { clsx } from 'clsx';
import { useShallow } from 'zustand/react/shallow';

import { ExpandOutline } from '@/assets/icons'; // Using ExpandOutline as placeholder if Image icon is not correct for "selected" state, logic below confirms request.
// Wait, I should probably check if I have a checkmark icon or similar.
import { AspectType } from '@/features/post-create/model/CreatePostType';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { useCropStore } from '@/features/post-create/model/storeCrop';

import Popover from '../components/Popover';

import s from './Rate.module.scss';

export const Rate = () => {
  const activeImageIndex = useCreatePostStore((s) => s.activeImageIndex);
  const images = useCreatePostStore((s) => s.images);
  const setAspect = useCropStore((s) => s.setAspect);

  const activeId = images[activeImageIndex]?.id;

  const currentAspect = useCropStore(useShallow((s) => (activeId ? s.crops[activeId]?.aspect : 'original')));

  const handleAspectChange = (aspect: AspectType) => {
    if (activeId) {
      setAspect(activeId, aspect);
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
              className={clsx(s.item, currentAspect === item.value && s.active)}
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
