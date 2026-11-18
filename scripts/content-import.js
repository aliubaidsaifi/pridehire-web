/**
 * Import a reviewer's returned sheet.
 *   node scripts/content-import.js <pageId> <file.csv> --reviewer "Name"        (page sheet)
 *   node scripts/content-import.js --glossary <file.csv> --reviewer "Name"       (glossary sheet)
 * Page sheet: OK -> status reviewed; EDIT/REWRITE -> Arabic text replaced (old text kept in history), status reviewed.
 * This script NEVER sets "approved" — only the owner can (scripts/content-approve.js).
 */
const fs = require('node:fs');
const { parseCsv } = require('./csv');
const C = require('../lib/content-review');

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const reviewer = flag('--reviewer');
const market = flag('--market') || 'sa';
if (!reviewer) { console.error('--reviewer "Name" is required (the native reviewer is recorded)'); process.exit(1); }
const now = new Date().toISOString();

if (args[0] === '--glossary') {
  const rows = parseCsv(fs.readFileSync(args[1], 'utf8')).slice(1);
  const g = C.loadGlossary(market);
  let n = 0;
  for (const r of rows) {
    const t = g.terms.find((x) => x.key === r[0]);
    if (t && r[3].trim()) { t.decision = r[3].trim(); t.decidedBy = reviewer; t.decidedAt = now; if (r[4].trim()) t.note = r[4].trim(); n++; }
  }
  fs.writeFileSync(require('node:path').join(C.dirFor(market), '_glossary.json'), JSON.stringify(g, null, 2) + '\n', 'utf8');
  console.log(`glossary: ${n} decision(s) recorded`);
  process.exit(0);
}

const [id, file] = args;
const page = C.loadPage(id, market);
const rows = parseCsv(fs.readFileSync(file, 'utf8'));
const head = rows[0].map((h) => h.trim());
const col = (name) => head.findIndex((h) => h.toLowerCase().startsWith(name));
const iKey = col('key'), iVerdict = col('verdict'), iFix = col('corrected'), iNote = col('comment');
let ok = 0, edited = 0, skipped = 0;
for (const r of rows.slice(1)) {
  const f = page.fields[r[iKey]];
  const verdict = (r[iVerdict] || '').trim().toUpperCase();
  if (!f || !f.ar) { console.warn(`unknown key "${r[iKey]}" — skipped`); skipped++; continue; }
  if (!verdict) { skipped++; continue; }
  if (!['OK', 'EDIT', 'REWRITE'].includes(verdict)) { console.warn(`${r[iKey]}: unknown verdict "${verdict}" — skipped`); skipped++; continue; }
  const ar = f.ar;
  if (verdict !== 'OK') {
    const fix = (r[iFix] || '').trim();
    if (!fix) { console.warn(`${r[iKey]}: ${verdict} but no corrected Arabic — skipped`); skipped++; continue; }
    ar.history.push({ text: ar.text, replacedAt: now, by: reviewer });
    ar.text = fix; edited++;
  } else ok++;
  ar.reviewStatus = 'reviewed'; ar.reviewedBy = reviewer; ar.reviewedAt = now; ar.approvedBy = null; ar.approvedAt = null;
  if ((r[iNote] || '').trim()) ar.reviewerNote = r[iNote].trim();
}
C.savePage(page);
console.log(`${id}: ${ok} OK, ${edited} edited, ${skipped} skipped. Status is "reviewed" — the owner must still approve.`);
