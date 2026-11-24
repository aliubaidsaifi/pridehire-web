import Link from 'next/link';
import { Arrow, ServiceIcon, SA_IMAGES } from '@/components/SaParts';

// Hub: the Saudi counterpart of the India "Our services" cards (staggered two-column grid, tinted media block with icon, title, one line).
// Text = each service page's own nav.label and meta.description, so nothing new is written here.
const TINTS = ['from-accent/15 to-accent/5', 'from-ink/10 to-ink/[0.03]', 'from-accent/12 to-paper', 'from-ink/[0.08] to-paper'];

export default function SaServiceCards({ title, items }) {
  if (!items || !items.length) return null;
  return (
    <section className="py-12 sm:py-20">
      <div className="container-px">
        {title && <h2 className="font-display text-5xl font-semibold text-ink sm:text-7xl rtl:leading-tight ltr:tracking-tightest">{title}</h2>}
        <div className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:items-start">
          {items.map((s, i) => (
            <Link key={s.href} href={s.href} className={`group block ${i % 2 === 1 ? 'sm:mt-10' : ''}`}>
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-paper p-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[i % TINTS.length]}`} />
                  {SA_IMAGES[s.id] && <img src={SA_IMAGES[s.id]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]" />}
                  <div className={`absolute inset-0 grid place-items-center ${SA_IMAGES[s.id] ? 'bg-gradient-to-t from-ink/30 to-transparent' : ''}`}>
                    <span className="grid h-24 w-24 place-items-center rounded-3xl border border-line bg-white/80 text-ink shadow-soft backdrop-blur-sm transition-transform duration-700 ease-expo group-hover:-translate-y-2 group-hover:rotate-3">
                      <ServiceIcon id={s.id} className="h-11 w-11" />
                    </span>
                  </div>
                  <span className="absolute end-4 top-4 grid h-11 w-11 translate-y-1 place-items-center rounded-full bg-white text-ink opacity-0 shadow-soft transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100"><Arrow /></span>
                </div>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.65rem]">{s.label}</h3>
              {s.desc && <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-muted sm:text-base">{s.desc}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
