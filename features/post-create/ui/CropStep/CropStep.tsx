import Image from 'next/image';

import s from './CropStep.module.css';
import { ImageManager } from './imageManager';
import { Rate } from './rate';
import { Size } from './size';

import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { Swiper } from '@/shared/ui/swiper';

export const CropStep = () => {
  const images = useCreatePostStore((s) => s.images);

  const isMobile = useMediaQuery('(max-width: 999px)');

  const setActiveImageIndex = useCreatePostStore((s) => s.setActiveImageIndex);
  const ifMoreOneSlide = images.length > 1;

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
              slidesPerView: ifMoreOneSlide ? 1.05 : 1,
              spaceBetween: 12,
            },
            1000: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          },
        }}
        onIndexChange={(index) => setActiveImageIndex(index)}
        className={s.swiperMain}
        withPagination={!isMobile}
        withNavigation={!isMobile}
      />
      <div className={s.cropSetting}>
        <div className={s.cropSettingDiv}>
          <Size />
          <Rate />
        </div>
        <ImageManager />
      </div>
    </div>
  );
};
