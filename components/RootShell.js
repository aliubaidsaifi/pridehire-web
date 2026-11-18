import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { OrganizationSchema, WebsiteSchema } from '@/components/Schema';
import { GTMScript, GTMNoScript } from '@/components/Analytics';
import PageTracking from '@/components/PageTracking';
import AiReferrerTracking from '@/components/AiReferrerTracking';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getLocale } from '@/lib/markets';

/**
 * The <html> document shared by every root layout. lang and dir come from lib/markets.js, so a locale's
 * language/direction is configured in one place. `fontClass` is the next/font variable class for that locale.
 */
export default function RootShell({ market = 'global', locale = 'en', fontClass = '', children }) {
  const loc = getLocale(market, locale);
  return (
    <html lang={loc.lang} dir={loc.dir} className={fontClass} style={{ '--font-display': 'var(--font-body)' }}>
      <head>
        <GTMScript />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <GoogleAnalytics />
        <GTMNoScript />
        <PageTracking />
        <AiReferrerTracking />
        <SmoothScroll>
          <OrganizationSchema />
          <WebsiteSchema />
          <Navbar />
          <main>{children}</main>
          <Footer market={market} locale={locale} />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
