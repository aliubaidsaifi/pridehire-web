// The site's public top-level pages — ONE list shared by the sitemap and /llms.txt so they cannot drift.
// `summary` is a plain factual descriptor used only in llms files (no claims).
export const STATIC_PAGES = [
  { path: '/', priority: 1, freq: 'weekly', label: 'Home' },
  { path: '/services', priority: 0.9, freq: 'monthly', label: 'Services' },
  { path: '/portfolio', priority: 0.8, freq: 'monthly', label: 'Portfolio' },
  { path: '/about', priority: 0.7, freq: 'monthly', label: 'About' },
  { path: '/blog', priority: 0.8, freq: 'weekly', label: 'Blog', summary: 'Articles for business owners' },
  { path: '/free-audit', priority: 0.9, freq: 'monthly', label: 'Free website & SEO audit', summary: 'Request a free audit of your website and Google presence' },
  { path: '/contact', priority: 0.8, freq: 'monthly', label: 'Contact', summary: 'Contact Pride Hire' },
  { path: '/privacy', priority: 0.3, freq: 'yearly', label: 'Privacy' },
  { path: '/terms', priority: 0.3, freq: 'yearly', label: 'Terms' },
];
