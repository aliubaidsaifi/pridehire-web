import { notFound } from 'next/navigation';
import SaServicePage from '@/components/SaServicePage';
import { loadRenderablePage, pageView, isDraftPreview } from '@/lib/market-pages';
import { saNav } from '@/lib/sa-nav';
import { buildMetadata } from '@/lib/seo';

const ID = 'restaurant-digital-menu'; // content/sa/restaurant-digital-menu.json (en)

export async function generateMetadata() {
  const page = loadRenderablePage('sa', ID, 'en');
  if (!page) return {};
  const v = pageView(page, 'en');
  return buildMetadata({ title: v.title, description: v.description, path: v.path, market: 'sa', locale: 'en', absoluteTitle: true });
}

export default function Page() {
  const page = loadRenderablePage('sa', ID, 'en');
  if (!page) notFound(); // not approved, or not allowed to render here
  return <SaServicePage view={pageView(page, 'en')} locale="en-SA" draft={isDraftPreview(page, 'en')} nav={saNav('en')} />;
}
