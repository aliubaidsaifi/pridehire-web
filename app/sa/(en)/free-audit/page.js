import { notFound } from 'next/navigation';
import FreeAuditClient from '@/components/FreeAuditClient';
import { WebPageSchema } from '@/components/Schema';
import { buildMetadata } from '@/lib/seo';
import { saPagesRenderable } from '@/lib/market-pages';

// Saudi free-audit page: submits with market 'sa'. Same render gate as every /sa page. Utility page: not listed in the sitemap or llms.txt.
const TITLE = 'Free Website Audit — Pride Hire, Saudi Arabia';
const DESCRIPTION = 'Request a free audit of your website from Pride Hire. We review your site and how it shows up in Google search and send honest, practical recommendations.';

export function generateMetadata() {
  if (!saPagesRenderable()) return {};
  return buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/sa/free-audit', market: 'sa', locale: 'en', absoluteTitle: true });
}

export default function Page() {
  if (!saPagesRenderable()) notFound();
  return (
    <>
      <WebPageSchema path="/sa/free-audit" name={TITLE} description={DESCRIPTION} locale="en-SA" />
      <FreeAuditClient market="sa" />
    </>
  );
}
