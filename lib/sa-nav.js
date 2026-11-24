// Saudi navbar / footer data. On /sa/* the nav shows ONLY the Saudi service set and links only to /sa/ pages (never /services/*, which carry +91 links).
// An item appears only if its page can render in this environment (dev: drafts too; production: approved + gate open), so the nav never links to a 404.
// Labels come from each page's `nav.label` field (reviewed with the page); a missing label drops the item.
import { loadRenderablePage, pageStrings } from './market-pages.js';

const SERVICE_IDS = ['web-development', 'restaurant-digital-menu', 'business-automation', 'graphic-design']; // order = order in the navbar, the hub cards and the 'next service' links
const strings = (id, lang) => { const p = loadRenderablePage('sa', id, lang); return p ? { page: p, s: pageStrings(p, lang) } : null; };

// Language switch: every Saudi page that renders in BOTH languages, as { en: path, ar: path }. The navbar swaps to the same page in the other language
// (and falls back to the other language's home when the current page has no counterpart). The label is each language's own name, shown in that language.
const ARTICLE_IDS = ['sfda-menu-labelling', 'ai-visibility']; // pages listed on the Saudi blog index
const PAGE_IDS = ['hub', 'about', 'blog', ...SERVICE_IDS, 'contact', 'free-audit', ...ARTICLE_IDS];
const LANG_LABEL = { en: 'English', ar: 'العربية' };
function langSwitch(lang) {
  const other = lang === 'ar' ? 'en' : 'ar';
  const pairs = [];
  for (const id of PAGE_IDS) {
    const a = loadRenderablePage('sa', id, 'en');
    const b = loadRenderablePage('sa', id, 'ar');
    if (a && b) pairs.push({ en: a.paths.en, ar: b.paths.ar });
  }
  const home = pairs.find((p) => p.en === '/sa');
  if (!home) return null; // the other language's home is not renderable: no switch (never a link to a 404)
  return { label: LANG_LABEL[other], lang: other, home: home[other], pairs };
}

export function saNav(lang = 'en') {
  const hub = strings('hub', lang);
  const contact = strings('contact', lang);
  const audit = strings('free-audit', lang);
  const company = strings('about', lang);
  const blog = strings('blog', lang);
  const articles = ARTICLE_IDS.map((id) => {
    const r = strings(id, lang);
    return r && r.s.h1 ? { id, label: r.s.h1, href: r.page.paths[lang], desc: r.s['meta.description'] || null } : null;
  }).filter(Boolean);
  const items = SERVICE_IDS.map((id) => {
    const r = strings(id, lang);
    return r && r.s['nav.label'] ? { id, label: r.s['nav.label'], href: r.page.paths[lang], desc: r.s['meta.description'] || null } : null;
  }).filter(Boolean);
  return {
    lang,
    switch: langSwitch(lang),
    homeHref: lang === 'ar' ? '/sa/ar' : '/sa',
    company: company && company.s['nav.label'] ? { label: company.s['nav.label'], href: company.page.paths[lang] } : null,
    blog: blog && blog.s['nav.label'] && articles.length ? { label: blog.s['nav.label'], href: blog.page.paths[lang] } : null,
    articles,
    services: hub && hub.s['nav.services'] ? { label: hub.s['nav.services'], href: hub.page.paths[lang] } : null,
    items,
    contact: contact && contact.s['nav.label'] ? { label: contact.s['nav.label'], href: contact.page.paths[lang] } : null,
    cta: audit && audit.s['nav.cta'] ? { label: audit.s['nav.cta'], href: audit.page.paths[lang] } : null,
  };
}

/** Footer + cookie-banner labels (content/sa/footer.json) in `lang`, or {} when that page is not renderable here (the components fall back to English). */
export function saFooterStrings(lang = 'en') {
  const r = strings('footer', lang);
  return r ? r.s : {};
}
