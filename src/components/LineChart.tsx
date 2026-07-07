// src/components/LineChart.tsx
import React, { useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { LineChartProps, DataPoint } from '../types';
import { useResize } from '../hooks/useResize';
import { useTooltip } from '../hooks/useTooltip';
import { useTheme } from '../themes/ThemeProvider';
import { Tooltip } from './Tooltip';
import { formatValue } from '../utils/formatters';

const DEFAULT_MARGIN = { top: 20, right: 30, bottom: 40, left: 50 };

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width: widthProp = '100%',
  height = 300,
  margin: marginProp,
  xKey,
  yKey,
  strokeWidth = 2,
  dot = true,
  curve = 'monotone',
  accessible = false,
  ariaLabel,
  animate = true,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { width } = useResize(containerRef);
  const theme = useTheme();
  const { tooltip, showTooltip, hideTooltip } = useTooltip();

  const margin = { ...DEFAULT_MARGIN, ...marginProp };
  const innerWidth  = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);

  const yKeys = Array.isArray(yKey) ? yKey : [yKey];

  const { xScale, yScale } = useMemo(() => {
    const xValues = data.map(d => String(d[xKey]));
    const yValues = data.flatMap(d => yKeys.map(k => Number(d[k])));

    const xScale = d3.scalePoint<string>()
      .domain(xValues)
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(yValues) ?? 0])
      .nice()
      .range([innerHeight, 0]);

    return { xScale, yScale };
  }, [data, xKey, yKeys, innerWidth, innerHeight]);

  const curveFactory = {
    linear: d3.curveLinear,
    monotone: d3.curveMonotoneX,
    step: d3.curveStep
  }[curve];

  const lines = yKeys.map((key, i) => {
    const lineGen = d3.line<DataPoint>()
      .x(d => xScale(String(d[xKey])) ?? 0)
      .y(d => yScale(Number(d[key])))
      .curve(curveFactory);

    return { key, path: lineGen(data) ?? '', color: theme.colors[i % theme.colors.length] };
  });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: widthProp, position: 'relative' }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        role={accessible ? 'img' : undefined}
        aria-label={accessible ? ariaLabel : undefined}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Grid lines */}
          {yScale.ticks(5).map(tick => (
            <line
              key={tick}
              x1={0} x2={innerWidth}
              y1={yScale(tick)} y2={yScale(tick)}
              stroke={theme.grid.stroke}
              strokeDasharray={theme.grid.strokeDasharray}
              strokeWidth={1}
            />
          ))}

          {/* X Axis */}
          <g transform={`translate(0,${innerHeight})`}>
            {xScale.domain().map(val => (
              <g key={val} transform={`translate(${xScale(val)},0)`}>
                <line y2={6} stroke={theme.axis.tickColor} />
                <text
                  y={16} dy="0.71em"
                  textAnchor="middle"
                  fill={theme.textMuted}
                  fontSize={theme.fontSize}
                  fontFamily={theme.fontFamily}
                >
                  {val}
                </text>
              </g>
            ))}
          </g>

          {/* Y Axis */}
          <g>
            {yScale.ticks(5).map(tick => (
              <g key={tick} transform={`translate(0,${yScale(tick)})`}>
                <line x2={-6} stroke={theme.axis.tickColor} />
                <text
                  x={-10} dy="0.32em"
                  textAnchor="end"
                  fill={theme.textMuted}
                  fontSize={theme.fontSize}
                  fontFamily={theme.fontFamily}
                >
                  {formatValue(tick, 'number')}
                </text>
              </g>
            ))}
          </g>

          {/* Lines */}
          {lines.map(({ key, path, color }) => (
            <path
              key={key}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Dots */}
          {dot && lines.map(({ key, color }) =>
            data.map((d, i) => (
              <circle
                key={`${key}-${i}`}
                cx={xScale(String(d[xKey])) ?? 0}
                cy={yScale(Number(d[key]))}
                r={4}
                fill={color}
                stroke={theme.background}
                strokeWidth={2}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => showTooltip(e, { label: String(d[xKey]), value: Number(d[key]), key })}
                onMouseLeave={hideTooltip}
              />
            ))
          )}
        </g>
      </svg>

      {tooltip.visible && (
        <Tooltip x={tooltip.x} y={tooltip.y} data={tooltip.data} />
      )}
    </div>
  );
};
