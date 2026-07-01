import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/site';

export default function Logo({ href = '/', boxClass = 'h-12 w-[160px]', className = '' }) {
  return (
    <Link href={href} aria-label={`${SITE.name} home`} className={`inline-block ${className}`}>
      <span className={`relative block ${boxClass}`}>
        <Image
          src="/logo.png"
          alt={SITE.name}
          fill
          priority
          sizes="220px"
          className="object-contain object-left"
        />
      </span>
    </Link>
  );
}