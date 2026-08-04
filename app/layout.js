import { Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { OrganizationSchema, WebsiteSchema } from '@/components/Schema';
import { GTMScript, GTMNoScript } from '@/components/Analytics';
import PageTracking from '@/components/PageTracking';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const BASE = 'https://pridehire.com';
export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Pride Hire — Premium Digital Solutions | Websites, SEO, Ads & Automation',
    template: '%s | Pride Hire',
  },
  description: SITE.description,
  keywords: ['digital agency', 'website development', 'SEO', 'Google Ads', 'Meta Ads', 'business automation', 'graphic design'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE,
    siteName: SITE.name,
    title: 'Pride Hire — Premium Digital Solutions',
    description: SITE.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pride Hire — Premium Digital Solutions',
    description: SITE.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
};

export const viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  description: SITE.description,
  email: SITE.contactEmail,
  areaServed: 'Auckland, New Zealand',
  url: 'https://pridehire.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Auckland', addressCountry: 'NZ' },
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ" className={inter.variable} style={{ '--font-display': 'var(--font-body)' }}>
    <head>
        <GTMScript />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
       <GTMNoScript />
        <PageTracking />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <SmoothScroll>
        <OrganizationSchema />
        <WebsiteSchema />
          <Navbar />
          <main>{children}</main>
          <Footer />
           <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}