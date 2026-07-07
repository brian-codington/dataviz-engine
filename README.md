# 📊 dataviz-engine

**Composable, Accessible React Charting Library**

![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![React](https://img.shields.io/badge/React-18-blue) ![D3.js](https://img.shields.io/badge/D3.js-7.0-orange) ![npm](https://img.shields.io/badge/npm-dataviz--engine-red) ![Stars](https://img.shields.io/badge/⭐-500+-yellow) ![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

A thin, composable layer over D3.js for React applications. Full TypeScript support, WCAG 2.1 AA accessible, SSR compatible, and under 40KB gzipped.

---

## 📦 Installation

```bash
npm install dataviz-engine
# or
yarn add dataviz-engine
```

---

## 📊 Chart Types

`LineChart` · `BarChart` · `AreaChart` · `ScatterPlot` · `PieChart` · `DonutChart` · `HeatMap` · `TreeMap` · `Histogram` · `Sparkline`

---

## 🚀 Quick Start

```tsx
import { LineChart, XAxis, YAxis, Tooltip, Legend } from 'dataviz-engine';

const data = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 51000 },
  { month: 'Apr', revenue: 73000 },
];

const SalesChart = () => (
  <LineChart
    data={data}
    width="100%"
    height={300}
    theme="dark"
    accessible
    ariaLabel="Monthly sales revenue 2024"
  >
    <XAxis dataKey="month" />
    <YAxis dataKey="revenue" format="currency" />
    <Tooltip formatter={(val) => `$${val.toLocaleString()}`} />
    <Legend />
  </LineChart>
);
```

---

## 🎨 Theming

```tsx
import { DataVizProvider, LineChart } from 'dataviz-engine';

const theme = {
  colors: ['#6366f1', '#8b5cf6', '#a78bfa'],
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  grid: { stroke: '#374151', strokeDasharray: '4 4' },
  tooltip: { background: '#1f2937', color: '#f9fafb' }
};

const App = () => (
  <DataVizProvider theme={theme}>
    <LineChart data={data} />
  </DataVizProvider>
);
```

---

## 🎯 Key Features

| Feature | Description |
|--------|-------------|
| **Composable API** | Mix and match chart primitives to build custom visualizations |
| **TypeScript First** | Full type safety and IntelliSense support |
| **Accessible** | ARIA labels, keyboard navigation, screen reader support |
| **Responsive** | Auto-resizes to container via ResizeObserver |
| **SSR Compatible** | Works with Next.js and other SSR frameworks |
| **Themeable** | CSS custom properties for easy white-labeling |

---

## 📊 Performance

| Metric | Result |
|--------|--------|
| Bundle Size | 38KB gzipped |
| GitHub Stars | 500+ |
| Weekly npm Downloads | 12,000+ |
| Lighthouse Accessibility Score | 98/100 |

---

## 📁 Project Structure

```
dataviz-engine/
├── src/
│   ├── components/       # Chart components (LineChart, BarChart, etc.)
│   ├── hooks/            # useChart, useResize, useTooltip
│   ├── themes/           # Default light/dark themes
│   └── utils/            # Scale helpers, formatters, type guards
├── stories/              # Storybook stories for all components
├── tests/                # Jest + React Testing Library tests
├── package.json
├── tsconfig.json
├── rollup.config.js
└── .storybook/
```

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

*Part of [Brian Codington's Portfolio](https://github.com/brian-codington/brian-codington-portfolio)*
