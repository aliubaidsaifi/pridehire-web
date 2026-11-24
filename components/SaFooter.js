import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE } from '@/lib/site';
import { PHONES, waLink } from '@/lib/markets';

// Saudi footer: same structure, spacing and sizes as the India Footer (brand + CTA, Explore, Contact, Follow us, bottom bar), but
// - every label comes from content/sa/footer.json in the page language (so Arabic pages get an Arabic footer),
// - links go only to /sa pages (plus the shared Privacy / Terms pages),
// - it shows NO office / address, NO registration (Udyam) line and NO India number: the Saudi copy rules forbid office and registration wording.
const SOCIAL = [
  { label: 'WhatsApp', icon: <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2s-.8.9-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z M12 3.8a8.2 8.2 0 016.6 13l.2.3-.9 3.1-3.2-.8-.3.2A8.2 8.2 0 013.8 12 8.2 8.2 0 0112 3.8z" /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pride-hire/', icon: <path d="M6.94 5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.5 8.5h3.9V21H3.5zM10 8.5h3.7v1.7h.05c.52-.98 1.8-2 3.7-2 3.95 0 4.68 2.6 4.68 6V21h-3.9v-5.3c0-1.26-.02-2.9-1.76-2.9-1.77 0-2.04 1.38-2.04 2.8V21H10z" /> },
];

export default function SaFooter({ nav, strings = {} }) {
  const S = (k, d) => (strings[k] != null ? strings[k] : d);
  const year = new Date().getFullYear();
  const links = [nav.company, nav.services, ...nav.items, nav.blog, nav.contact].filter(Boolean);
  const col = 'font-display text-xs font-semibold uppercase tracking-wider text-ink';
  const link = 'text-sm text-muted transition-colors hover:text-accent';
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-px py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:flex lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start">
            <Logo href={nav.homeHref} />
            {nav.cta && <Link href={nav.cta.href} className="btn-primary mt-4 whitespace-nowrap !px-5 !py-2.5 !text-sm !shadow-none">{nav.cta.label}</Link>}
          </div>

          <div>
            <p className={col}>{S('footer.explore', 'Explore')}</p>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.label}</Link></li>)}
            </ul>
          </div>

          <div className="space-y-3">
            <p className={col}>{S('footer.contact', 'Contact')}</p>
            <a href={`mailto:${SITE.contactEmail}`} className="link-underline block text-sm text-ink">{SITE.contactEmail}</a>
            <p className="text-sm text-muted">
              <span className="text-xs font-semibold uppercase tracking-wider text-ink">{S('footer.phone', 'Saudi Arabia')}</span>
              <br />
              <a href={`tel:${PHONES.SA.e164}`} dir="ltr" className="link-underline inline-block text-ink">{PHONES.SA.display}</a>
            </p>
          </div>

          <div>
            <p className={col}>{S('footer.follow', 'Follow us')}</p>
            <div className="mt-4 flex gap-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.label === 'WhatsApp' ? waLink('sa') : s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-line pt-5 text-xs text-muted sm:flex-row sm:items-center">
          <p><span dir="ltr" className="inline-block">© {year} {SITE.name}.</span> {S('footer.rights', 'All rights reserved.')}</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="link-underline hover:text-ink">{S('footer.privacy', 'Privacy')}</Link>
            <Link href="/terms" className="link-underline hover:text-ink">{S('footer.terms', 'Terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
