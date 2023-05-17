'use client';

import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';

export function Providers({ children, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
