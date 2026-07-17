import { SERVICES, RESULTS } from '@/lib/site'; // apna actual import path check karo
import { getAllPosts } from '@/lib/blog';

const BASE = 'https://pridehire.com';

// ... STATIC array same ...

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

  return [...staticPages, ...servicePages, ...projectPages, ...blogPosts];
}