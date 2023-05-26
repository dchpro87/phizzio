import NavBar from '../ui/NavBar';
import Footer from '../ui/Footer';

import { Providers } from '@/lib/providers';

import '../styles/globals.css';

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
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <NavBar />
            <div style={{ marginTop: '1rem' }}>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
