import NotFoundContent from '@/components/NotFoundContent';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return <NotFoundContent />;
}
