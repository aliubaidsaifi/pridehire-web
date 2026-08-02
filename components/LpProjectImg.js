'use client';

export default function LpProjectImg({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-h-full max-w-full rounded-xl object-contain shadow-lift"
      onError={(e) => { e.currentTarget.style.display = 'none'; }}
    />
  );
}