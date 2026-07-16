import { SERVICES } from '@/lib/site';
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://pridehire.com';

const STATIC = [
  { path: '', priority: 1, freq: 'weekly' },
  { path: '/services', priority: 0.9, freq: 'monthly' },
  { path: '/portfolio', priority: 0.8, freq: 'monthly' },
  { path: '/about', priority: 0.7, freq: 'monthly' },
  { path: '/blog', priority: 0.8, freq: 'weekly' },
  { path: '/free-audit', priority: 0.9, freq: 'monthly' },
  { path: '/contact', priority: 0.8, freq: 'monthly' },
  // local SEO pages
  { path: '/web-design-auckland', priority: 0.9, freq: 'monthly' },
  { path: '/seo-auckland', priority: 0.9, freq: 'monthly' },
  { path: '/google-ads-auckland', priority: 0.9, freq: 'monthly' },
  { path: '/meta-ads-auckland', priority: 0.9, freq: 'monthly' },
  { path: '/ecommerce-auckland', priority: 0.9, freq: 'monthly' },
  // legal
  { path: '/privacy', priority: 0.3, freq: 'yearly' },
  { path: '/terms', priority: 0.3, freq: 'yearly' },
];

export default function sitemap() {
  const now = new Date();

  const staticPages = STATIC.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPosts = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

   const projectPages = RESULTS.map((p) => ({
    url: `${BASE}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages,projectPages, ...blogPosts];
}