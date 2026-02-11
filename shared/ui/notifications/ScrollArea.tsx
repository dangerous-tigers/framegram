'use client';

import { ReactNode, useCallback, useEffect, useRef } from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import s from './ScrollArea.module.scss';

interface ScrollProps {
  children: ReactNode;
  onBottomReached?: () => void;
  className?: string;
}

export const Scroll = ({ children, onBottomReached, className }: ScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && onBottomReached) {
        // Добавляем небольшую задержку, чтобы избежать частых вызовов
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          onBottomReached();
        }, 100);
      }
    },
    [onBottomReached],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !onBottomReached) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, onBottomReached]);

  // Резервный вариант: отслеживание прокрутки
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !onBottomReached) return;

    const viewportElement = scrollContainerRef.current.querySelector('[data-radix-scroll-area-viewport]');
    if (!viewportElement) return;

    const element = viewportElement as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = element;

    // Проверяем, достигли ли мы нижней части с учетом 100px запаса
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      onBottomReached();
    }
  }, [onBottomReached]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !onBottomReached) return;

    const viewport = container.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, onBottomReached]);

  return (
    <ScrollArea.Root className={s.root}>
      <ScrollArea.Viewport
        ref={scrollContainerRef}
        className={`${s.viewport} ${className || ''}`}
      >
        {children}
        {/* Sentinel элемент для Intersection Observer */}
        <div
          ref={sentinelRef}
          data-sentinel='true'
          style={{ height: '1px', flexShrink: 0 }}
        />
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className={s.scrollbar}
        orientation='vertical'
      >
        <ScrollArea.Thumb className={s.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
