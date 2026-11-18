/**
 * Bilingual page content + review workflow (CommonJS so both Next and node scripts can use it).
 *
 * Data lives in content/sa/<page>.json — one file per page, EVERY field carries both languages, each with its own review state.
 *   text === null   -> the section is OMITTED (we leave a section out rather than fill it with filler or unsupported proof)
 *   reviewStatus    draft -> reviewed -> approved. Only the OWNER moves reviewed -> approved (scripts/content-approve.js).
 * Nothing is publishable unless (1) content/sa/_gate.json has licensingCleared:true AND (2) every field of the page is
 * approved in that language. Routes must call isPublishable() before rendering; until then /sa/* must not exist in production.
 */
const fs = require('node:fs');
const path = require('node:path');

const DIR = path.join(__dirname, '..', 'content', 'sa');
const STATUSES = ['draft', 'reviewed', 'approved'];
const LANGS = ['en', 'ar'];

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const pageFile = (id) => path.join(DIR, `${id}.json`);
const listPageIds = () => fs.readdirSync(DIR).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => f.replace(/\.json$/, ''));
const loadPage = (id) => readJson(pageFile(id));
const savePage = (page) => fs.writeFileSync(pageFile(page.id), JSON.stringify(page, null, 2) + '\n', 'utf8');
/** Gate state. A missing or malformed gate file is NEVER "cleared": any failure to read it yields { licensingCleared: false, error }. */
const loadGate = () => {
  try {
    const g = readJson(path.join(DIR, '_gate.json'));
    if (!g || typeof g !== 'object' || typeof g.licensingCleared !== 'boolean') return { licensingCleared: false, error: '_gate.json is malformed (licensingCleared must be a boolean)' };
    return g;
  } catch (e) {
    return { licensingCleared: false, error: `_gate.json unreadable: ${e.code || e.message}` };
  }
};
const loadBlocklist = () => readJson(path.join(DIR, '_blocklist.json'));
const loadGlossary = () => readJson(path.join(DIR, '_glossary.json'));

/** A blank per-language entry. */
const blankEntry = () => ({ text: null, reviewStatus: 'draft', reviewedBy: null, reviewedAt: null, approvedBy: null, approvedAt: null, reviewerNote: null, sources: [], history: [] });

/** Fields whose text is non-null for a language. */
const filledFields = (page, lang) => Object.entries(page.fields).filter(([, f]) => f[lang] && f[lang].text !== null && f[lang].text !== '');

/** Problems that make a page structurally wrong (always errors) vs soft warnings. */
function validatePage(page) {
  const errors = [];
  const warnings = [];
  const block = loadBlocklist();
  if (!page.id || !page.paths || !page.paths.en || !page.paths.ar) errors.push('page needs id and paths.en / paths.ar');
  for (const [key, f] of Object.entries(page.fields || {})) {
    for (const lang of LANGS) {
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
      for (const pat of block.patterns || []) {
        if (new RegExp(pat.regex, 'i').test(t)) errors.push(`${key}.${lang}: blocked content (${pat.reason}) — matched /${pat.regex}/`);
      }
      // A figure needs a cited source. Heuristic: a percentage or a 3+ digit/ currency-looking number with no sources[]
      if (/\d+\s?%|\b\d{3,}\b|[٠-٩]{2,}/.test(t) && (!e.sources || e.sources.length === 0)) warnings.push(`${key}.${lang}: contains a number/percentage but no sources[] — cite a real source or remove it`);
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
    if (f.required && !filled) problems.push(`${key} (required) is empty`);
    if (filled && e.reviewStatus !== 'approved') problems.push(`${key} is ${e.reviewStatus}, not approved`);
  }
  return problems;
}

/** True only when the licensing gate is open AND every filled field of the page is approved in `lang`. */
function isPublishable(page, lang) {
  const gate = loadGate();
  if (gate.error || gate.licensingCleared !== true) return false; // fail closed
  return publishProblems(page, lang).length === 0;
}

module.exports = { DIR, STATUSES, LANGS, listPageIds, loadPage, savePage, loadGate, loadBlocklist, loadGlossary, blankEntry, filledFields, validatePage, publishProblems, isPublishable };
