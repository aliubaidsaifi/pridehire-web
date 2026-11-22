import Link from 'next/link';

// Renders copy that contains [label](/internal/path) or [label](https://…) links (the format used in content/*.json).
// Internal paths use next/link. External https links are only ever SFDA's own domains (enforced by lib/content-review.js)
// and render as ordinary links that open in a new tab with rel="noopener noreferrer".
const RE = /\[([^\]]+)\]\((\/[^)\s]*|https:\/\/[^)\s]+)\)/g;

export default function RichText({ text, linkClassName = 'text-ink underline decoration-line underline-offset-4 hover:decoration-ink' }) {
  const out = [];
  let last = 0;
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[2].startsWith('/')) out.push(<Link key={m.index} href={m[2]} className={linkClassName}>{m[1]}</Link>);
    else out.push(<a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer" className={linkClassName}>{m[1]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
