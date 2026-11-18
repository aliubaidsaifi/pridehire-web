// Minimal RFC-4180 CSV writer/parser (no dependency). Writes UTF-8 WITH BOM so Excel opens Arabic correctly.
const BOM = '﻿';
const cell = (v) => `"${String(v === null || v === undefined ? '' : v).replace(/"/g, '""')}"`;
const toCsv = (rows) => BOM + rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';

/** Parse CSV text (handles quoted newlines, BOM, and a ; delimiter as saved by some Excel locales). */
function parseCsv(text) {
  text = text.replace(/^﻿/, '');
  const first = text.split(/\r?\n/)[0] || '';
  const delim = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ';' : ',';
  const rows = [];
  let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c;
    } else if (c === '"') q = true;
    else if (c === delim) { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); cur = ''; if (row.some((x) => x !== '')) rows.push(row); row = []; }
    else cur += c;
  }
  if (cur !== '' || row.length) { row.push(cur); if (row.some((x) => x !== '')) rows.push(row); }
  return rows;
}
module.exports = { toCsv, parseCsv };
