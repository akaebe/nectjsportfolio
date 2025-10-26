import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ScrollProgress } from '@/components/scroll-progress';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Ebenezer - Frontend Developer',
  description: "I enjoy turning ideas into smooth, eye-catching web experiences that people love to interact with.",
  keywords: 'frontend developer, web developer, React, Next.js, TypeScript, animations, UI/UX',
    icons: {
    icon: "/letter-e.png",
  },

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
          {/* <MagneticCursor /> */}
          <ScrollProgress />
           <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}