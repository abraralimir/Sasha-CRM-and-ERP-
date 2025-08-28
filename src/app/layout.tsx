import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {ThemeProvider} from '@/components/theme-provider';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const fontSans = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontHeadline = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-headline",
});


export const metadata: Metadata = {
  title: 'Sasha AI CRM',
  description: 'AI-powered CRM for modern sales teams',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", fontSans.variable, fontHeadline.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
