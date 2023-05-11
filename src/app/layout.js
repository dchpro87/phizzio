import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import '../styles/globals.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

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
          <div style={{ position: 'relative', minHeight: '100vh' }}>
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
