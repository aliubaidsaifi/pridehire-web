import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE, OFFICES } from '@/lib/site';
import { waLink, ORG } from '@/lib/markets';

const NAV_LEFT = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Company', href: '/about' },
];
const NAV_RIGHT = [
  { label: 'Blog', href: '/blog' },
  { label: 'Free Audit', href: '/free-audit' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL = [
  { label: 'WhatsApp', href: '#wa', icon: <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z M12 3.8a8.2 8.2 0 016.6 13l.2.3-.9 3.1-3.2-.8-.3.2A8.2 8.2 0 013.8 12 8.2 8.2 0 0112 3.8z" /> },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/pride-hire/', icon: <path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.5 8.5h3.9V21H3.5zM10 8.5h3.7v1.7h.05c.52-.98 1.8-2 3.7-2 3.95 0 4.68 2.6 4.68 6V21h-3.9v-5.3c0-1.26-.02-2.9-1.76-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10z" /> },
  { label: 'Instagram', href: '#', icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.2" cy="6.8" r="1.2" /></> },
];

export default function Footer({ market = 'global' }) {
  const year = new Date().getFullYear(); // founding year is unverified, so only the current year is shown
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-px py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* LEFT — brand block */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {SITE.tagline} Honest digital marketing for local businesses.
            </p>
            <div className="mt-5 space-y-3">
              <a href={`mailto:${SITE.contactEmail}`} className="link-underline block text-sm text-ink">{SITE.contactEmail}</a>
              {OFFICES.map((o) => (
                <div key={o.label || 'address'} className="text-sm text-muted">
                  {o.label && <><span className="text-xs font-semibold uppercase tracking-wider text-ink">{o.label}</span><br /></>}
                  {o.address.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
                </div>
              ))}
              <p className="text-sm text-muted">Udyam Registration No: {ORG.udyam}</p>
            </div>
            <Link href="/free-audit" className="btn-primary mt-6">{SITE.cta.primary}</Link>
          </div>

          {/* RIGHT — nav + social */}
          <div>
            <div className="grid grid-cols-2 gap-8">
              <ul className="space-y-3">
                {NAV_LEFT.map((l) => (
                  <li key={l.label}><Link href={l.href} className="font-display text-base font-medium text-ink transition-colors hover:text-accent">{l.label}</Link></li>
                ))}
              </ul>
              <ul className="space-y-3">
                {NAV_RIGHT.map((l) => (
                  <li key={l.label}><Link href={l.href} className="font-display text-base font-medium text-ink transition-colors hover:text-accent">{l.label}</Link></li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex gap-3">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.label === 'WhatsApp' ? waLink(market) : s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>
          
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-underline hover:text-ink">Privacy</Link>
            <Link href="/terms" className="link-underline hover:text-ink">Terms</Link>
          </div>
        </div>
        
      </div>
       <div aria-hidden className="container-px select-none overflow-hidden pb-4">
        <div className="font-display text-[18vw] font-bold leading-[0.8] tracking-tightest text-ink/[0.04] lg:text-[13rem]">
          Pride Hire
        </div>
      </div>
    </footer>
  );
}