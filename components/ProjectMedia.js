'use client';

export default function ProjectMedia({ src, alt, ratio = 'aspect-[16/9]' }) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-3xl border border-line bg-paper`}>
      <img
        src={src}
        alt={alt}
        onError={(e) => { e.currentTarget.style.opacity = '0'; }}
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}