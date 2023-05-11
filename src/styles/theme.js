import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  palette: {
    common: {
      black: '#606060',
      white: '#f2f2f2',
    },
    primary: {
      main: '#64b330',
    },
    secondary: {
      main: '#7f30b3',
    },
    text: {
      primary: '#606060',
      secondary: '#979797',
      disabled: '#979797',
      light: '#f2f2f2',
      dark: '#3c3c3c',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
