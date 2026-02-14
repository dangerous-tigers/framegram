'use client';

import { useShallow } from 'zustand/react/shallow';

import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { Swiper } from '@/shared/ui/swiper';

import { CropSlide } from './components/CropSlide/CropSlide';
import { CropProvider } from './CropContext';
import { ImageManager } from './imageManager';
import { Rate } from './rate';
import { Size } from './size';

import s from './CropStep.module.scss';

export const CropStep = () => {
  const imageIds = useCreatePostStore(useShallow((s) => s.images.map((i) => i.id)));
  const setActiveImageIndex = useCreatePostStore((s) => s.setActiveImageIndex);

  return (
    <CropProvider>
      <div className={s.root}>
        <Swiper
          slides={imageIds.map((id) => {
            return (
              <CropSlide
                key={id}
                id={id}
              />
            );
          })}
          options={{
            allowTouchMove: false,
            loop: true,
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
            },
          }}
          onIndexChange={(index) => setActiveImageIndex(index)}
          className={s.swiperMain}
        />
        <div className={s.cropSetting}>
          <div>
            <div className={s.cropSettingDiv}>
              <Rate />
              <Size />
            </div>
          </div>
          <div>
            <ImageManager />
          </div>
        </div>
      </div>
    </CropProvider>
  );
};
