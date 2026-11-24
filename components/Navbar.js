'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { NAV, SERVICES, SITE } from '@/lib/site';

function Chevron({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${className}`}>
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// items: [{ href, label, desc? }] — the global service list, or (Saudi pages) the Saudi service pages.
function ServicesDropdown({ items }) {
  return (
    <div role="menu" className="invisible absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,640px)] -translate-x-1/2 translate-y-1 rounded-3xl border border-line bg-white p-3 opacity-0 shadow-lift transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
      <div className="grid gap-1.5 sm:grid-cols-2">
        {items.map((s) => (
          <Link key={s.href} href={s.href} className="rounded-2xl p-4 transition-colors hover:bg-paper">
            <div className="font-display text-sm font-semibold text-ink">{s.label}</div>
            {s.desc && <p className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Language switch (Saudi pages): same page in the other language, else the other language's home.
function LangSwitch({ sw, className = '', onClick }) {
  const pathname = usePathname() || '';
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  const pair = sw.pairs.find((p) => p.en === clean || p.ar === clean);
  const href = pair ? pair[sw.lang] : sw.home;
  return (
    <Link href={href} hrefLang={sw.lang === 'ar' ? 'ar-SA' : 'en-SA'} lang={sw.lang} onClick={onClick} prefetch={false}
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink/30 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-accent" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" strokeLinecap="round" /></svg>
      {sw.label}
    </Link>
  );
}

// On Saudi pages the audit and contact links go to the Saudi (+966 only) pages.
const SA_PATHS = { '/free-audit': '/sa/free-audit', '/contact': '/sa/contact' };

// saNav (Saudi pages only, from lib/sa-nav.js): the Saudi service set, linking only to /sa pages. The global site uses NAV + SERVICES.
export default function Navbar({ market = 'global', saNav = null }) {
  const sa = market === 'sa' && !!saNav;
  const to = (href) => (market === 'sa' && SA_PATHS[href]) || href;
  const navItems = sa
    ? [saNav.company, saNav.services && { label: saNav.services.label, href: saNav.services.href, hasDropdown: saNav.items.length > 0 }, saNav.blog, saNav.contact].filter(Boolean) // same order as the India nav: Company, Services, Blog, Contact (no Portfolio: no Saudi work to show)
    : NAV;
  const dropItems = sa ? saNav.items : SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.title, desc: s.outcome }));
  const cta = sa ? saNav.cta : { label: SITE.cta.primary, href: to('/free-audit') };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
          <Logo href={sa ? saNav.homeHref : '/'} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href} className={item.hasDropdown ? 'group relative' : ''}>
                <Link href={sa ? item.href : to(item.href)} className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink">
                  {item.label}
                  {item.hasDropdown && <Chevron className="text-ink/50 transition-transform duration-300 group-hover:rotate-180" />}
                </Link>
                {item.hasDropdown && <ServicesDropdown items={dropItems} />}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            {sa && saNav.switch && <LangSwitch sw={saNav.switch} />}
            {cta && <Link href={cta.href} className="btn-primary">{cta.label}</Link>}
          </div>

          <button type="button" onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            <span className="relative block h-3 w-4">
              <span className={`absolute start-0 block h-0.5 w-4 bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute start-0 top-1.5 block h-0.5 w-4 bg-ink transition-all ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute start-0 block h-0.5 w-4 bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </nav>
      </div>

      <div className={`lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`container-px overflow-hidden border-b border-line bg-white transition-all duration-300 ${open ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.hasDropdown ? (
                  <>
                    <button type="button" onClick={() => setServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink/80 hover:bg-paper">
                      {item.label}
                      <Chevron className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="ms-3 border-s border-line ps-3">
                        {dropItems.map((s) => (
                          <li key={s.href}>
                            <Link href={s.href} onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2.5 text-sm text-ink/70 hover:bg-paper hover:text-accent">
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={sa ? item.href : to(item.href)} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base font-medium text-ink/80 hover:bg-paper">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            {sa && saNav.switch && <li className="pt-1"><LangSwitch sw={saNav.switch} onClick={() => setOpen(false)} className="w-full justify-center py-3" /></li>}
            {cta && <li className="pt-2">
              <Link href={cta.href} onClick={() => setOpen(false)} className="btn-primary w-full">{cta.label}</Link>
            </li>}
          </ul>
        </div>
      </div>
    </header>
  );
}