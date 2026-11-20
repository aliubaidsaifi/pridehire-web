import { buildLlmsFullTxt } from '@/lib/llms';

export const dynamic = 'force-static';

// Experiment (see lib/llms.js). Generated from site data at build time.
export function GET() {
  return new Response(buildLlmsFullTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
