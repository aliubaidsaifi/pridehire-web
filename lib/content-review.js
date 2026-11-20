/**
 * Page content + review workflow (CommonJS so both Next and node scripts can use it).
 *
 * Data lives in content/<market>/<page>.json (markets: 'sa', 'in'). One file per page; every field carries each language the page
 * declares (page.langs, default ['en','ar']), each with its own review state.
 *   text === null   -> the section is OMITTED (we leave a section out rather than fill it with filler or unsupported proof)
 *   needs           -> optional note on a null field saying what the OWNER must supply (e.g. real prices). A required field that is
 *                      empty blocks publishing, so a page cannot ship with a hole in it.
 *   reviewStatus    draft -> reviewed -> approved. Only the OWNER moves reviewed -> approved (scripts/content-approve.js).
 * Nothing is publishable unless (1) content/<market>/_gate.json has licensingCleared:true (missing/malformed = closed) AND (2) every
 * filled field of the page is approved in that language. Routes must call isPublishable() before rendering.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.env.PH_CONTENT_ROOT || path.join(/*turbopackIgnore: true*/ __dirname, '..', 'content'); // env override exists for tests only
const MARKETS = ['sa', 'in'];
const DIR = path.join(ROOT, 'sa'); // legacy export: the Saudi directory
const STATUSES = ['draft', 'reviewed', 'approved'];
const LANGS = ['en', 'ar'];

const dirFor = (market = 'sa') => path.join(ROOT, market);
const readJson = (f) => JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ f, 'utf8'));
const pageFile = (id, market = 'sa') => path.join(dirFor(market), `${id}.json`);
const listPageIds = (market = 'sa') => (fs.existsSync(/*turbopackIgnore: true*/ dirFor(market)) ? fs.readdirSync(/*turbopackIgnore: true*/ dirFor(market)) : []).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => f.replace(/\.json$/, ''));
const loadPage = (id, market = 'sa') => readJson(pageFile(id, market));
const savePage = (page) => fs.writeFileSync(/*turbopackIgnore: true*/ pageFile(page.id, page.market || 'sa'), JSON.stringify(page, null, 2) + '\n', 'utf8');
const langsOf = (page) => page.langs || LANGS;

/** Gate state. A missing or malformed gate file is NEVER "cleared": any failure to read it yields { licensingCleared: false, error }. */
const loadGate = (market = 'sa') => {
  try {
    const g = readJson(path.join(dirFor(market), '_gate.json'));
    if (!g || typeof g !== 'object' || typeof g.licensingCleared !== 'boolean') return { licensingCleared: false, error: '_gate.json is malformed (licensingCleared must be a boolean)' };
    return g;
  } catch (e) {
    return { licensingCleared: false, error: `_gate.json unreadable: ${e.code || e.message}` };
  }
};
const loadBlocklist = (market = 'sa') => readJson(path.join(dirFor(market), '_blocklist.json'));
const loadGlossary = (market = 'sa') => readJson(path.join(dirFor(market), '_glossary.json'));

/** A blank per-language entry. */
const blankEntry = () => ({ text: null, reviewStatus: 'draft', reviewedBy: null, reviewedAt: null, approvedBy: null, approvedAt: null, reviewerNote: null, sources: [], history: [] });

/** Fields whose text is non-null for a language. */
const filledFields = (page, lang) => Object.entries(page.fields).filter(([, f]) => f[lang] && f[lang].text !== null && f[lang].text !== '');

/**
 * Inline links inside copy use [label](/path). Internal paths only. The renderer turns them into <Link>.
 * Valid targets: static site paths, /services/<slug>, and the path of any page defined under content/*.
 * Arabic text must link to the Arabic equivalents of /sa pages (ARABIC_EQUIV), never to the English /sa pages.
 */
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
const stripLinks = (t) => t.replace(LINK_RE, '$1');
const extractLinks = (t) => [...t.matchAll(LINK_RE)].map((m) => ({ label: m[1], href: m[2] }));
const STATIC_PATHS = ['/free-audit', '/contact'];
const ARABIC_EQUIV = { '/sa': '/sa/ar', '/sa/ai-visibility': '/sa/ar/ai-visibility' };
function serviceSlugs() {
  try {
    const src = fs.readFileSync(path.join(/*turbopackIgnore: true*/ __dirname, 'site.js'), 'utf8');
    const block = src.slice(src.indexOf('export const SERVICES'), src.indexOf('];', src.indexOf('export const SERVICES')));
    return [...block.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]);
  } catch { return []; }
}
/** Every page path defined in any content/<market>/ folder. */
function contentPaths() {
  const out = new Set();
  for (const m of MARKETS) for (const id of listPageIds(m)) { try { Object.values(loadPage(id, m).paths || {}).forEach((p) => out.add(p)); } catch { /* ignore unreadable */ } }
  return out;
}
function linkProblems(text, lang) {
  const out = [];
  const slugs = serviceSlugs();
  const known = contentPaths();
  if (!slugs.length) out.push('could not read SERVICES slugs from lib/site.js to validate links');
  for (const { href } of extractLinks(text)) {
    const ok = STATIC_PATHS.includes(href) || known.has(href) || (href.startsWith('/services/') && slugs.includes(href.slice('/services/'.length)));
    if (!ok) out.push(`link to unknown internal path ${href}`);
    if (lang === 'ar' && ARABIC_EQUIV[href]) out.push(`Arabic text links to English page ${href} — use ${ARABIC_EQUIV[href]}`);
    if (lang === 'en' && href.startsWith('/sa/ar')) out.push(`English text links to Arabic page ${href}`);
  }
  return out;
}

/** Problems that make a page structurally wrong (always errors) vs soft warnings. */
function validatePage(page) {
  const errors = [];
  const warnings = [];
  const langs = langsOf(page);
  const block = loadBlocklist(page.market || 'sa');
  if (!page.id || !page.paths || langs.some((l) => !page.paths[l])) errors.push(`page needs id and a path for each of: ${langs.join(', ')}`);
  for (const [key, f] of Object.entries(page.fields || {})) {
    for (const lang of langs) {
      const e = f[lang];
      if (!e) { errors.push(`${key}: missing "${lang}" entry`); continue; }
      if (!STATUSES.includes(e.reviewStatus)) errors.push(`${key}.${lang}: invalid reviewStatus "${e.reviewStatus}"`);
      const t = e.text;
      if (t === null || t === undefined || t === '') {
        if (e.reviewStatus !== 'draft') errors.push(`${key}.${lang}: empty text cannot be ${e.reviewStatus}`);
        continue;
      }
      if (/TODO|FIXME|<FILL/i.test(t)) errors.push(`${key}.${lang}: contains a TODO / FILL marker`);
      if (e.reviewStatus === 'approved' && (!e.approvedBy || !e.approvedAt)) errors.push(`${key}.${lang}: approved without approvedBy/approvedAt`);
      if (e.reviewStatus !== 'draft' && lang === 'ar' && (!e.reviewedBy || !e.reviewedAt)) errors.push(`${key}.ar: ${e.reviewStatus} without reviewedBy/reviewedAt (a native reviewer must be recorded)`);
      if (e.reviewStatus === 'approved' && lang === 'ar' && !/[؀-ۿ]/.test(t)) errors.push(`${key}.ar: approved text contains no Arabic letters`);
      for (const lp of linkProblems(t, lang)) errors.push(`${key}.${lang}: ${lp}`);
      for (const pat of block.patterns || []) {
        if (new RegExp(pat.regex, 'i').test(stripLinks(t))) errors.push(`${key}.${lang}: blocked content (${pat.reason}) — matched /${pat.regex}/`);
      }
      // A figure needs a cited source. Heuristic: a percentage or a 3+ digit/ currency-looking number with no sources[]
      if (/\d+\s?%|\b\d{3,}\b|[٠-٩]{2,}|₹\s?\d/.test(t) && (!e.sources || e.sources.length === 0)) warnings.push(`${key}.${lang}: contains a number/percentage/price but no sources[] — cite a real source or remove it`);
      if (f.words) {
        const n = stripLinks(t).trim().split(/\s+/).length;
        if (n < f.words[0] || n > f.words[1]) (lang === 'en' ? errors : warnings).push(`${key}.${lang}: ${n} words (must be ${f.words[0]}-${f.words[1]})`);
      }
      if (key === 'meta.title' && t.length > 65) warnings.push(`${key}.${lang}: ${t.length} chars (aim <= 60)`);
      if (key === 'meta.description' && t.length > 165) warnings.push(`${key}.${lang}: ${t.length} chars (aim <= 160)`);
    }
  }
  return { errors, warnings };
}

/** Fields a page must have (non-null, approved) in a language before it can ship. */
function publishProblems(page, lang) {
  const problems = [];
  for (const [key, f] of Object.entries(page.fields)) {
    const e = f[lang];
    const filled = e && e.text !== null && e.text !== '';
    if (f.required && !filled) problems.push(`${key} (required) is empty${f.needs ? ` — needs: ${f.needs}` : ''}`);
    if (filled && e.reviewStatus !== 'approved') problems.push(`${key} is ${e.reviewStatus}, not approved`);
  }
  return problems;
}

/** True only when the market's gate is open AND every filled field of the page is approved in `lang`. */
function isPublishable(page, lang) {
  const gate = loadGate(page.market || 'sa');
  if (gate.error || gate.licensingCleared !== true) return false; // fail closed
  return publishProblems(page, lang).length === 0;
}

/** Content-page links in `page` (language `lang`) whose target page is not publishable — linking to these would be a dead link. */
function danglingLinks(page, lang) {
  const targets = [];
  for (const m of MARKETS) for (const id of listPageIds(m)) { try { targets.push(loadPage(id, m)); } catch { /* ignore */ } }
  const out = new Set();
  for (const [, f] of filledFields(page, lang)) {
    for (const { href } of extractLinks(f[lang].text)) {
      const t = targets.find((x) => x.paths && x.paths[lang] === href);
      if (t && !(t.id === page.id && (t.market || 'sa') === (page.market || 'sa')) && !isPublishable(t, lang)) out.add(href);
    }
  }
  return [...out];
}

module.exports = { danglingLinks, stripLinks, extractLinks, linkProblems, DIR, ROOT, MARKETS, STATUSES, LANGS, langsOf, dirFor, listPageIds, loadPage, savePage, loadGate, loadBlocklist, loadGlossary, blankEntry, filledFields, validatePage, publishProblems, isPublishable };
