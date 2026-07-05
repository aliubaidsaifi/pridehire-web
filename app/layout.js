import { Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });

export const metadata = {
  metadataBase: new URL('https://pridehire.com'),
  title: {
    default: `${SITE.name} — Websites, SEO & Google Ads for Auckland businesses`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['web design Auckland', 'SEO Auckland', 'Google Ads Auckland', 'digital agency Auckland', 'website development NZ'],
  openGraph: { title: `${SITE.name} — Grow your business`, description: SITE.description, type: 'website', siteName: SITE.name, locale: 'en_NZ' },
  twitter: { card: 'summary_large_image', title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
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
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}