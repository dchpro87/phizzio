import NavBar from '../components/NavBar';
import './globals.css';

import { Providers } from '@/lib/providers';

export const metadata = {
  title: 'Phizzio',
  description: 'A cool web app for physiotherapists',
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
