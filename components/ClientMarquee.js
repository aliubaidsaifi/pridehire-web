'use client';

import { CLIENTS } from '@/lib/site';

export default function ClientMarquee() {
  const row = [...CLIENTS, ...CLIENTS]; // duplicate for seamless loop

  return (
    <section className="border-b border-line bg-white py-12 sm:py-16">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">Trusted by ambitious teams</p>

      <div className="marquee-mask relative mt-8 overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 sm:gap-24">
          {row.map((name, i) => (
            <span key={i} className="shrink-0 font-display text-2xl font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink sm:text-3xl">
              {name}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }
        .marquee-track {
          animation: marquee 32s linear infinite;
        }
        .marquee-mask:hover .marquee-track { animation-play-state: paused; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        /* RTL: the track starts at the right edge, so it must travel the other way. */
        @keyframes marquee-rtl {
          from { transform: translateX(0); }
          to { transform: translateX(50%); }
        }
        :global([dir='rtl']) .marquee-track { animation-name: marquee-rtl; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}