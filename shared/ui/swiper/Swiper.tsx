'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper as SwiperRoot, SwiperSlide } from 'swiper/react';

import s from './swiper.module.scss';
import type { AppSwiperProps } from './types';

import { ArrowIosBackOutline, ArrowIosForwardOutline } from '@/assets/icons';

export const Swiper = ({
  slides,
  className,
  options,
  withNavigation = true,
  withPagination = true,
  initialIndex = 0,
  onIndexChange,
  rootClassName,
}: AppSwiperProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const hasManySlides = slides.length > 1;

  const handleSlideChange = (swiper: SwiperInstance) => {
    onIndexChange?.(swiper.realIndex);
  };

  return (
    <div className={clsx(s.root, className)}>
      {withNavigation && (
        <>
          <button
            ref={prevRef}
            type='button'
            className={clsx('swiper-button-prev', s.prev)}
            aria-label='Previous slide'
          >
            <ArrowIosBackOutline />
          </button>

          <button
            ref={nextRef}
            type='button'
            className={clsx('swiper-button-next', s.next)}
            aria-label='Next slide'
          >
            <ArrowIosForwardOutline />
          </button>
        </>
      )}

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
        navigation={
          withNavigation
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }
            : false
        }
        pagination={withPagination && hasManySlides ? { clickable: true } : false}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation!.prevEl = prevRef.current;
            swiper.params.navigation!.nextEl = nextRef.current;
          }
        }}
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
