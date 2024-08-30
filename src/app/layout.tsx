import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Blinker } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tafaling',
  description: 'Share the madness',
};

const blinker = Blinker({
  weight: ['100', '200', '300', '400', '600', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/png' href='/favicon.png' />
      </head>
      <body className={`${inter.className} ${blinker.className} bg-[#f4f7f8]`}>
        {children}
      </body>
    </html>
  );
}
