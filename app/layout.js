import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Self-hosted, subset, swap — zero layout shift, no render-blocking.
const display = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata = {
  metadataBase: new URL('https://pridehire.com'),
  title: {
    default: `${SITE.name} — We build digital experiences that grow businesses`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'digital agency',
    'web development',
    'SaaS development',
    'Next.js agency',
    'UI UX design',
    'product design',
  ],
  openGraph: {
    title: `${SITE.name} — Digital product agency`,
    description: SITE.description,
    type: 'website',
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Digital product agency`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#FBFBFD',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
