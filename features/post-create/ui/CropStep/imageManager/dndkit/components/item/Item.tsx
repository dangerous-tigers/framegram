'use client';

import { memo, Ref, useEffect } from 'react';
import clsx from 'clsx';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

import { Handle, Remove } from './components';

//import img from '@/assets/images/image-test.png';

import s from './Item.module.scss';
import Image from 'next/image';

export type Props = {
  dragOverlay?: boolean;
  color?: string;
  dragging?: boolean;
  handleProps?: { ref: Ref<HTMLButtonElement> };
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  isLastItem?: boolean;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: string;
  onRemove(): void;
  ref?: React.Ref<HTMLLIElement>;
};

export const Item = memo(
  ({
    color,
    dragOverlay,
    dragging,
    fadeIn,
    handleProps,
    index,
    listeners,
    onRemove,
    sorting,
    transition,
    transform,
    isLastItem,
    value,
    wrapperStyle,
    ref,
    ...props
  }: Props) => {
    useEffect(() => {
      if (!dragOverlay) {
        return;
      }

      document.body.style.cursor = 'grabbing';

      return () => {
        document.body.style.cursor = '';
      };
    }, [dragOverlay]);

    return (
      <li
        className={clsx(s.wrapper, fadeIn && s.fadeIn, sorting && s.sorting, dragOverlay && s.dragOverlay)}
        style={
          {
            ...wrapperStyle,
            transition: [transition, wrapperStyle?.transition].filter(Boolean).join(', '),
            '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
            '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
            '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
            '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
            '--index': index,
            '--color': color,
          } as React.CSSProperties
        }
        ref={ref}
      >
        <div
          className={clsx(
            s.item,
            s.withHandle,
            dragging && s.dragging,
            dragOverlay && s.dragOverlay,
            /* disabled && styles.disabled, */
            color && s.color,
          )}
          {...props}
        >
          <Image
            src={value}
            alt=''
            width={80}
            height={82}
          />
          {!isLastItem && (
            <span className={s.actions}>
              <Handle
                {...handleProps}
                {...listeners}
              />
              <Remove onClick={onRemove} />
            </span>
          )}
        </div>
      </li>
    );
  },
);

Item.displayName = 'Item';
