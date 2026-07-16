'use client';

import { useState } from 'react';

const ICONS = {
  x: <path d="M18.9 2H22l-7 8 8.2 12h-6.4l-5-7.3L5.9 22H2.7l7.5-8.6L2.3 2h6.6l4.5 6.6L18.9 2zm-1.1 18h1.8L7.4 3.9H5.5L17.8 20z" />,
  linkedin: <path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.5 8.5h3.9V21H3.5zM10 8.5h3.7v1.7h.05c.52-.98 1.8-2 3.7-2 3.95 0 4.68 2.6 4.68 6V21h-3.9v-5.3c0-1.26-.02-2.9-1.76-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10z" />,
  facebook: <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />,
  whatsapp: <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z M12 3.8a8.2 8.2 0 016.6 13l.2.3-.9 3.1-3.2-.8-.3.2A8.2 8.2 0 013.8 12 8.2 8.2 0 0112 3.8z" />,
};

export default function ShareLinks({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const url = `https://pridehire.com/blog/${slug}`;
  const t = encodeURIComponent(title);
  const u = encodeURIComponent(url);

  const links = [
    { k: 'x', label: 'Share on X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { k: 'linkedin', label: 'Share on LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { k: 'facebook', label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { k: 'whatsapp', label: 'Share on WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  return (
    <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-8">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Share</span>
      <div className="flex gap-2.5">
        {links.map((l) => (
          <a key={l.k} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">{ICONS[l.k]}</svg>
          </a>
        ))}
        <button type="button" onClick={copy} aria-label="Copy link"
          className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${copied ? 'border-transparent bg-accent text-white' : 'border-line text-ink hover:bg-ink hover:text-white'}`}>
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className="h-4 w-4"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </button>
      </div>
      {copied && <span className="text-sm text-accent">Link copied</span>}
    </div>
  );
}