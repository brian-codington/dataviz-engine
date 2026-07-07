// src/hooks/useTooltip.ts
import { useState, useCallback } from 'react';

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  data: { label: string; value: number; key: string };
}

const initialState: TooltipState = {
  visible: false,
  x: 0,
  y: 0,
  data: { label: '', value: 0, key: '' }
};

export const useTooltip = () => {
  const [tooltip, setTooltip] = useState<TooltipState>(initialState);

  const showTooltip = useCallback(
    (event: React.MouseEvent, data: { label: string; value: number; key: string }) => {
      const rect = (event.currentTarget as SVGElement)
        .closest('div')
        ?.getBoundingClientRect();
      if (!rect) return;
      setTooltip({
        visible: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        data
      });
    },
    []
  );

  const hideTooltip = useCallback(() => {
    setTooltip(initialState);
  }, []);

  return { tooltip, showTooltip, hideTooltip };
};
