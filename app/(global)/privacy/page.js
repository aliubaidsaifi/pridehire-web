import { SITE } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Pride Hire collects, uses and protects your personal information.',
};

const UPDATED = 'July 2026';

const SECTIONS = [
  {
    h: 'Who we are',
    p: [`Pride Hire ("we", "us") is a digital agency helping businesses grow with websites, SEO and advertising. This policy explains what personal information we collect through our website and how we handle it.`],
  },
  {
    h: 'What we collect',
    p: ['We only collect information you choose to give us through our forms — typically your name, business name, email address, phone number, website URL, and any message or review you submit.'],
    list: ['Contact and enquiry forms', 'Free audit requests', 'Call-back requests', 'Reviews you submit'],
  },
  {
    h: 'How we use it',
    p: ['We use your information to respond to your enquiry, prepare your free audit, call you back when you ask us to, and — with your permission — publish reviews you submit.'],
    list: ['To reply to you and deliver what you asked for', 'To prepare quotes and proposals', 'To publish reviews (only after we verify them with you)'],
  },
  {
    h: 'What we don’t do',
    p: ['We do not sell, rent or trade your personal information. We do not send marketing emails you didn’t ask for.'],
  },
  {
    h: 'Who we share it with',
    p: ['Only the service providers we need to run our website and email — for example our email delivery provider and our website host. They process data on our behalf and aren’t allowed to use it for anything else.'],
  },
  {
    h: 'Cookies and analytics',
    p: ['Our website uses only essential cookies needed for it to function. If we add analytics in future, we will update this policy.'],
  },
  {
    h: 'How long we keep it',
    p: ['We keep enquiry information for as long as needed to respond and for our own business records. You can ask us to delete it at any time.'],
  },
  {
    h: 'Your rights',
    p: ['You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Just email us and we’ll sort it out.'],
  },
  {
    h: 'Changes to this policy',
    p: ['If we change how we handle your information, we’ll update this page and change the date at the top.'],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[360px]" />
        <div className="container-px relative pb-8">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-sm text-muted">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-px">
          <div className="max-w-3xl space-y-12">
            {SECTIONS.map((s, i) => (
              <div key={s.h} className="border-t border-line pt-8">
                <div className="grid gap-4 sm:grid-cols-[48px_1fr] sm:gap-8">
                  <span className="font-display text-sm font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">{s.h}</h2>
                    {s.p.map((t) => (
                      <p key={t} className="mt-3 text-pretty leading-relaxed text-muted">{t}</p>
                    ))}
                    {s.list && (
                      <ul className="mt-4 space-y-2">
                        {s.list.map((t) => (
                          <li key={t} className="flex items-start gap-3 text-muted">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-line bg-paper p-7">
              <h2 className="font-display text-lg font-semibold text-ink">Questions about your data?</h2>
              <p className="mt-2 text-pretty text-muted">
                Email us at <a href={`mailto:${SITE.contactEmail}`} className="link-underline font-medium text-ink">{SITE.contactEmail}</a> and we&apos;ll get back to you within one business day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}