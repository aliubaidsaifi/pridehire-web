/**
 * LOCALE PAGE GROUPS — the same page in different locales. This is the ONLY place hreflang equivalents are declared,
 * so hreflang (page <head>) and xhtml:link alternates (sitemap) are generated from the same data and are always reciprocal.
 *
 * Rules:
 *  - list only LIVE pages (a URL that returns 200). Never list a planned page.
 *  - a page that appears in no group simply self-references (valid; no orphan, no one-way link).
 *  - paths are site paths without the host, e.g. '/services/seo'.
 *
 * Example once Saudi English exists:
 *   [
 *     { market: 'global', locale: 'en', path: '/services/seo' },
 *     { market: 'sa',     locale: 'en', path: '/sa/services/seo' },
 *     { market: 'sa',     locale: 'ar', path: '/sa/ar/services/seo' },
 *   ],
 *
 * Today there are no cross-locale equivalents: the NZ pages are frozen Auckland pages with no global/Saudi counterpart.
 */
export const PAGE_GROUPS = [];
