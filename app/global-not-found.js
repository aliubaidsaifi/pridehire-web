import './globals.css';
import RootShell from '@/components/RootShell';
import NotFoundContent from '@/components/NotFoundContent';
import { inter } from '@/lib/fonts';

// 404 for URLs that match no route. Required because there are multiple root layouts (experimental.globalNotFound in next.config.js).
export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  return <RootShell market="global" locale="en" fontClass={inter.variable}><NotFoundContent /></RootShell>;
}
