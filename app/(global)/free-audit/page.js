import FreeAuditClient from '@/components/FreeAuditClient';
import { WebPageSchema } from '@/components/Schema';
import { buildMetadata } from '@/lib/seo';

const TITLE = 'Free Website & SEO Audit — No Obligation';
const DESCRIPTION = 'Request a free audit of your website and Google presence from Pride Hire. We review your site, search visibility and competitors and send honest, practical recommendations.';

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/free-audit' });

export default function FreeAuditPage() {
  return (
    <>
      <WebPageSchema path="/free-audit" name={TITLE} description={DESCRIPTION} />
      <FreeAuditClient />
    </>
  );
}
