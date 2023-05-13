'use client';

import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';

export function Providers({ children, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SessionProvider>
    </>
  );
}
