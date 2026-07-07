// src/hooks/useResize.ts
import { useState, useEffect, RefObject } from 'react';

export const useResize = (ref: RefObject<HTMLElement | null>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(ref.current);
    setWidth(ref.current.getBoundingClientRect().width);

    return () => observer.disconnect();
  }, [ref]);

  return { width };
};
