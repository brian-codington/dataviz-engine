// src/themes/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { ChartTheme } from '../types';
import { defaultTheme } from './themes';

const ThemeContext = createContext<ChartTheme>(defaultTheme);

interface DataVizProviderProps {
  theme?: ChartTheme;
  children: ReactNode;
}

export const DataVizProvider: React.FC<DataVizProviderProps> = ({ theme = defaultTheme, children }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = (): ChartTheme => useContext(ThemeContext);
