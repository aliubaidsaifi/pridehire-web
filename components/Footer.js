import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE, OFFICES } from '@/lib/site';
import { waLink, ORG } from '@/lib/markets';
import { saFooterLink } from '@/lib/sa-links';
import { inFooterLink } from '@/lib/in-links';
import FooterContact from '@/components/FooterContact';

const SA_PATHS = { '/free-audit': '/sa/free-audit', '/contact': '/sa/contact' };

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

export default function Footer({ market = 'global', locale = 'en', saNav = null }) {
  // Staged inbound links: each is null until its market gate is open, its page is approved and its routes are live (lib/sa-links.js, lib/in-links.js)
  const marketLinks = [saFooterLink({ market, locale }), inFooterLink({ market, locale })].filter(Boolean);
  // Saudi footer: the audit/contact links go to the Saudi (+966 only) pages. Switch links appear only when the other market is live.
  const sa = market === 'sa';
  // On /sa the Explore column lists the Saudi pages only (never the global Services / Portfolio / Company / Blog pages).
  const saLinks = sa && saNav ? [saNav.company, saNav.services, ...saNav.items, saNav.blog, saNav.contact].filter(Boolean) : null;
  const navRight = NAV_RIGHT.map((l) => (sa && SA_PATHS[l.href] ? { ...l, href: SA_PATHS[l.href] } : l));
  const auditHref = sa && saNav && saNav.cta ? saNav.cta.href : sa ? SA_PATHS['/free-audit'] : '/free-audit';
  const auditLabel = sa && saNav && saNav.cta ? saNav.cta.label : SITE.cta.primary;
  const inSwitch = inFooterLink({ market: 'global', locale: 'en' });
  const saSwitch = saFooterLink({ market: 'global', locale: 'en' });
  const year = new Date().getFullYear(); // founding year is unverified, so only the current year is shown
  const col = 'font-display text-xs font-semibold uppercase tracking-wider text-ink';
  const link = 'text-sm text-muted transition-colors hover:text-accent';
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-px py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:flex lg:justify-between lg:gap-10">
          {/* Brand */}
          <div>
            <Logo href={sa && saNav ? saNav.homeHref : '/'} />
            {!sa && <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{SITE.tagline} Honest digital marketing for local businesses.</p>}
            <Link href={auditHref} className="btn-primary mt-4 whitespace-nowrap !px-5 !py-2.5 !text-sm !shadow-none">{auditLabel}</Link>
          </div>

          {/* Explore */}
          <div>
            <p className={col}>Explore</p>
            <ul className="mt-4 space-y-2.5">
              {saLinks ? saLinks.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>) : <>
                {NAV_LEFT.map((l) => <li key={l.label}><Link href={l.href} className={link}>{l.label}</Link></li>)}
                <li><Link href="/blog" className={link}>Blog</Link></li>
                {navRight.filter((l) => l.label === 'Contact').map((l) => <li key={l.label}><Link href={l.href} className={link}>{l.label}</Link></li>)}
              </>}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className={col}>Contact</p>
            <a href={`mailto:${SITE.contactEmail}`} className="link-underline block text-sm text-ink">{SITE.contactEmail}</a>
            <FooterContact inHref={inSwitch ? inSwitch.href : null} saHref={saSwitch ? saSwitch.href : null} />
            {OFFICES.map((o) => (
              <div key={o.label || 'address'} className="text-sm text-muted">
                {o.label && <><span className="text-xs font-semibold uppercase tracking-wider text-ink">{o.label}</span><br /></>}
                {o.address.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
              </div>
            ))}
          </div>

          {/* Social icons */}
          <div>
            <p className={col}>Follow us</p>
            <div className="mt-4 flex gap-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.label === 'WhatsApp' ? waLink(market) : s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {year} {SITE.name}. All rights reserved. · Udyam Registration No: {ORG.udyam}</p>
          <div className="flex gap-5">
            {marketLinks.map((l) => <Link key={l.href} href={l.href} className="link-underline hover:text-ink">{l.label}</Link>)}
            <Link href="/privacy" className="link-underline hover:text-ink">Privacy</Link>
            <Link href="/terms" className="link-underline hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}