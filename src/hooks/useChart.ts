// src/hooks/useChart.ts
import { useMemo } from 'react';
import * as d3 from 'd3';
import { ChartMargin } from '../types';

interface UseChartOptions {
  width: number;
  height: number;
  margin: ChartMargin;
}

export const useChart = ({ width, height, margin }: UseChartOptions) => {
  return useMemo(() => ({
    innerWidth: Math.max(0, width - margin.left - margin.right),
    innerHeight: Math.max(0, height - margin.top - margin.bottom),
    transform: `translate(${margin.left},${margin.top})`
  }), [width, height, margin]);
};
