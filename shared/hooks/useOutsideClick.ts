import { useRef, useEffect, RefObject } from 'react';

/**
 * Хук для отслеживания клика вне указанного элемента
 * @param callback - функция, которая вызывается при клике вне элемента
 * @returns ref, который нужно передать в элемент
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(callback: () => void): RefObject<T | null> => {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (containerRef.current && !containerRef.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    };
  }, [callback]);

  return containerRef;
};
