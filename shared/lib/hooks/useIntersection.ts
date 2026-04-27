'use client';
import { useCallback, useEffect, useRef } from 'react';

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  useEffect(() => {
    return () => unsubscribe.current();
  }, []);

  return useCallback(
    (el: HTMLDivElement | null) => {
      unsubscribe.current();

      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onIntersect();
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(el);
      unsubscribe.current = () => observer.disconnect();
    },
    [onIntersect],
  );
}
