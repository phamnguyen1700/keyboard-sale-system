import './globals.css';
import type { Metadata } from 'next';
import QueryProvider from '@/lib/QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Keyboard Sale System',
  description: 'A modern keyboard e-commerce platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[var(--background-color)] text-[var(--text-color)] min-h-screen">
        <QueryProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </QueryProvider>
      </body>
    </html>
  );
}
