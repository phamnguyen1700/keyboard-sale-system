import './globals.css';
import type { Metadata } from 'next';

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
        {children}
      </body>
    </html>
  );
}
