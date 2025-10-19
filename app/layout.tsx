import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MagneticCursor } from '@/components/magnetic-cursor';
import { ScrollProgress } from '@/components/scroll-progress';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Ebenezer - Frontend Developer & Creative Technologist',
  description: 'Award-winning frontend developer specializing in cutting-edge web experiences, advanced animations, and innovative user interfaces.',
  keywords: 'frontend developer, web developer, React, Next.js, TypeScript, animations, UI/UX',
  authors: [{ name: 'Ebenezer' }],
  creator: 'Ebenezer',

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-black text-white overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <MagneticCursor />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}