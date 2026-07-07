// src/themes/themes.ts
import { ChartTheme } from '../types';

export const defaultTheme: ChartTheme = {
  colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'],
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 12,
  background: '#ffffff',
  text: '#111827',
  textMuted: '#6b7280',
  grid: {
    stroke: '#f3f4f6',
    strokeDasharray: '4 4'
  },
  tooltip: {
    background: '#1f2937',
    color: '#f9fafb',
    border: '1px solid #374151'
  },
  axis: {
    stroke: '#e5e7eb',
    tickColor: '#d1d5db'
  }
};

export const darkTheme: ChartTheme = {
  colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'],
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 12,
  background: '#0f172a',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  grid: {
    stroke: '#1e293b',
    strokeDasharray: '4 4'
  },
  tooltip: {
    background: '#1e293b',
    color: '#f1f5f9',
    border: '1px solid #334155'
  },
  axis: {
    stroke: '#334155',
    tickColor: '#475569'
  }
};
