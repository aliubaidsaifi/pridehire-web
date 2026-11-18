/**
 * Export a page (or all) to a reviewer pack in review-out/:  <id>.review.csv  +  REVIEW-GUIDE.md  (+ glossary.review.csv)
 *   node scripts/content-export.js hub        |   node scripts/content-export.js --all
 * Only fields that HAVE Arabic text are listed (null = section omitted, nothing to review).
 */
const fs = require('node:fs');
const path = require('node:path');
const { toCsv } = require('./csv');
const C = require('../lib/content-review');

const OUT = path.join(__dirname, '..', 'review-out');
const arg = process.argv[2];
const ids = arg === '--all' || !arg ? C.listPageIds() : [arg];
fs.mkdirSync(OUT, { recursive: true });

const GUIDE = `# Reviewer guide — Pride Hire Saudi pages

Thank you for reviewing. Pride Hire is an Indian company; these pages are written for businesses in Al Khobar, Dammam and Dhahran
(Eastern Province). The Arabic must read as if a Saudi professional wrote it — please do not just check that it is "correct".

## Your judgement overrules everything
The writer of the English text and of any Arabic draft is NOT a native speaker. Every Arabic draft, every suggested term and every
spelling candidate in the glossary comes from desk research and is UNVERIFIED. Please do not treat any of it as authoritative or
defer to it. If something sounds wrong to you, it is wrong — you do not need to justify it, and you do not need to be polite about it.
Change it, replace it, or tell us the whole approach is off.

## How to fill the sheet (*.review.csv — open in Excel, save as "CSV UTF-8")
- Do not edit the Key, Where it appears, English or Arabic (current) columns.
- Verdict:  OK  = use as is  |  EDIT = small fix  |  REWRITE = this should be written differently
- Corrected Arabic: for EDIT / REWRITE, put the full replacement text here (keep line breaks).
- Links: text like [words](/path) is a link. Keep the square brackets, round brackets and the /path exactly as they are; you may change the words inside the square brackets (and where the link starts and ends), or tell us the link should go on different words.
- Comment: anything we should know, including "this claim sounds like marketing hype".

## What to check (beyond translation accuracy)
1. Register: right level for a business owner reading about a service — not stiff newspaper MSA, not casual street dialect.
2. Dialect: would a person from the Eastern Province / Gulf read this naturally? Flag Egyptian or Levantine-sounding words.
3. Local voice: does it read like a local wrote it, or like a translation from English? Rewrite any sentence that feels translated.
4. Terminology: fill the glossary sheet once (SEO, Google Ads, ChatGPT, place names, "our partner in Al Khobar"). We follow your choices everywhere.
5. Latin script: which English terms should stay in Latin letters (e.g. SEO, Google Ads, ChatGPT) and which should be Arabic.
6. Spelling variants people actually search for (e.g. جوجل / قوقل; الخبر).
7. Cultural fit and tone: anything that sounds boastful, pushy, over-promising, or inappropriate. We make no guarantees of results.
8. Claims: we are an Indian company working with a partner in Al Khobar. Flag any phrase that suggests we have an office, a Saudi team, or Saudi clients.
9. Numbers, dates, punctuation: Arabic comma/quotation marks, Western vs Arabic-Indic digits (tell us which is normal for this audience), and mixed Arabic + Latin lines reading correctly.
10. Headline and title: would you click it? Suggest the wording people really search with.

Please return the sheet; we will import your corrections. Nothing is published until the owner approves it.
`;

for (const id of ids) {
  const page = C.loadPage(id);
  const rows = [['Key', 'Where it appears', 'English', 'Arabic (current)', 'Status', 'Verdict (OK / EDIT / REWRITE)', 'Corrected Arabic', 'Comment']];
  for (const [key, f] of Object.entries(page.fields)) {
    const ar = f.ar;
    if (!ar || ar.text === null || ar.text === '') continue;
    rows.push([key, f.context || '', (f.en && f.en.text) || '', ar.text, ar.reviewStatus, '', '', '']);
  }
  const file = path.join(OUT, `${id}.review.csv`);
  fs.writeFileSync(file, toCsv(rows), 'utf8');
  console.log(`${id}: ${rows.length - 1} Arabic field(s) -> ${path.relative(process.cwd(), file)}`);
}

const g = C.loadGlossary();
const grows = [['Key', 'English term', 'Candidates (UNVERIFIED - non-native desk research; you overrule all of them)', 'Your choice', 'Note / alternative']];
for (const t of g.terms) grows.push([t.key, t.en, t.candidates.join(' | '), t.decision || '', t.note || '']);
fs.writeFileSync(path.join(OUT, 'glossary.review.csv'), toCsv(grows), 'utf8');
fs.writeFileSync(path.join(OUT, 'REVIEW-GUIDE.md'), GUIDE, 'utf8');
console.log('glossary.review.csv + REVIEW-GUIDE.md written to review-out/');
