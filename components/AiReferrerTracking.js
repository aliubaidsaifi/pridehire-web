'use client';

import { useEffect } from 'react';
import { track } from '@/lib/track';
import { detectAiReferrer, AI_TRACKING_VERSION } from '@/lib/ai-referrer';

/**
 * Internal instrumentation (renders nothing). On the landing page of a session, if the visit came from an AI assistant,
 * push ONE `AiReferral` event to the dataLayer (GTM/GA) via the existing track() helper. Same rules as the other events here:
 * consent handling stays in GTM. Not mentioned on any page and not a client service.
 */
export default function AiReferrerTracking() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('ph-ai-ref')) return; // once per session
      sessionStorage.setItem('ph-ai-ref', '1'); // set first: only the landing page of a session is attributed
    } catch { /* storage blocked: still evaluate once per page load */ }
    const hit = detectAiReferrer({ referrer: document.referrer, search: window.location.search });
    if (hit) track('AiReferral', { ai_source: hit.source, ai_detect: hit.via, landing_path: window.location.pathname, tracking_version: AI_TRACKING_VERSION });
  }, []);
  return null;
}
