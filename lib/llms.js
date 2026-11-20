// Generates /llms.txt and /llms-full.txt from the SAME data the site renders from (lib/site.js, lib/markets.js, lib/public-pages.js,
// content/blog, content/<market>), so they cannot drift. Plain markdown. EXPERIMENT: not described anywhere as a technique that works.
//
// Deliberately NOT included: portfolio projects/metrics, reviews, home-page FAQ and service 'outcome' marketing lines (unreviewed claims),
// the street address, the phone number (which number shows where is undecided), and any gated /sa or /in page until it is live.
import { SITE, SERVICES, LOCAL_PAGES } from '@/lib/site';
import { STATIC_PAGES } from '@/lib/public-pages';
import { getAllPosts } from '@/lib/blog';
import { ORG, MARKETS, COUNTRY_NAMES, absoluteUrl, getMarket } from '@/lib/markets';
import C from '@/lib/content-review';

const link = (label, path, summary) => `- [${label}](${absoluteUrl(path)})${summary ? `: ${summary}` : ''}`;

/** Gated market pages that are LIVE: market locale switched live AND page approved AND everything it links to is publishable. */
export function liveMarketPages() {
  const out = [];
  for (const m of C.MARKETS) {
    if (!MARKETS[m] || MARKETS[m].locales.en.live !== true) continue;
    for (const id of C.listPageIds(m)) {
      const page = C.loadPage(id, m);
      if (!C.langsOf(page).includes('en') || !C.isPublishable(page, 'en') || C.danglingLinks(page, 'en').length) continue;
      out.push({ market: m, path: page.paths.en, title: page.fields.h1.en.text, summary: page.fields['meta.description'].en.text });
    }
  }
  return out;
}

function servedMarkets() {
  return Object.values(MARKETS).filter((m) => m.serving && m.country).map((m) => {
    const name = COUNTRY_NAMES[m.country] || m.country;
    const cities = (m.serviceAreas || []).map((c) => c.name);
    return cities.length ? `${name} (${cities.join(', ')}, ${m.serviceAreas[0].region})` : name;
  });
}

function head() {
  return [
    `# ${ORG.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${ORG.name} is an Indian company. Website: ${absoluteUrl('/')}`,
    '',
  ];
}

function sectionsBase() {
  const pages = liveMarketPages();
  const nz = getMarket('nz').live ? LOCAL_PAGES : [];
  return { pages, nz, posts: getAllPosts() };
}

export function buildLlmsTxt() {
  const { pages, nz, posts } = sectionsBase();
  const L = [...head()];
  L.push('## Services', ...SERVICES.map((s) => link(s.title, `/services/${s.slug}`)), '');
  L.push('## Markets served', ...servedMarkets().map((m) => `- ${m}`), '');
  L.push('## Key pages', ...STATIC_PAGES.map((p) => link(p.label, p.path, p.summary)), '');
  if (pages.length) L.push('## Market pages', ...pages.map((p) => link(p.title, p.path, p.summary)), '');
  if (posts.length) L.push('## Blog', ...posts.map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt)), '');
  if (nz.length) L.push('## New Zealand (Auckland) pages', ...nz.map((p) => link(p.title, `/nz/${p.slug}`)), '');
  L.push('## Contact', `- Email: ${ORG.email}`, link('Contact page', '/contact'), link('Free website & SEO audit', '/free-audit'), '');
  return L.join('\n');
}

export function buildLlmsFullTxt() {
  const { pages, nz, posts } = sectionsBase();
  const L = [...head()];
  L.push('## Services', '');
  for (const s of SERVICES) {
    L.push(`### ${s.title}`, `URL: ${absoluteUrl(`/services/${s.slug}`)}`, ...(s.points || []).map((p) => `- ${p}`), '');
  }
  L.push('## Markets served', ...servedMarkets().map((m) => `- ${m}`), '');
  L.push('## Key pages', ...STATIC_PAGES.map((p) => link(p.label, p.path, p.summary)), '');
  if (pages.length) {
    L.push('## Market pages', '');
    for (const p of pages) L.push(`### ${p.title}`, `URL: ${absoluteUrl(p.path)}`, p.summary, '');
  }
  if (posts.length) {
    L.push('## Blog', '');
    for (const p of posts) L.push(`### ${p.title}`, `URL: ${absoluteUrl(`/blog/${p.slug}`)}`, `Published: ${p.date}${p.category ? ` · ${p.category}` : ''}`, p.excerpt || '', '');
  }
  if (nz.length) {
    L.push('## New Zealand (Auckland) pages', '');
    for (const p of nz) L.push(`### ${p.h1}`, `URL: ${absoluteUrl(`/nz/${p.slug}`)}`, p.intro, '');
  }
  L.push('## Contact', `- Email: ${ORG.email}`, link('Contact page', '/contact'), link('Free website & SEO audit', '/free-audit'), '');
  return L.join('\n');
}
