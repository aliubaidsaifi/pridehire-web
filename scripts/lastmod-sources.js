// Which source files make up each URL. Shared by scripts/lastmod.js (writes dates) and scripts/check-lastmod.js (build-time report).
const NZ = ['web-design-auckland', 'seo-auckland', 'google-ads-auckland', 'meta-ads-auckland', 'ecommerce-auckland'];
const SERVICES = ['website-development', 'graphic-design', 'business-automation', 'meta-ads', 'google-ads', 'seo'];
const PROJECTS = ['modora-elan', 'salonflow', 'auckland-plumbing', 'smile-dental', 'north-shore-roofing', 'coastal-electric'];
const DATA = 'lib/site.js';
const G = 'app/(global)';

const SOURCES = {
  '/': [`${G}/page.js`, 'components/Hero.js', 'components/Services.js', 'components/WhyUs.js', 'components/Reviews.js', 'components/PortfolioPreview.js', 'components/BlogPreview.js', 'components/AuditCTA.js', 'components/TrustStats.js', 'components/ClientMarquee.js', DATA],
  '/about': [`${G}/about/page.js`, 'components/CompanyMedia.js'],
  '/services': [`${G}/services/page.js`, 'components/ServicesList.js', DATA],
  '/portfolio': [`${G}/portfolio/page.js`, 'components/PortfolioGrid.js', DATA],
  '/blog': [`${G}/blog/page.js`, 'components/BlogGrid.js'],
  '/contact': [`${G}/contact/page.js`, 'components/ContactClient.js'],
  '/free-audit': [`${G}/free-audit/page.js`, 'components/FreeAuditClient.js'],
  '/privacy': [`${G}/privacy/page.js`],
  '/terms': [`${G}/terms/page.js`],
};
for (const s of SERVICES) SOURCES[`/services/${s}`] = [`${G}/services/[slug]/page.js`, DATA];
for (const s of PROJECTS) SOURCES[`/portfolio/${s}`] = [`${G}/portfolio/[slug]/page.js`, DATA];
for (const s of NZ) SOURCES[`/nz/${s}`] = [`app/nz/${s}/page.js`, 'components/LocalPage.js', DATA];

module.exports = { SOURCES };
