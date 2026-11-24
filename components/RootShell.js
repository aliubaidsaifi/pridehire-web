import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SaFooter from '@/components/SaFooter';
import CookieConsent from '@/components/CookieConsent';
import { OrganizationSchema, WebsiteSchema } from '@/components/Schema';
import { GTMScript, GTMNoScript } from '@/components/Analytics';
import PageTracking from '@/components/PageTracking';
import AiReferrerTracking from '@/components/AiReferrerTracking';
import MarketBeacon from '@/components/MarketBeacon';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getLocale } from '@/lib/markets';
import { saNav, saFooterStrings } from '@/lib/sa-nav';

/**
 * The <html> document shared by every root layout. lang and dir come from lib/markets.js, so a locale's
 * language/direction is configured in one place. `fontClass` is the next/font variable class for that locale.
 */
export default function RootShell({ market = 'global', locale = 'en', fontClass = '', children }) {
  const loc = getLocale(market, locale);
  const nav = market === 'sa' ? saNav(locale) : null; // Saudi service set + /sa links (null elsewhere)
  const footerStrings = market === 'sa' ? saFooterStrings(locale) : null; // Saudi footer + cookie banner labels, in the page language
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
        <MarketBeacon market={market} />
        <SmoothScroll>
          <OrganizationSchema />
          <WebsiteSchema inLanguage={market === 'sa' && locale === 'ar' ? 'ar-SA' : 'en'} />
          <Navbar market={market} saNav={nav} />
          <main>{children}</main>
          {nav ? <SaFooter nav={nav} strings={footerStrings} /> : <Footer market={market} locale={locale} saNav={nav} />}
          <CookieConsent strings={footerStrings} />
        </SmoothScroll>
      </body>
    </html>
  );
}
