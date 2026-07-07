// src/index.ts
export { LineChart } from './components/LineChart';
export { BarChart } from './components/BarChart';
export { AreaChart } from './components/AreaChart';
export { PieChart } from './components/PieChart';
export { DonutChart } from './components/DonutChart';
export { ScatterPlot } from './components/ScatterPlot';
export { Sparkline } from './components/Sparkline';

export { XAxis } from './components/XAxis';
export { YAxis } from './components/YAxis';
export { Tooltip } from './components/Tooltip';
export { Legend } from './components/Legend';
export { Grid } from './components/Grid';

export { DataVizProvider, useTheme } from './themes/ThemeProvider';
export { defaultTheme, darkTheme } from './themes/themes';

export { useChart } from './hooks/useChart';
export { useResize } from './hooks/useResize';
export { useTooltip } from './hooks/useTooltip';

export type {
  ChartTheme,
  ChartMargin,
  DataPoint,
  LineChartProps,
  BarChartProps,
  AreaChartProps,
  PieChartProps,
  ScatterPlotProps,
  SparklineProps,
  AxisProps,
  TooltipProps,
  LegendProps
} from './types';
