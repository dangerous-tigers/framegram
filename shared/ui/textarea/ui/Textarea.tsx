'use client';

import { ComponentPropsWithRef, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { ClickScrollPlugin, OverlayScrollbars } from 'overlayscrollbars';
import { useOverlayScrollbars } from 'overlayscrollbars-react';

import { osFieldPlugin } from '@/shared/ui/textarea/model/fieldPlugin';

import { useResizable, UseResizableOptions } from '../model/useResizable';

import s from './Textarea.module.scss';

OverlayScrollbars.plugin([ClickScrollPlugin, osFieldPlugin]);

const cursorMap = {
  both: 'nwse-resize',
  horizontal: 'ew-resize',
  vertical: 'ns-resize',
} as const;

type Props = {
  label?: string;
  error?: string;
  classNameTarget?: string;
} & ComponentPropsWithRef<'textarea'> &
  UseResizableOptions;

/**
 *
 * - `label?` — метка над полем
 * - `error?` — сообщение об ошибке
 * - `classNameTarget?` — дополнительный CSS-класс для корня OverlayScrollbars
 * - `direction?` — направление изменения размера (например, `'vertical'`, `'horizontal'`, `'both', `'none'`)
 *
 * Наследует пропсы `<textarea>`.
 */

export const Textarea = (p: Props) => {
  const { label, error, direction = 'vertical', classNameTarget, ...rest } = p;

  const { targetRef, handleRef } = useResizable({
    direction,
  });

  const viewportRef = useRef<HTMLDivElement>(null);

  const [initOverlayScrollbars, getOverlayScrollbars] = useOverlayScrollbars({
    defer: true,
    options: {
      scrollbars: {
        theme: 'os-theme-custom',
        clickScroll: true,
      },
    },
  });

  useEffect(() => {
    const target = targetRef.current;
    const viewport = viewportRef.current;

    if (!target || !viewport) return;

    initOverlayScrollbars({
      target,
      elements: {
        viewport,
      },
    });

    return () => {
      const instance = getOverlayScrollbars();
      if (instance) {
        instance.destroy();
      }
    };
  }, [initOverlayScrollbars, targetRef, viewportRef]);

  const hasError = !!error;

  return (
    <label className={s.root}>
      {label && <span className={s.label}>{label}</span>}
      <div
        ref={targetRef}
        className={clsx(s.overlayscrollbarsReact, classNameTarget, { [s.errorText]: hasError })}
        data-overlayscrollbars-initialize=''
      >
        {direction !== 'none' && (
          <div
            className={s.resizeButton}
            ref={handleRef}
            style={{
              cursor: cursorMap[direction],
            }}
            aria-hidden='true'
          />
        )}
        <div
          ref={viewportRef}
          data-overlayscrollbars-contents=''
        >
          <textarea
            data-overlayscrollbars-field
            className={s.field}
            aria-invalid={hasError}
            aria-describedby={error}
            {...rest}
          />
        </div>
      </div>
      {error && (
        <span
          id={error}
          className={s.errorText}
          role='alert'
        >
          {error}
        </span>
      )}
    </label>
  );
};
