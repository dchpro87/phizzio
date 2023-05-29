'use client';

import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import store from '../store/store';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';

export default function Providers({ children, session }) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CssBaseline />
              {children}
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
