// src/types.ts

export interface DataPoint {
  [key: string]: string | number | null;
}

export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface ChartTheme {
  colors: string[];
  fontFamily: string;
  fontSize: number;
  background: string;
  text: string;
  textMuted: string;
  grid: {
    stroke: string;
    strokeDasharray?: string;
  };
  tooltip: {
    background: string;
    color: string;
    border?: string;
  };
  axis: {
    stroke: string;
    tickColor: string;
  };
}

export interface BaseChartProps {
  data: DataPoint[];
  width?: number | string;
  height?: number;
  margin?: Partial<ChartMargin>;
  theme?: 'light' | 'dark' | ChartTheme;
  accessible?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

export interface LineChartProps extends BaseChartProps {
  xKey: string;
  yKey: string | string[];
  strokeWidth?: number;
  dot?: boolean;
  curve?: 'linear' | 'monotone' | 'step';
}

export interface BarChartProps extends BaseChartProps {
  xKey: string;
  yKey: string | string[];
  orientation?: 'vertical' | 'horizontal';
  radius?: number;
  stacked?: boolean;
}

export interface AreaChartProps extends LineChartProps {
  fillOpacity?: number;
}

export interface PieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey: string;
  innerRadius?: number;
  outerRadius?: number;
  padAngle?: number;
  label?: boolean;
}

export interface ScatterPlotProps extends BaseChartProps {
  xKey: string;
  yKey: string;
  sizeKey?: string;
  colorKey?: string;
  radius?: number;
}

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  strokeWidth?: number;
}

export interface AxisProps {
  dataKey: string;
  label?: string;
  format?: 'currency' | 'percent' | 'number' | ((value: unknown) => string);
  tickCount?: number;
  hide?: boolean;
}

export interface TooltipProps {
  formatter?: (value: number, key: string) => string;
  labelFormatter?: (label: string) => string;
  active?: boolean;
}

export interface LegendProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'left' | 'center' | 'right';
}
