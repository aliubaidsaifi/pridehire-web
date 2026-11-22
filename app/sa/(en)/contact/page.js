import { notFound } from 'next/navigation';
import ContactClient from '@/components/ContactClient';
import { WebPageSchema } from '@/components/Schema';
import { buildMetadata } from '@/lib/seo';
import { saPagesRenderable } from '@/lib/market-pages';

// Saudi contact page: +966 only, no India number anywhere on it. Same render gate as every /sa page (dev, or PH_SHOW_SA=1).
// Utility page: not listed in the sitemap or llms.txt.
const TITLE = 'Contact Pride Hire — Saudi Arabia';
const DESCRIPTION = 'Contact Pride Hire about website development, digital menus for restaurants or business automation. Message us on WhatsApp or email us.';

export function generateMetadata() {
  if (!saPagesRenderable()) return {};
  return buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/sa/contact', market: 'sa', locale: 'en', absoluteTitle: true });
}

export default function Page() {
  if (!saPagesRenderable()) notFound();
  return (
    <>
      <WebPageSchema path="/sa/contact" name={TITLE} description={DESCRIPTION} type="ContactPage" locale="en-SA" />
      <ContactClient market="sa" />
    </>
  );
}
