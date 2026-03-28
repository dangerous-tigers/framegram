'use client';

import * as React from 'react';
import clsx from 'clsx';
import { Slider as SliderPrimitive } from 'radix-ui';

import s from './slider.module.scss';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={clsx(s.root, className)}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={s.track}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={s.range}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className={s.thumb}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
