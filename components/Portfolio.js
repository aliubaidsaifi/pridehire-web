'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/site';
import { gsap, ScrollTrigger, registerGsap } from '@/animations/scrollAnimations';

function ProjectCard({ project }) {
  return (
    <article className="flex h-full w-[86vw] shrink-0 flex-col justify-between rounded-4xl border border-line bg-white p-7 shadow-soft sm:w-[60vw] lg:w-[46vw] xl:w-[40vw]">
      <div
        className={`relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gradient-to-br ${project.accent}`}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink/30">
            {project.title}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.04]" />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <span className="rounded-full bg-canvas px-3 py-1">{project.category}</span>
          <span className="rounded-full bg-canvas px-3 py-1">{project.tech}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{project.title}</h3>
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-muted">Result</span>
          <span className="font-medium text-brand-violet">{project.result}</span>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const section = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    registerGsap();

    const mm = gsap.matchMedia();

    // Desktop: sticky-driven horizontal scroll. No pin → no DOM reparenting,
    // so navigating away never throws the removeChild error.
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const sectionEl = section.current;
      const trackEl = track.current;
      if (!sectionEl || !trackEl) return;

      const getDistance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

      // Make the section tall enough for the sticky child to stay put while we scrub.
      const setSize = () => {
        sectionEl.style.height = `${window.innerHeight + getDistance()}px`;
      };
      setSize();

      const tween = gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: setSize,
        },
      });

      // matchMedia cleanup (revert) handles this, but be explicit & tidy.
      return () => {
        tween.scrollTrigger && tween.scrollTrigger.kill();
        tween.kill();
        sectionEl.style.height = '';
        gsap.set(trackEl, { clearProps: 'transform' });
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={section} id="work" className="bg-canvas py-24 sm:py-32 lg:py-0">
      {/* This wrapper is the thing that sticks on desktop */}
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="container-px">
          <div className="flex flex-wrap items-end justify-between gap-4 lg:pt-10">
            <div className="max-w-xl">
              <span className="eyebrow">Selected work</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tightest text-ink sm:text-5xl">
                Products we&apos;ve shipped
              </h2>
            </div>
            <Link href="/work" className="btn-ghost">
              View all projects
            </Link>
          </div>
        </div>

        <div className="mt-10 overflow-hidden lg:mt-12">
          <div
            ref={track}
            className="flex flex-col gap-5 px-5 will-change-transform sm:px-8 lg:w-max lg:flex-row lg:gap-6 lg:px-10"
          >
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}