'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { NAV, SERVICES, SITE } from '@/lib/site';

function ServicesDropdown() {
  return (
    <div role="menu" className="invisible absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,640px)] -translate-x-1/2 translate-y-1 rounded-3xl border border-line bg-white p-3 opacity-0 shadow-lift transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="grid gap-1.5 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services#${s.slug}`} className="rounded-2xl p-4 transition-colors hover:bg-paper">
            <div className="font-display text-sm font-semibold text-ink">{s.title}</div>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.outcome}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-all duration-300 ${scrolled ? 'border-b border-line bg-white/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'}`}>
        <nav className="container-px flex h-20 items-center justify-between">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.href} className={item.hasDropdown ? 'group relative' : ''}>
                <Link href={item.href} className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink">
                  {item.label}
                </Link>
                {item.hasDropdown && <ServicesDropdown />}
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link href="/free-audit" className="btn-primary">{SITE.cta.primary}</Link>
          </div>

          <button type="button" onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 block h-0.5 w-4 bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-ink transition-all ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 block h-0.5 w-4 bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </nav>
      </div>

      <div className={`lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`container-px overflow-hidden border-b border-line bg-white transition-all duration-300 ${open ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-medium text-ink/80 hover:bg-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/free-audit" onClick={() => setOpen(false)} className="btn-primary w-full">{SITE.cta.primary}</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}