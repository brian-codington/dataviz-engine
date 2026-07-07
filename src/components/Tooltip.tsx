// src/components/Tooltip.tsx
import React from 'react';
import { useTheme } from '../themes/ThemeProvider';

interface TooltipInternalProps {
  x: number;
  y: number;
  data: { label: string; value: number; key: string };
  formatter?: (value: number, key: string) => string;
}

export const Tooltip: React.FC<TooltipInternalProps> = ({ x, y, data, formatter }) => {
  const theme = useTheme();
  const displayValue = formatter ? formatter(data.value, data.key) : data.value.toLocaleString();

  return (
    <div
      style={{
        position: 'absolute',
        left: x + 12,
        top: y - 10,
        background: theme.tooltip.background,
        color: theme.tooltip.color,
        border: theme.tooltip.border ?? '1px solid rgba(255,255,255,.1)',
        borderRadius: 6,
        padding: '6px 10px',
        fontSize: 12,
        fontFamily: theme.fontFamily,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,.3)',
        zIndex: 100
      }}
    >
      <div style={{ color: 'rgba(255,255,255,.6)', marginBottom: 2 }}>{data.label}</div>
      <div style={{ fontWeight: 600 }}>{displayValue}</div>
    </div>
  );
};

// Empty export for composable usage
export const XAxis = () => null;
export const YAxis = () => null;
export const Legend = () => null;
export const Grid = () => null;
