/**
 * OWNER action: approve reviewed text.
 *   node scripts/content-approve.js <pageId> --lang ar|en --by "Owner Name" [--field key]
 * Only fields that are currently "reviewed" (Arabic) or "draft"/"reviewed" (English) with text are promoted; Arabic text must have
 * been reviewed by a recorded native reviewer first. Approving does NOT publish: the licensing gate (content/sa/_gate.json) still applies.
 */
const C = require('../lib/content-review');
const a = process.argv.slice(2);
const flag = (n) => { const i = a.indexOf(n); return i >= 0 ? a[i + 1] : null; };
const market = flag('--market') || 'sa';
const id = a[0], lang = flag('--lang'), by = flag('--by'), only = flag('--field');
if (!id || !['en', 'ar'].includes(lang) || !by) { console.error('usage: content-approve <pageId> --lang en|ar --by "Name" [--field key]'); process.exit(1); }
const page = C.loadPage(id, market);
let n = 0;
for (const [key, f] of Object.entries(page.fields)) {
  if (only && key !== only) continue;
  const e = f[lang];
  if (!e || !e.text) continue;
  if (lang === 'ar' && e.reviewStatus !== 'reviewed') { console.warn(`${key}: Arabic is "${e.reviewStatus}" — needs the native reviewer first; skipped`); continue; }
  if (e.reviewStatus === 'approved') continue;
  e.reviewStatus = 'approved'; e.approvedBy = by; e.approvedAt = new Date().toISOString(); n++;
}
C.savePage(page);
console.log(`${id}/${lang}: ${n} field(s) approved by ${by}. Gate licensingCleared = ${C.loadGate(market).licensingCleared}`);
