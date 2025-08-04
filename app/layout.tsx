import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Redux_ContextProvide from '@/Provider-Hooks/Rudux_ContextProvide';
import { Toaster } from 'react-hot-toast';
import Header from '@/Component/Navbar';
import Footer from '@/Component/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-commerce Showcase',
  description: 'Browse and shop products with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acme Inc</title>
    <meta name="description" content='My Job' />
  </head>
      <body className={inter.className}>
        <Redux_ContextProvide>
          <Header/>
          <main className="container mx-auto p-4">{children}</main>
          <Footer/>
          <Toaster />
        </Redux_ContextProvide>
      </body>
    </html>
  );
}