import { notFound } from 'next/navigation';
import MarketContentPage from '@/components/MarketContentPage';
import { loadRenderablePage, pageView, isDraftPreview } from '@/lib/market-pages';
import { saNav } from '@/lib/sa-nav';
import { buildMetadata } from '@/lib/seo';

const ID = 'blog'; // content/sa/blog.json (en)

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
  return <MarketContentPage view={pageView(page, 'en')} locale="en-SA" draft={isDraftPreview(page, 'en')} cards={{ title: null, items: nav.articles }} audit={nav.cta} eyebrow={nav.blog && nav.blog.label} />;
}
