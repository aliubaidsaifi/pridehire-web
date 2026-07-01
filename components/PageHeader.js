export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-soft-radial pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-brand-violet/15 blur-[110px]"
      />
      <div className="container-px">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tightest text-ink sm:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-pretty text-muted sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
