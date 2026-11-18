/** Validate every content/<market>/*.json page. Exit 1 on errors. Also reports publish readiness (informational).  npm run content:check */
const C = require('../lib/content-review');
let bad = 0;
for (const market of C.MARKETS) {
  const ids = C.listPageIds(market);
  if (!ids.length) continue;
  const gate = C.loadGate(market);
  console.log(`\n=== market: ${market} ===`);
  if (gate.error) console.log(`WARNING gate problem: ${gate.error} — treated as CLOSED`);
  console.log(`gate: ${gate.licensingCleared ? 'OPEN' : 'CLOSED — nothing for this market may be served'}`);
  for (const id of ids) {
    const page = C.loadPage(id, market);
    const langs = C.langsOf(page);
    const { errors, warnings } = C.validatePage(page);
    const counts = Object.fromEntries(langs.map((l) => [l, {}]));
    for (const lang of langs) for (const f of Object.values(page.fields)) { const e = f[lang]; const k = e && e.text ? e.reviewStatus : 'empty'; counts[lang][k] = (counts[lang][k] || 0) + 1; }
    console.log(`\n${id}  (${langs.map((l) => page.paths[l]).join(' / ')})  ${langs.map((l) => `${l} ${JSON.stringify(counts[l])}`).join('  ')}`);
    for (const l of langs) {
      const pub = C.isPublishable(page, l);
      const probs = C.publishProblems(page, l);
      console.log(`  ${l}: publishable=${pub}${pub ? '' : `  (${probs.length} blocker(s)${gate.licensingCleared ? '' : ' + gate closed'})`}`);
      probs.filter((p) => p.includes('needs:')).forEach((p) => console.log(`      owner input: ${p}`));
    }
    warnings.forEach((w) => console.log(`  warn  ${w}`));
    errors.forEach((e) => { console.log(`  ERROR ${e}`); bad++; });
  }
}
process.exit(bad ? 1 : 0);
