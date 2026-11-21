import '../../globals.css';
import RootShell from '@/components/RootShell';
import { inter } from '@/lib/fonts';
import { baseMetadata } from '@/lib/seo';

// Saudi English (en-SA). Root layout => <html lang="en-SA" dir="ltr">. Sibling of app/sa/ar (Arabic root layout, NO pages: Arabic stays off).
// Pages render only when the render gate in lib/market-pages.js allows (local dev, or PH_SHOW_SA=1).
export const metadata = baseMetadata({ market: 'sa', locale: 'en' });
export const viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function SaEnglishRootLayout({ children }) {
  return <RootShell market="sa" locale="en" fontClass={inter.variable}>{children}</RootShell>;
}
