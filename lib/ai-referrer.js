/**
 * INTERNAL measurement only — for our own data on how AI assistants send visitors to pridehire.com.
 * It is NOT a client service and must never be mentioned on any page.
 *
 * Detects a visit that arrived from an AI assistant, from the referrer host or from utm_source (ChatGPT appends utm_source=chatgpt.com).
 * Limits: many assistants (apps, in-app browsers, copy-pasted links) send NO referrer, so this under-counts. It counts visits, not mentions.
 */
export const AI_SOURCES = [
  { source: 'chatgpt', hosts: ['chatgpt.com', 'chat.openai.com'], utm: ['chatgpt.com', 'chatgpt'] },
  { source: 'perplexity', hosts: ['perplexity.ai'], utm: ['perplexity.ai', 'perplexity'] },
  { source: 'gemini', hosts: ['gemini.google.com'], utm: ['gemini.google.com', 'gemini'] },
  { source: 'copilot', hosts: ['copilot.microsoft.com'], utm: ['copilot.microsoft.com', 'copilot'] },
  { source: 'claude', hosts: ['claude.ai'], utm: ['claude.ai', 'claude'] },
];

/** Bump if the detection rules change, so before/after periods can be told apart in reports. */
export const AI_TRACKING_VERSION = 1;

const hostMatches = (host, h) => host === h || host.endsWith(`.${h}`);

/** @returns {{source: string, via: 'referrer'|'utm'} | null} */
export function detectAiReferrer({ referrer = '', search = '' } = {}) {
  let host = '';
  try { host = referrer ? new URL(referrer).hostname.toLowerCase() : ''; } catch { host = ''; }
  if (host) {
    for (const s of AI_SOURCES) if (s.hosts.some((h) => hostMatches(host, h))) return { source: s.source, via: 'referrer' };
  }
  let utm = '';
  try { utm = (new URLSearchParams(search).get('utm_source') || '').toLowerCase(); } catch { utm = ''; }
  if (utm) {
    for (const s of AI_SOURCES) if (s.utm.includes(utm)) return { source: s.source, via: 'utm' };
  }
  return null;
}
