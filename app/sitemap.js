const BASE = 'https://pridehire.com';

export default function sitemap() {
  const routes = ['', '/services', '/work', '/about', '/insights', '/contact'];
  const now = new Date();
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
