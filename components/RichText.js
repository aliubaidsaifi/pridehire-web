import Link from 'next/link';

// Renders copy that contains [label](/internal/path) links (the format used in content/*.json). Internal paths only.
const RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export default function RichText({ text, linkClassName = 'text-ink underline decoration-line underline-offset-4 hover:decoration-ink' }) {
  const out = [];
  let last = 0;
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<Link key={m.index} href={m[2]} className={linkClassName}>{m[1]}</Link>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
