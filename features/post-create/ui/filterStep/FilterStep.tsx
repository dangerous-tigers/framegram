'use client';
import { FilterGrid } from '@/features/post-create/ui/filterStep/FilterGrid';
import { Swiper } from '@/shared/ui/swiper';
import Image from 'next/image';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import s from './filters.module.scss';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';

export const FilterStep = () => {
  const isMobile = useMediaQuery('(max-width: 999px)');

  const images = useCreatePostStore((s) => s.images);
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
      <FilterGrid className={s.content} />
    </div>
  );
};
