// hooks/useResizable.ts
import { useEffect, useRef } from 'react';

type ResizeDirection = 'both' | 'horizontal' | 'vertical' | 'none';

export type UseResizableOptions = {
  direction?: ResizeDirection;
};

export const useResizable = (options: UseResizableOptions = {}) => {
  const { direction = 'both' } = options;

  const targetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const handle = handleRef.current;

    if (!target || !handle) return;

    let isResizing = false;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = target.offsetWidth;
      startHeight = target.offsetHeight;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !target) return;

      if (direction === 'none') return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (direction === 'horizontal' || direction === 'both') {
        const newWidth = startWidth + dx;

        target.style.width = `${newWidth}px`;
      }

      if (direction === 'vertical' || direction === 'both') {
        const newHeight = startHeight + dy;

        target.style.height = `${newHeight}px`;
      }
    };

    const handleMouseUp = () => {
      isResizing = false;
    };

    handle.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      handle.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { targetRef, handleRef };
};
