'use client';

import { track } from '@/lib/track';

export default function TrackedLink({ event, params = {}, children, ...props }) {
  return (
    <a {...props} onClick={() => { try { track(event, params); } catch {} }}>
      {children}
    </a>
  );
}