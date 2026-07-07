// src/components/Sparkline.tsx
import React, { useRef } from 'react';
import * as d3 from 'd3';
import { SparklineProps } from '../types';
import { useResize } from '../hooks/useResize';

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width: widthProp = 120,
  height = 32,
  color = '#6366f1',
  fillOpacity = 0.15,
  strokeWidth = 1.5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([0, Number(widthProp)]);
  const yScale = d3.scaleLinear().domain([d3.min(data) ?? 0, d3.max(data) ?? 1]).range([height - 2, 2]);

  const lineGen = d3.line<number>()
    .x((_, i) => xScale(i))
    .y(d => yScale(d))
    .curve(d3.curveMonotoneX);

  const areaGen = d3.area<number>()
    .x((_, i) => xScale(i))
    .y0(height)
    .y1(d => yScale(d))
    .curve(d3.curveMonotoneX);

  const linePath = lineGen(data) ?? '';
  const areaPath = areaGen(data) ?? '';
  const id = `sparkline-gradient-${Math.random().toString(36).slice(2)}`;

  return (
    <div ref={containerRef} style={{ display: 'inline-block' }}>
      <svg width={widthProp} height={height}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={fillOpacity} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${id})`} />
        <path d={linePath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    </div>
  );
};
