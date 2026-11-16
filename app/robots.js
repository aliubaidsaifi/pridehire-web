import { CANONICAL_HOST } from '@/lib/markets';

// No `Host:` directive (non-standard, ignored by Google). AI-crawler rules are added in the GEO phase.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/lp/', '/api/'] }],
    sitemap: `${CANONICAL_HOST}/sitemap.xml`,
  };
}
