'use client';

import { useEffect } from 'react';
import { rememberMarket } from '@/lib/lead-market';

// Invisible. Remembers (per tab session) that this visitor is browsing a /sa or /in page, for lead attribution only.
export default function MarketBeacon({ market }) {
  useEffect(() => { rememberMarket(market); }, [market]);
  return null;
}
