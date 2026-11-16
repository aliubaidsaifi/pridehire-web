/**
 * MARKET CONFIG — the single source of truth for everything that varies by market or locale.
 *
 * TO ADD A MARKET (e.g. India): append ONE entry to MARKETS below, then
 *   1. add a root layout:  app/in/layout.js  (copy app/nz/layout.js, change the ids)  — or app/in/(en)/ + app/in/hi/ for several languages
 *   2. add the pages under that folder
 *   3. list equivalent pages in lib/locale-pages.js so hreflang and the sitemap link them reciprocally.
 * Nothing else changes: metadata, hreflang, sitemap, schema contact points and html lang/dir all read from here.
 *
 * `live: false` means "configured but no routes exist yet" — it is excluded from hreflang and the sitemap.
 */

// Canonical host. Verified: apex pridehire.com already 301s to www at the hosting level.
export const CANONICAL_HOST = 'https://www.pridehire.com';

export const ORG = {
  name: 'Pride Hire',
  email: 'contact@pridehire.com',
  logoPath: '/logo.png',
  ogImagePath: '/og-image.png', // TODO(asset): /public/og-image.png does not exist yet — social previews currently 404.
  // sameAs must contain ONLY profiles we control. Instagram is intentionally absent until a real URL exists.
  sameAs: ['https://www.linkedin.com/company/pride-hire/'],

  // One global address — the real Indian registered address. Never per-market, never a Saudi address.
  // TODO(owner): supply the full real registered address. Until then only the country is emitted in schema.
  address: {
    streetAddress: null,
    addressLocality: null,
    addressRegion: null,
    postalCode: null,
    addressCountry: 'IN',
  },
  // Text currently printed in the footer (kept byte-for-byte; no visible change). TODO(owner): replace with the real address.
  officeLabel: 'India (Head Office)',
  addressDisplay: 'Delhi NCR\nRemote Delivery Worldwide',
};

export const MARKETS = {
  /** Global English — root of the site and the x-default. */
  global: {
    id: 'global',
    country: null,
    phone: '+919456615609',
    whatsapp: '919456615609',
    currency: null, // TODO(owner): pricing currency for the global audience
    timezone: 'Asia/Kolkata',
    businessHours: { label: 'Mon – Sat', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], opens: null, closes: null }, // TODO(owner): times
    areaServed: [], // no country claim for the global audience
    availableLanguage: ['English'],
    live: true,
    locales: {
      en: { path: '', hreflang: 'en', lang: 'en', dir: 'ltr', ogLocale: 'en_US', live: true },
    },
  },

  /** New Zealand — FROZEN. No further content investment. */
  nz: {
    id: 'nz',
    country: 'NZ',
    phone: '+919456615609', // same real number; there is no NZ line
    whatsapp: '919456615609',
    currency: 'NZD',
    timezone: 'Pacific/Auckland',
    businessHours: null,
    areaServed: ['NZ'],
    availableLanguage: ['English'],
    live: true,
    frozen: true,
    locales: {
      en: { path: '/nz', hreflang: 'en-NZ', lang: 'en-NZ', dir: 'ltr', ogLocale: 'en_NZ', live: true },
    },
  },

  /** Saudi Arabia — configured, NOT live. Routes arrive in Phase 3 with real content. */
  sa: {
    id: 'sa',
    country: 'SA',
    phone: null, // TODO(owner): Saudi number (incoming). Until set, contactFor('sa') falls back to the global number.
    whatsapp: null, // TODO(owner)
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    businessHours: { label: null, days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'], opens: null, closes: null }, // TODO(owner): confirm days/times; keep in sync with Calendly settings
    areaServed: ['SA'],
    serving: true, // we serve Saudi clients now (drives Organization/Service areaServed); `live` is about routes, not service
    availableLanguage: ['English', 'Arabic'], // TODO(owner): confirm Arabic is offered before this reaches schema
    live: false,
    locales: {
      en: { path: '/sa', hreflang: 'en-SA', lang: 'en-SA', dir: 'ltr', ogLocale: 'en_SA', live: false },
      ar: { path: '/sa/ar', hreflang: 'ar-SA', lang: 'ar-SA', dir: 'rtl', ogLocale: 'ar_SA', live: false },
    },
  },

  // India, when it launches, is one more entry here:
  // in: { id: 'in', country: 'IN', phone: ..., currency: 'INR', timezone: 'Asia/Kolkata', areaServed: ['IN'],
  //       live: false, locales: { en: { path: '/in', hreflang: 'en-IN', lang: 'en-IN', dir: 'ltr', ogLocale: 'en_IN', live: false } } },
  // Note: UK English is `en-GB` (en-UK is invalid).
};

export const getMarket = (id = 'global') => MARKETS[id] || MARKETS.global;
export const getLocale = (marketId = 'global', localeKey = 'en') => getMarket(marketId).locales[localeKey] || getMarket(marketId).locales.en;

/** Phone/WhatsApp for a market, falling back to the global (real) number when the market has none yet. */
export function contactFor(marketId = 'global') {
  const m = getMarket(marketId);
  return { phone: m.phone || MARKETS.global.phone, whatsapp: m.whatsapp || MARKETS.global.whatsapp };
}
export const waLink = (marketId = 'global', text) =>
  `https://wa.me/${contactFor(marketId).whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const telLink = (marketId = 'global') => `tel:${contactFor(marketId).phone}`;

/** Absolute URL on the canonical host. No trailing slash anywhere (the root is the bare host, matching what Next renders). */
export function absoluteUrl(path = '/') {
  if (!path || path === '/') return CANONICAL_HOST;
  return `${CANONICAL_HOST}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Live (market, locale) pairs — used by hreflang, sitemap and schema. */
export function liveLocales() {
  const out = [];
  for (const m of Object.values(MARKETS)) {
    for (const [key, l] of Object.entries(m.locales)) if (m.live && l.live) out.push({ market: m.id, locale: key, ...l });
  }
  return out;
}
