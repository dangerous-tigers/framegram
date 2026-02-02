'use client';
import clsx from 'clsx';

import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { IMAGE_FILTERS } from '@/shared/config/filters';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { Swiper } from '@/shared/ui/swiper';

import s from './filters.module.scss';

type FilterGridType = {
  className?: string;
};

export const FilterGrid = ({ className }: FilterGridType) => {
  const setImageFilter = useCreatePostStore((s) => s.setImageFilter);
  const activeIndex = useCreatePostStore((s) => s.activeImageIndex);
  const images = useCreatePostStore((s) => s.images);
  const description = useCreatePostStore((s) => s.description);

  const isMobile = useMediaQuery('(max-width: 999px)');

  const filters = IMAGE_FILTERS.map((filter) => (
    <button
      key={filter.id}
      className={s.filterItem}
      onClick={() => setImageFilter(activeIndex, filter.css)}
    >
      <img
        src={images[activeIndex].preview}
        alt={description ? 'photo' : ''}
        style={{ filter: filter.css }}
      />
      <span className={s.label}>{filter.label}</span>
    </button>
  ));

  //  MOBILE → Swiper
  if (isMobile) {
    return (
      <div className={clsx(s.filters, s.swiperMobile, className)}>
        <Swiper
          slides={filters}
          options={{
            spaceBetween: 12,
            freeMode: true,
            breakpoints: {
              1000: {
                slidesPerView: 5.2,
              },
              640: {
                slidesPerView: 4.2,
              },
              320: {
                slidesPerView: 3.2,
              },
            },
          }}
          withNavigation={false}
          withPagination={false}
        />
      </div>
    );
  }

  //  DESKTOP → обычная сетка
  return <div className={clsx(s.filters, className)}>{filters}</div>;
};
