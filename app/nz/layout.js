import '../globals.css';
import RootShell from '@/components/RootShell';
import { inter } from '@/lib/fonts';
import { baseMetadata } from '@/lib/seo';

// New Zealand — FROZEN market (en-NZ). Root layout so <html lang="en-NZ">.
export const metadata = baseMetadata({ market: 'nz', locale: 'en' });
export const viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function NzRootLayout({ children }) {
  return <RootShell market="nz" locale="en" fontClass={inter.variable}>{children}</RootShell>;
}
