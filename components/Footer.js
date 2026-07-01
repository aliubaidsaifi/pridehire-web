import Link from 'next/link';
 import Logo from '@/components/Logo';
import { SITE, SERVICES } from '@/lib/site';

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'GitHub', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-px py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo/>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{SITE.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              <a href={`mailto:${SITE.email}`} className="hover:text-ink">
                {SITE.email}
              </a>
              <br />
              {SITE.location}
            </p>
          </div>

          <FooterCol
            title="Services"
            links={SERVICES.map((s) => ({ label: s.title, href: `/services#${s.slug}` }))}
          />
          <FooterCol title="Company" links={COMPANY} />
          <FooterCol title="Social" links={SOCIAL} external />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, external }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            {external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
