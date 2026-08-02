import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE } from '@/lib/site';

export default function LpNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-xl">
      <div className="container-px flex h-18 items-center justify-between py-3">
        <Logo />
        <div className="flex items-center gap-3">
          <a href={`tel:${SITE.phone}`} className="hidden items-center gap-2 text-sm font-semibold text-ink sm:flex">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-accent"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Call us
          </a>
          <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2.5 text-sm">WhatsApp</a>
        </div>
      </div>
    </header>
  );
}