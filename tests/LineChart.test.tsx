// tests/LineChart.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LineChart } from '../src/components/LineChart';

const mockData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 200 },
  { month: 'Mar', value: 150 },
];

describe('LineChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <LineChart data={mockData} xKey="month" yKey="value" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders accessible role and aria-label when accessible=true', () => {
    render(
      <LineChart
        data={mockData}
        xKey="month"
        yKey="value"
        accessible
        ariaLabel="Test chart"
      />
    );
    expect(screen.getByRole('img', { name: 'Test chart' })).toBeInTheDocument();
  });

  it('renders correct number of data points as dots', () => {
    const { container } = render(
      <LineChart data={mockData} xKey="month" yKey="value" dot />
    );
    const dots = container.querySelectorAll('circle');
    expect(dots.length).toBe(mockData.length);
  });
});
