'use client';

import clsx from 'clsx';
import type { Swiper as SwiperInstance } from 'swiper';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/react';

import type { AppSwiperProps } from './types';

import s from './swiper.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Swiper = ({
  slides,
  className,
  options,
  initialIndex = 0,
  onIndexChange,
  rootClassName,
}: AppSwiperProps) => {
  const hasManySlides = slides.length > 1;

  const handleSlideChange = (swiper: SwiperInstance) => {
    onIndexChange?.(swiper.realIndex);
  };

  return (
    <div className={clsx(s.root, className)}>
      <SwiperRoot
        className={rootClassName}
        modules={[Navigation, Pagination, A11y, Keyboard]}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        }}
        navigation={hasManySlides}
        pagination={hasManySlides ? { clickable: true } : false}
        initialSlide={initialIndex}
        onSlideChange={handleSlideChange}
        {...options}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            aria-roledescription='slide'
          >
            {slide}
          </SwiperSlide>
        ))}
      </SwiperRoot>
    </div>
  );
};
