import { notFound } from 'next/navigation';
import SaServicePage from '@/components/SaServicePage';
import { loadRenderablePage, pageView, isDraftPreview } from '@/lib/market-pages';
import { saNav } from '@/lib/sa-nav';
import { buildMetadata } from '@/lib/seo';

const ID = 'about'; // content/sa/about.json (ar)

export async function generateMetadata() {
  const page = loadRenderablePage('sa', ID, 'ar');
  if (!page) return {};
  const v = pageView(page, 'ar');
  return buildMetadata({ title: v.title, description: v.description, path: v.path, market: 'sa', locale: 'ar', absoluteTitle: true });
}

export default function Page() {
  const page = loadRenderablePage('sa', ID, 'ar');
  if (!page) notFound();
  const nav = saNav('ar');
  return <SaServicePage view={pageView(page, 'ar')} locale="ar-SA" draft={isDraftPreview(page, 'ar')} nav={nav} label={nav.company && nav.company.label} iconId="about" />;
}
