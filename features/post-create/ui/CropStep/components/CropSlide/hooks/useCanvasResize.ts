'use clietn';

import { useEffect, useRef } from 'react';

export function useCanvasResize(element: HTMLElement | null, onResize: (width: number, height: number) => void) {
  const onResizeRef = useRef(onResize);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      onResizeRef.current(width, height);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);
}
