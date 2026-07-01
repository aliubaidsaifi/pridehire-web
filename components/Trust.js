'use client';

const CLIENTS = [
  'Modora Élan',
  'SalonFlow',
  'Northwind',
  'Atlas',
  'Verdant',
  'Lumio',
  'Cobalt',
  'Hearth',
];

function Row() {
  return (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {CLIENTS.map((c) => (
        <span
          key={c}
          className="whitespace-nowrap font-display text-xl font-medium text-ink/35 transition-colors hover:text-ink/70"
        >
          {c}
        </span>
      ))}
    </div>
  );
}

export default function Trust() {
  return (
    <section className="border-y border-line bg-white/60 py-10">
      <div className="container-px">
        <p className="mb-7 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Trusted by teams shipping ambitious products
        </p>
        <div className="mask-fade-x overflow-hidden">
          {/* Duplicated row + 50% translate = seamless loop. Pure CSS. */}
          <div className="flex w-max animate-marquee">
            <Row />
            <Row />
          </div>
        </div>
      </div>
    </section>
  );
}
