import NavBar from '../components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Phizzio',
  description: 'A cool web app for physiotherapists',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
