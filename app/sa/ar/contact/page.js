import { notFound } from 'next/navigation';
import ContactClient from '@/components/ContactClient';
import { WebPageSchema } from '@/components/Schema';
import { buildMetadata } from '@/lib/seo';
import { loadRenderablePage, pageStrings, isDraftPreview } from '@/lib/market-pages';

// Saudi contact page (Arabic DRAFT): +966 only, no India number anywhere on it. Text comes from content/sa/contact.json, so it goes through
// the same review/approval gates as every other Saudi page. Utility page: not listed in the sitemap or llms.txt.
const ID = 'contact';

export function generateMetadata() {
  const page = loadRenderablePage('sa', ID, 'ar');
  if (!page) return {};
  const s = pageStrings(page, 'ar');
  return buildMetadata({ title: s['meta.title'], description: s['meta.description'], path: page.paths['ar'], market: 'sa', locale: 'ar', absoluteTitle: true });
}

export default function Page() {
  const page = loadRenderablePage('sa', ID, 'ar');
  if (!page) notFound();
  const s = pageStrings(page, 'ar');
  return (
    <>
      <WebPageSchema path={page.paths['ar']} name={s['meta.title']} description={s['meta.description']} type="ContactPage" locale="ar-SA" />
      <ContactClient market="sa" strings={s} />
    </>
  );
}
