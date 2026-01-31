import Image from 'next/image';

import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { Swiper } from '@/shared/ui/swiper';

import { ImageManager } from './imageManager';
import { Rate } from './rate';
import { Size } from './size';

import s from './CropStep.module.scss';

export const CropStep = () => {
  const images = useCreatePostStore((s) => s.images);

  const setActiveImageIndex = useCreatePostStore((s) => s.setActiveImageIndex);

  return (
    <div className={s.root}>
      <Swiper
        slides={images.map((image) => (
          <Image
            key={image.file.name}
            src={image.preview}
            alt={image.file.name}
            fill
            style={{ filter: image.filter ?? 'none' }}
          />
        ))}
        options={{
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
            <Size />
            <Rate />
          </div>
        </div>
        <div>
          <ImageManager />
        </div>
      </div>
    </div>
  );
};
