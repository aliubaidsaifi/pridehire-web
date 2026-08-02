const BASE = 'https://pridehire.com';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/lp/', '/api/'] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}