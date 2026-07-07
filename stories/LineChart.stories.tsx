// stories/LineChart.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '../src/components/LineChart';
import { DataVizProvider } from '../src/themes/ThemeProvider';
import { darkTheme } from '../src/themes/themes';

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' }
};
export default meta;

type Story = StoryObj<typeof LineChart>;

const monthlyData = [
  { month: 'Jan', revenue: 42000, costs: 28000 },
  { month: 'Feb', revenue: 58000, costs: 31000 },
  { month: 'Mar', revenue: 51000, costs: 29000 },
  { month: 'Apr', revenue: 73000, costs: 34000 },
  { month: 'May', revenue: 68000, costs: 32000 },
  { month: 'Jun', revenue: 91000, costs: 38000 },
];

export const Default: Story = {
  args: {
    data: monthlyData,
    xKey: 'month',
    yKey: 'revenue',
    height: 300,
  }
};

export const MultiLine: Story = {
  args: {
    data: monthlyData,
    xKey: 'month',
    yKey: ['revenue', 'costs'],
    height: 300,
    dot: true,
  }
};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: '#0f172a', padding: 24, borderRadius: 8 }}>
        <DataVizProvider theme={darkTheme}>
          <Story />
        </DataVizProvider>
      </div>
    )
  ],
  args: {
    data: monthlyData,
    xKey: 'month',
    yKey: ['revenue', 'costs'],
    height: 300,
  }
};

export const Accessible: Story = {
  args: {
    data: monthlyData,
    xKey: 'month',
    yKey: 'revenue',
    height: 300,
    accessible: true,
    ariaLabel: 'Monthly revenue chart showing growth from January to June 2024'
  }
};
