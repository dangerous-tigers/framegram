import { useEffect, useRef } from 'react';

export const useDebounce = (callback: () => void | Promise<void>, delay: number, deps: React.DependencyList = []) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, ...deps]);
};
