import { ReactNode, useRef, useEffect, useCallback } from 'react';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import s from './ScrollArea.module.scss';

interface ScrollProps {
  children: ReactNode;
  onBottomReached?: () => void;
  className?: string;
}

export const Scroll = ({ children, onBottomReached, className }: ScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkIfAtBottom = useCallback(() => {
    if (!scrollContainerRef.current || !onBottomReached) return;

    // Находим внутренний viewport элемент
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

    // Используем Intersection Observer для лучшей производительности
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Добавляем небольшую задержку, чтобы избежать частых вызовов
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          timeoutRef.current = setTimeout(() => {
            onBottomReached();
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    // Находим последний элемент в контенте
    const observeLastItem = () => {
      if (container) {
        const viewportElement = container.querySelector('[data-radix-scroll-area-viewport]');
        if (viewportElement) {
          // Добавляем элемент-наблюдатель в конец
          const sentinel = document.createElement('div');
          sentinel.setAttribute('data-sentinel', 'true');
          sentinel.style.height = '1px';
          sentinel.style.marginTop = 'auto';
          viewportElement.appendChild(sentinel);
          observer.observe(sentinel);
        }
      }
    };

    // Инициализируем наблюдение
    observeLastItem();

    // Также отслеживаем прокрутку как резервный вариант
    const handleScroll = () => {
      checkIfAtBottom();
    };

    const viewport = container.querySelector('[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (viewport) {
        viewport.removeEventListener('scroll', handleScroll);
      }
      
      // Удаляем sentinel элемент
      const sentinel = container.querySelector('[data-sentinel="true"]');
      if (sentinel && viewport) {
        viewport.removeChild(sentinel);
      }
    };
  }, [checkIfAtBottom, onBottomReached]);

  return (
    <ScrollArea.Root className={s.root}>
      <ScrollArea.Viewport
        ref={scrollContainerRef}
        className={`${s.viewport} ${className || ''}`}
      >
        {children}
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
