'use client';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

export function Providers({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
