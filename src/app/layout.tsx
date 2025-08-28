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
  title: {
    default: 'Sasha AI CRM | Intelligent Business Management',
    template: '%s | Sasha AI CRM',
  },
  description: 'Sasha AI CRM combines a full-featured CRM, ERP, and POS solution with powerful AI assistants to help you close more deals, optimize operations, and grow your business faster. Manage contacts, leads, sales, and more, all powered by next-generation artificial intelligence.',
  keywords: ['CRM', 'ERP', 'POS', 'AI CRM', 'Sales Automation', 'Business Management', 'AI Assistant', 'Sales Prediction', 'Sasha AI'],
  openGraph: {
    title: 'Sasha AI CRM | Intelligent Business Management',
    description: 'The future of customer relationships and business operations, powered by AI.',
    url: 'https://sasha-ai-crm.vercel.app', // Replace with your actual domain
    siteName: 'Sasha AI CRM',
    images: [
      {
        url: 'https://picsum.photos/1200/630', // Replace with a branded OG image
        width: 1200,
        height: 630,
        alt: 'Sasha AI CRM Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Sasha AI CRM | Intelligent Business Management',
    description: 'The future of customer relationships and business operations, powered by AI.',
    images: ['https://picsum.photos/1200/630'], // Replace with a branded Twitter card image
  },
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
