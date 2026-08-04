'use client';

import { useEffect } from 'react';
import { track } from '@/lib/track';

export default function PortfolioView({ slug, client }) {
  useEffect(() => {
    track('PortfolioView', { label: client || slug, slug });
  }, [slug, client]);
  return null;
}