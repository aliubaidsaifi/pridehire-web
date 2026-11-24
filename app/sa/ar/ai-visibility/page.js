import { notFound } from 'next/navigation';
import MarketContentPage from '@/components/MarketContentPage';
import { loadRenderablePage, pageView, isDraftPreview } from '@/lib/market-pages';
import { saNav } from '@/lib/sa-nav';
import { buildMetadata } from '@/lib/seo';

const ID = 'ai-visibility'; // content/sa/ai-visibility.json (ARABIC DRAFT: staged, dev preview only; a 404 in any production build until a native reviewer and the owner have approved it)

export async function generateMetadata() {
  const page = loadRenderablePage('sa', ID, 'ar');
  if (!page) return {};
  const v = pageView(page, 'ar');
  return buildMetadata({ title: v.title, description: v.description, path: v.path, market: 'sa', locale: 'ar', absoluteTitle: true });
}

export default function Page() {
  const page = loadRenderablePage('sa', ID, 'ar');
  if (!page) notFound(); // not approved, or not allowed to render here
  return <MarketContentPage view={pageView(page, 'ar')} locale="ar-SA" draft={isDraftPreview(page, 'ar')} audit={saNav('ar').cta} />;
}
