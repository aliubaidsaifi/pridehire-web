import { CANONICAL_HOST } from '@/lib/markets';

// No `Host:` directive (non-standard, ignored by Google).
// AI crawlers are named and explicitly ALLOWED. A named group REPLACES the `*` group for that crawler, so each repeats the same
// disallows (private landing pages and the API). Several tokens are control tokens for training use, not fetch user-agents
// (Google-Extended, Applebot-Extended); allowing them is an owner decision and is easy to flip here.
const DISALLOW = ['/lp/', '/api/'];
const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', // OpenAI: training / search / user-initiated
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', // Anthropic: training / search / user-initiated
  'PerplexityBot', 'Perplexity-User', // Perplexity: search / user-initiated
  'Google-Extended', // Google: control token for Gemini training/grounding (not a crawler UA)
  'Bingbot', 'Amazonbot', 'Applebot-Extended', 'CCBot', 'meta-externalagent',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: `${CANONICAL_HOST}/sitemap.xml`,
  };
}
