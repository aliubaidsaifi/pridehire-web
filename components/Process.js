'use client';

import { useEffect, useRef } from 'react';
import { PROCESS } from '@/lib/site';
import { gsap, registerGsap } from '@/animations/scrollAnimations';

export default function Process() {
  const root = useRef(null);

  useEffect(() => {
    registerGsap();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!root.current || reduce) return;

    const ctx = gsap.context(() => {
      // Steps rise in as the timeline scrolls past.
      gsap.from('.step', {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
      });

      // Progress line draws itself down the timeline.
      gsap.fromTo(
        '.progress-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-white py-16 sm:py-20">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">How we work</span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
            A process that removes guesswork
          </h2>
        </div>

        <div className="relative mt-16 ps-8 sm:ps-0">
          {/* Rail */}
          <div className="absolute start-[7px] top-2 h-full w-px bg-line sm:left-1/2 sm:-translate-x-1/2" />
          <div className="progress-line absolute start-[7px] top-2 h-full w-px origin-top bg-brand-gradient sm:left-1/2 sm:-translate-x-1/2" />

          <ol className="space-y-12">
            {PROCESS.map((p, i) => (
              <li
                key={p.step}
                className={`step relative sm:grid sm:grid-cols-2 sm:gap-12 ${
                  i % 2 === 0 ? '' : 'sm:[&>div:first-child]:order-2'
                }`}
              >
                {/* node */}
                <span className="absolute -start-8 top-1.5 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-brand-gradient shadow-lift sm:left-1/2 sm:-translate-x-1/2" />

                <div className={i % 2 === 0 ? 'sm:text-end sm:pe-12' : 'sm:ps-12'}>
                  <span className="font-display text-sm font-semibold text-brand-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">{p.step}</h3>
                </div>
                <div className={i % 2 === 0 ? 'sm:ps-12' : 'sm:text-end sm:pe-12'}>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted sm:inline-block">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
