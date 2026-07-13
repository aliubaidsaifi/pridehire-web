
'use client';

export default function CompanyMedia({ src, alt, ratio = 'aspect-[16/9]', tint = 'from-[#4b3df5] to-[#7c6cff]', className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${ratio} ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${tint}`} />
      <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }}
        className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}