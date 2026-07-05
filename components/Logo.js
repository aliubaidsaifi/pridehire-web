import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/site';

export default function Logo({ href = '/', className = '' }) {
  return (
    <Link href={href} aria-label={`${SITE.name} home`} className={`group inline-flex items-center gap-2.5 ${className}`}>
      {/* Your logo image */}
      <span className="relative block h-10 w-10 shrink-0">
        <Image
          src="/logo.png"
          alt={SITE.name}
          fill
          priority
          sizes="40px"
          className="object-contain"
        />
      </span>

      {/* Text next to it */}
      <span className="font-display text-lg font-bold uppercase tracking-[0.08em] text-ink">
        Pride Hire
      </span>
    </Link>
  );
}