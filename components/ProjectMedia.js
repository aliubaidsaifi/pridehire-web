'use client';

export default function ProjectMedia({ src, alt, tint = 'from-[#4b3df5] to-[#7c6cff]', ratio = 'aspect-[16/9]' }) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-4xl`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${tint}`} />
      <div className="absolute inset-0 grid place-items-center p-6 sm:p-12">
        <img src={src} alt={alt} onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-lift" />
      </div>
    </div>
  );
}