import generated from '@/lib/lastmod.generated.json';
import { getAllPosts } from '@/lib/blog';

/**
 * Real last-modified date (ISO string) for a site path, or undefined if unknown.
 * Static/data pages: from git history (scripts/lastmod.js). Blog posts: frontmatter `updated` || `date`.
 * Never falls back to the build time — an unknown date is omitted rather than invented.
 */
export function getLastModified(path) {
  if (path.startsWith('/blog/')) {
    const post = getAllPosts().find((p) => `/blog/${p.slug}` === path);
    const d = post?.updated || post?.date;
    return d ? new Date(d).toISOString() : undefined;
  }
  return generated[path];
}
