import { SITE } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Terms of Service', description: 'The terms that apply when you use the Pride Hire website and our services.', path: '/terms' });

const UPDATED = 'July 2026';

const SECTIONS = [
  { h: 'These terms', p: ['By using our website or engaging us for work, you agree to these terms. If you don’t agree, please don’t use the site.'] },
  { h: 'Our services', p: ['We design and build websites, run SEO and advertising campaigns, and set up automation. The exact scope, timeline and price for your project will be set out in a separate written quote or proposal — that document takes priority over anything on this website.'] },
  { h: 'Quotes and pricing', p: ['Prices shown or discussed on this website are indicative only. A quote is binding once we’ve both agreed it in writing. We don’t add hidden fees — if something isn’t in the quote, we’ll ask before doing it.'] },
  { h: 'Free audits', p: ['Our free audit is exactly that — free, with no obligation. It reflects our honest opinion based on the information available to us. It’s advice, not a guarantee of any particular result.'] },
  { h: 'No lock-in', p: ['We don’t use lock-in contracts. You can stop working with us at any time. Work completed up to that point remains payable.'] },
  { h: 'Ownership', p: ['Once your invoices are paid, the website, domain and accounts we build for you are yours. We’ll hand over full access. We keep the right to show the work in our portfolio unless you ask us not to.'] },
  { h: 'What we can’t promise', p: ['Search rankings, ad performance and traffic depend on factors outside our control — including Google, competitors and your market. We commit to doing quality work and being honest with you, but we can’t guarantee specific rankings, leads or revenue.'] },
  { h: 'Your responsibilities', p: ['You’re responsible for the accuracy of the content and information you give us, and for making sure you have the rights to any material you supply (text, images, logos).'] },
  { h: 'Liability', p: ['To the extent permitted by law, our liability for any claim relating to our services is limited to the amount you paid us for the work in question. We aren’t liable for indirect or consequential loss.'] },
  { h: 'Changes', p: ['We may update these terms from time to time. The version on this page at the time you engage us is the one that applies.'] },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 sm:pt-44">
        <div aria-hidden className="bg-grid bg-grid-fade pointer-events-none absolute inset-x-0 top-0 h-[360px]" />
        <div className="container-px relative pb-8">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink sm:text-6xl">
            Terms of Service
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
                    {s.p.map((t) => <p key={t} className="mt-3 text-pretty leading-relaxed text-muted">{t}</p>)}
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-3xl border border-line bg-paper p-7">
              <h2 className="font-display text-lg font-semibold text-ink">Questions?</h2>
              <p className="mt-2 text-pretty text-muted">
                Email <a href={`mailto:${SITE.contactEmail}`} className="link-underline font-medium text-ink">{SITE.contactEmail}</a> — we&apos;ll explain anything in plain English.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}