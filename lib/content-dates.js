import generated from '@/lib/lastmod.generated.json';
import { getAllPosts } from '@/lib/blog';

/**
 * Real last-modified info for a site path: { date: ISO string, source } or null.
 *   source 'git-history' | 'commit'  -> committed map (lib/lastmod.generated.json), written by scripts/lastmod.js
 *   source 'frontmatter'             -> blog post `updated` || `date`
 * Never reads git and never falls back to the build time: an unknown date returns null and the caller omits it.
 */
export function getLastModifiedInfo(path) {
  if (path.startsWith('/blog/')) {
    const post = getAllPosts().find((p) => `/blog/${p.slug}` === path);
    const d = post?.updated || post?.date;
    return d ? { date: new Date(d).toISOString(), source: 'frontmatter' } : null;
  }
  const e = generated[path];
  return e && e.date ? { date: e.date, source: e.source || 'unknown' } : null;
}

export function getLastModified(path) {
  return getLastModifiedInfo(path)?.date;
}
