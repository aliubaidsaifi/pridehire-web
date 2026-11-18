/** Validate every content/sa/*.json page. Exit 1 on errors. Also reports publish readiness (informational).  npm run content:check */
const C = require('../lib/content-review');
let bad = 0;
const gate = C.loadGate();
if (gate.error) console.log(`WARNING gate problem: ${gate.error} — treated as CLOSED`);
console.log(`licensing gate: ${gate.licensingCleared ? 'OPEN' : 'CLOSED — nothing under /sa/ may be served'}`);
for (const id of C.listPageIds()) {
  const page = C.loadPage(id);
  const { errors, warnings } = C.validatePage(page);
  const counts = { en: {}, ar: {} };
  for (const lang of C.LANGS) for (const f of Object.values(page.fields)) { const e = f[lang]; const k = e && e.text ? e.reviewStatus : 'empty'; counts[lang][k] = (counts[lang][k] || 0) + 1; }
  console.log(`\n${id}  (${page.paths.en} / ${page.paths.ar})  en ${JSON.stringify(counts.en)}  ar ${JSON.stringify(counts.ar)}`);
  for (const l of C.LANGS) console.log(`  ${l}: publishable=${C.isPublishable(page, l)}${C.isPublishable(page, l) ? '' : `  (${C.publishProblems(page, l).length} blocker(s)${gate.licensingCleared ? '' : ' + licensing gate'})`}`);
  warnings.forEach((w) => console.log(`  warn  ${w}`));
  errors.forEach((e) => { console.log(`  ERROR ${e}`); bad++; });
}
process.exit(bad ? 1 : 0);
