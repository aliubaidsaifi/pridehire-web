'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/track';

export default function PageTracking() {
  const fired = useRef({ s50: false, s90: false });
  const start = useRef(Date.now());

  useEffect(() => {
    start.current = Date.now();
    fired.current = { s50: false, s90: false };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = (doc.scrollTop + window.innerHeight) / doc.scrollHeight;
      if (!fired.current.s50 && scrolled >= 0.5) { fired.current.s50 = true; track('Scroll50'); }
      if (!fired.current.s90 && scrolled >= 0.9) { fired.current.s90 = true; track('Scroll90'); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onLeave = () => {
      const seconds = Math.round((Date.now() - start.current) / 1000);
      if (seconds > 2) track('TimeOnPage', { seconds });
    };
    window.addEventListener('pagehide', onLeave);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pagehide', onLeave);
    };
  }, []);

  return null;
}