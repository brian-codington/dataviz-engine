// src/components/BarChart.tsx
import React, { useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { BarChartProps, DataPoint } from '../types';
import { useResize } from '../hooks/useResize';
import { useTooltip } from '../hooks/useTooltip';
import { useTheme } from '../themes/ThemeProvider';
import { Tooltip } from './Tooltip';

const DEFAULT_MARGIN = { top: 20, right: 20, bottom: 40, left: 50 };

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width: widthProp = '100%',
  height = 300,
  margin: marginProp,
  xKey,
  yKey,
  radius = 4,
  accessible = false,
  ariaLabel,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useResize(containerRef);
  const theme = useTheme();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  const margin = { ...DEFAULT_MARGIN, ...marginProp };
  const innerWidth  = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const yKeys = Array.isArray(yKey) ? yKey : [yKey];

  const { xScale, yScale } = useMemo(() => {
    const xScale = d3.scaleBand()
      .domain(data.map(d => String(d[xKey])))
      .range([0, innerWidth])
      .padding(0.25);

    const yMax = d3.max(data, d => Math.max(...yKeys.map(k => Number(d[k])))) ?? 0;
    const yScale = d3.scaleLinear().domain([0, yMax]).nice().range([innerHeight, 0]);

    return { xScale, yScale };
  }, [data, xKey, yKeys, innerWidth, innerHeight]);

  return (
    <div ref={containerRef} className={className} style={{ width: widthProp, position: 'relative' }}>
      <svg
        width={width}
        height={height}
        role={accessible ? 'img' : undefined}
        aria-label={accessible ? ariaLabel : undefined}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid */}
          {yScale.ticks(5).map(tick => (
            <line
              key={tick}
              x1={0} x2={innerWidth}
              y1={yScale(tick)} y2={yScale(tick)}
              stroke={theme.grid.stroke}
              strokeDasharray={theme.grid.strokeDasharray}
            />
          ))}

          {/* Bars */}
          {data.map((d, i) =>
            yKeys.map((key, ki) => {
              const x = (xScale(String(d[xKey])) ?? 0) + ki * (xScale.bandwidth() / yKeys.length);
              const barWidth = xScale.bandwidth() / yKeys.length;
              const barHeight = innerHeight - yScale(Number(d[key]));
              const color = theme.colors[ki % theme.colors.length];

              return (
                <rect
                  key={`${i}-${key}`}
                  x={x}
                  y={yScale(Number(d[key]))}
                  width={barWidth}
                  height={Math.max(0, barHeight)}
                  fill={color}
                  rx={radius}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => showTooltip(e, { label: String(d[xKey]), value: Number(d[key]), key })}
                  onMouseLeave={hideTooltip}
                />
              );
            })
          )}

          {/* X Axis */}
          <g transform={`translate(0,${innerHeight})`}>
            {xScale.domain().map(val => (
              <text
                key={val}
                x={(xScale(val) ?? 0) + xScale.bandwidth() / 2}
                y={16}
                dy="0.71em"
                textAnchor="middle"
                fill={theme.textMuted}
                fontSize={theme.fontSize}
                fontFamily={theme.fontFamily}
              >
                {val}
              </text>
            ))}
          </g>

          {/* Y Axis */}
          {yScale.ticks(5).map(tick => (
            <text
              key={tick}
              x={-10}
              y={yScale(tick)}
              dy="0.32em"
              textAnchor="end"
              fill={theme.textMuted}
              fontSize={theme.fontSize}
              fontFamily={theme.fontFamily}
            >
              {tick}
            </text>
          ))}
        </g>
      </svg>

      {tooltip.visible && (
        <Tooltip x={tooltip.x} y={tooltip.y} data={tooltip.data} />
      )}
    </div>
  );
};
