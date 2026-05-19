import { RefObject, useEffect, useRef } from 'react';

/**
 * Хук для отслеживания клика вне указанного элемента
 * @param callback - функция, которая вызывается при клике вне элемента
 * @returns ref, который нужно передать в элемент
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(callback: () => void): RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const target = event.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('pointerdown', handler, true);

    return () => {
      document.removeEventListener('pointerdown', handler, true);
    };
  }, [callback]);

  return ref;
};
