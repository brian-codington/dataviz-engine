// src/utils/formatters.ts

type FormatType = 'currency' | 'percent' | 'number' | 'compact';

export const formatValue = (value: number, format: FormatType = 'number'): string => {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    case 'percent':
      return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 }).format(value / 100);
    case 'compact':
      return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
    default:
      return new Intl.NumberFormat('en-US').format(value);
  }
};

export const slugify = (str: string): string =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
