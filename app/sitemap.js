import { SERVICES, RESULTS, LOCAL_PAGES } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl, getMarket } from '@/lib/markets';
import { hreflangFor } from '@/lib/seo';
import { getLastModifiedInfo } from '@/lib/content-dates';
import { STATIC_PAGES } from '@/lib/public-pages';
import { liveMarketPages } from '@/lib/llms';

// Emits ONLY final, canonical-host (www) URLs — nothing here redirects. lastmod is a real content date or omitted
// (never the build time). Every entry carries the hreflang alternates (self + any live locale equivalents) from lib/locale-pages.js.

const lastmodSources = {}; // build-log summary of where each <lastmod> came from

function entry({ path, priority, freq, market = 'global', locale = 'en', images }) {
  const info = getLastModifiedInfo(path);
  const lastModified = info?.date;
  const key = info ? info.source : 'omitted (no recorded date)';
  lastmodSources[key] = (lastmodSources[key] || 0) + 1;
  return {
    url: absoluteUrl(path),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency: freq,
    priority,
    alternates: { languages: hreflangFor({ market, locale, path }) },
    ...(images ? { images } : {}),
  };
}

export default function sitemap() {
  const staticPages = STATIC_PAGES.map((r) => entry(r));
  const servicePages = SERVICES.map((s) => entry({ path: `/services/${s.slug}`, priority: 0.8, freq: 'monthly' }));
  const projectPages = RESULTS.map((p) => entry({ path: `/portfolio/${p.slug}`, priority: 0.7, freq: 'monthly', images: p.image ? [absoluteUrl(p.image)] : undefined }));
  const nzPages = getMarket('nz').live ? LOCAL_PAGES.map((p) => entry({ path: `/nz/${p.slug}`, priority: 0.4, freq: 'yearly', market: 'nz' })) : [];
  const blogPosts = getAllPosts().map((p) => entry({ path: `/blog/${p.slug}`, priority: 0.6, freq: 'monthly', images: p.image ? [absoluteUrl(p.image)] : undefined }));
  // Gated market pages (content/sa, content/in): only those whose locale is switched live AND whose text is approved. Empty until then.
  const marketPages = liveMarketPages().map((p) => entry({ path: p.path, priority: 0.8, freq: 'monthly', market: p.market, locale: 'en' }));
  const all = [...staticPages, ...servicePages, ...projectPages, ...blogPosts, ...nzPages, ...marketPages];
  // stdout (not console.*, which production builds strip) so a silent gap is visible in the build log
  process.stdout.write(`[sitemap] ${all.length} URLs; lastmod sources: ${JSON.stringify(lastmodSources)}
`);
  return all;
}
