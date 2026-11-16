import { CANONICAL_HOST, ORG, MARKETS, getMarket, getLocale, absoluteUrl } from '@/lib/markets';
import { PAGE_GROUPS } from '@/lib/locale-pages';

export const SITE_NAME = 'Pride Hire';

/** hreflang map for a page: { 'en-SA': url, 'ar-SA': url, 'x-default': url }. Self-referencing and reciprocal by construction. */
export function hreflangFor({ market = 'global', locale = 'en', path = '/' }) {
  const norm = (p) => (!p || p === '/' ? '/' : p);
  const group = PAGE_GROUPS.find((g) => g.some((m) => m.market === market && m.locale === locale && norm(m.path) === norm(path)));
  const members = group || [{ market, locale, path }];
  const map = {};
  for (const m of members) {
    const l = getLocale(m.market, m.locale);
    map[l.hreflang] = absoluteUrl(m.path);
    if (m.market === 'global') map['x-default'] = absoluteUrl(m.path); // the global English page is the x-default
  }
  return map;
}

/**
 * Full metadata for a page. Nested `openGraph`/`twitter` replace (not merge with) the layout's, so they are built whole here.
 *   title        page title (the ' | Pride Hire' template is applied unless absoluteTitle)
 *   path         site path of this page, e.g. '/services/seo' ('/' for the home page)
 */
export function buildMetadata({ title, description, path = '/', market = 'global', locale = 'en', absoluteTitle = false, type = 'website', noindex = false, openGraph = {} }) {
  const loc = getLocale(market, locale);
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const image = `${CANONICAL_HOST}${ORG.ogImagePath}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages: hreflangFor({ market, locale, path }) },
    openGraph: { type, locale: loc.ogLocale, url, siteName: SITE_NAME, title: fullTitle, description, images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }], ...openGraph },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Layout-level defaults for a root layout (title template, robots, icons, metadataBase). No keywords tag. */
export function baseMetadata({ market = 'global', locale = 'en' } = {}) {
  const loc = getLocale(market, locale);
  return {
    metadataBase: new URL(CANONICAL_HOST),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: { type: 'website', locale: loc.ogLocale, siteName: SITE_NAME },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    icons: { icon: '/icon.png', apple: '/icon.png' },
  };
}

export { getMarket };
