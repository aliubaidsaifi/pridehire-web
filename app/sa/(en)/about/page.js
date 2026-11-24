import { notFound } from 'next/navigation';
import SaServicePage from '@/components/SaServicePage';
import { loadRenderablePage, pageView, isDraftPreview } from '@/lib/market-pages';
import { saNav } from '@/lib/sa-nav';
import { buildMetadata } from '@/lib/seo';

const ID = 'about'; // content/sa/about.json (en)

export async function generateMetadata() {
  const page = loadRenderablePage('sa', ID, 'en');
  if (!page) return {};
  const v = pageView(page, 'en');
  return buildMetadata({ title: v.title, description: v.description, path: v.path, market: 'sa', locale: 'en', absoluteTitle: true });
}

export default function Page() {
  const page = loadRenderablePage('sa', ID, 'en');
  if (!page) notFound();
  const nav = saNav('en');
  return <SaServicePage view={pageView(page, 'en')} locale="en-SA" draft={isDraftPreview(page, 'en')} nav={nav} label={nav.company && nav.company.label} iconId="about" />;
}
