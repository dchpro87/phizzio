import NavBar from '../components/NavBar';

import '../styles/globals.css';

import { Providers } from '@/lib/providers';

export const metadata = {
  title: 'Phizzio',
  description: 'A cool web app for physiotherapists',
  viewport: 'initial-scale=1, width=device-width',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
