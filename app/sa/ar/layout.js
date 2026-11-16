import '../../globals.css';
import RootShell from '@/components/RootShell';
import { plexArabic } from '@/lib/fonts-ar';
import { baseMetadata } from '@/lib/seo';

// Saudi Arabic (ar-SA, RTL). Root layout => <html lang="ar-SA" dir="rtl"> with the Arabic font scoped to this layout only.
// NO PAGES EXIST UNDER /sa/ YET (Phase 3). Saudi English will live in app/sa/(en)/ with its own root layout.
export const metadata = baseMetadata({ market: 'sa', locale: 'ar' });
export const viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function SaArabicRootLayout({ children }) {
  return <RootShell market="sa" locale="ar" fontClass={plexArabic.variable}>{children}</RootShell>;
}
