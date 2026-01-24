import { ReactNode } from 'react';
import type { SwiperOptions } from 'swiper/types';

export type AppSwiperProps = {
  slides: ReactNode[];
  className?: string;

  options?: SwiperOptions;

  withNavigation?: boolean;
  withPagination?: boolean;

  /** индекс слайда, который нужно открыть */
  initialIndex?: number;

  /** коллбек при смене активного слайда */
  onIndexChange?: (index: number) => void;
  rootClassName?: string;
};
