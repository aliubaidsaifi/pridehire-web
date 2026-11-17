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

  // Government registration (shown in the footer and emitted as Organization.identifier).
  udyam: 'UDYAM-UP-58-0109076',

  // One global address — the real Indian registered address, as on the Google Business Profile. Never per-market, never Saudi.
  // SCHEMA ONLY: emitted as Organization.address (PostalAddress). It is deliberately NOT printed anywhere in visible text.
  address: {
    streetAddress: '3413, Kareem Nagar',
    addressLocality: 'Muzaffarnagar',
    addressRegion: 'Uttar Pradesh',
    postalCode: '251002',
    addressCountry: 'IN',
  },
  // Footer location block (visible). No street, locality or pincode; no "Head Office" (we have no offices).
  officeLabel: null,
  addressDisplay: 'India\nRemote Delivery Worldwide',
};

/**
 * Phone numbers — each number is stored ONCE here; every tel:/wa.me link, display string and schema field derives from this.
 *   e164      schema `telephone` and tel: links
 *   whatsapp  wa.me path (digits only)
 *   display   human format (only used where a page chooses to display it)
 * A phone line is NOT a premises: no number here implies an office or justifies LocalBusiness schema.
 */
export const PHONES = {
  IN: { e164: '+919456615609', whatsapp: '919456615609', display: '+91 94566 15609' },
  SA: { e164: '+966535239163', whatsapp: '966535239163', display: '+966 53 523 9163' },
};

// NOTE: hasFullAddress() and formatAddress() are currently unused — they exist for a possible future full-address footer.
/** True once every address field is real (not null). */
export const hasFullAddress = () => ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode'].every((k) => !!ORG.address[k]);

/** The single printed form of the address: "street, locality, region postalcode, India". Footer renders exactly this string. */
export const formatAddress = () => {
  const a = ORG.address;
  return `${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India`;
};

export const MARKETS = {
  /** Global English — root of the site and the x-default. */
  global: {
    id: 'global',
    country: null,
    phone: PHONES.IN.e164, // the global site's contact line is the Indian number
    whatsapp: PHONES.IN.whatsapp,
    phoneDisplay: PHONES.IN.display,
    currency: null, // TODO(owner): pricing currency for the global audience
    timezone: 'Asia/Kolkata',
    businessHours: { label: 'Mon – Sat', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], opens: null, closes: null }, // TODO(owner): times
    areaServed: [], // no country claim for the global audience
    live: true,
    locales: {
      // og:locale is language_TERRITORY with an UNDERSCORE (en_NZ); hreflang/lang use a HYPHEN (en-NZ). Do not mix them up.
      // The global site targets no single country, so it declares bare 'en' instead of the misleading en_US
      // (the Open Graph default). If a platform dislikes a bare language, use a territory we actually target, e.g. 'en_IN'.
      en: { path: '', hreflang: 'en', lang: 'en', dir: 'ltr', ogLocale: 'en', live: true },
    },
  },

  /** New Zealand — FROZEN. No further content investment. */
  nz: {
    id: 'nz',
    country: 'NZ',
    phone: PHONES.IN.e164, // same real number; there is no NZ line
    whatsapp: PHONES.IN.whatsapp,
    phoneDisplay: PHONES.IN.display,
    currency: 'NZD',
    timezone: 'Pacific/Auckland',
    businessHours: null,
    areaServed: ['NZ'],
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
    // Saudi CONTACT LINE for Saudi customers — not an office. No address is attached and it must never be paired with LocalBusiness.
    phone: PHONES.SA.e164,
    whatsapp: PHONES.SA.whatsapp,
    phoneDisplay: PHONES.SA.display,
    contactPoint: { contactType: 'sales' },
    currency: 'SAR',
    timezone: 'Asia/Riyadh',
    businessHours: { label: null, days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'], opens: null, closes: null }, // TODO(owner): confirm days/times; keep in sync with Calendly settings
    areaServed: ['SA'],
    serving: true, // we serve Saudi clients now (drives Organization/Service areaServed); `live` is about routes, not service
    // 'ar' is deliberately absent: there is no Arabic page, font-in-use or RTL page yet, so we cannot honour Arabic enquiries.
    // Add 'ar' back in the SAME commit that ships the first reviewed Arabic page (tracked in SEO-TODO.md).
    availableLanguage: ['en'],
    live: false,
    locales: {
      en: { path: '/sa', hreflang: 'en-SA', lang: 'en-SA', dir: 'ltr', ogLocale: 'en_SA', live: false },
      ar: { path: '/sa/ar', hreflang: 'ar-SA', lang: 'ar-SA', dir: 'rtl', ogLocale: 'ar_SA', live: false },
    },
  },

  /** India — configured, NOT live (no /in routes yet). Holds the Indian contact line for schema. */
  in: {
    id: 'in',
    country: 'IN',
    phone: PHONES.IN.e164,
    whatsapp: PHONES.IN.whatsapp,
    phoneDisplay: PHONES.IN.display,
    contactPoint: { contactType: 'sales' },
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    businessHours: null, // TODO(owner)
    areaServed: ['IN'],
    // Cities listed on the Google Business Profile (service-area business, no public premises). Emitted in Organization.areaServed.
    serviceAreas: [
      { name: 'Muzaffarnagar', region: 'Uttar Pradesh' },
      { name: 'Shamli', region: 'Uttar Pradesh' },
      { name: 'Meerut', region: 'Uttar Pradesh' },
      { name: 'Saharanpur', region: 'Uttar Pradesh' },
    ],
    serving: true, // the Indian entity and its live clients are here today
    availableLanguage: ['en'],
    live: false,
    locales: {
      en: { path: '/in', hreflang: 'en-IN', lang: 'en-IN', dir: 'ltr', ogLocale: 'en_IN', live: false },
    },
  },
  // Note: UK English is `en-GB` (en-UK is invalid).
};

export const getMarket = (id = 'global') => MARKETS[id] || MARKETS.global;
export const getLocale = (marketId = 'global', localeKey = 'en') => getMarket(marketId).locales[localeKey] || getMarket(marketId).locales.en;

/** Phone/WhatsApp for a market, falling back to the global (real) number when the market has none yet. */
export function contactFor(marketId = 'global') {
  const m = getMarket(marketId);
  return {
    phone: m.phone || MARKETS.global.phone,
    whatsapp: m.whatsapp || MARKETS.global.whatsapp,
    display: m.phoneDisplay || MARKETS.global.phoneDisplay,
  };
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
