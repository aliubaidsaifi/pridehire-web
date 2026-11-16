import '../globals.css';
import RootShell from '@/components/RootShell';
import { inter } from '@/lib/fonts';
import { baseMetadata } from '@/lib/seo';

export const metadata = baseMetadata({ market: 'global', locale: 'en' });
export const viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return <RootShell market="global" locale="en" fontClass={inter.variable}>{children}</RootShell>;
}
