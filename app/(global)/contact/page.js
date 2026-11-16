import ContactClient from '@/components/ContactClient';
import { WebPageSchema } from '@/components/Schema';
import { buildMetadata } from '@/lib/seo';

const TITLE = 'Contact Us — Get a Quote for Websites, SEO & Ads';
const DESCRIPTION = 'Contact Pride Hire about website development, SEO, Google Ads, Meta Ads or business automation. Message us on WhatsApp, email us, or book a free consultation.';

export const metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: '/contact' });

export default function ContactPage() {
  return (
    <>
      <WebPageSchema path="/contact" name={TITLE} description={DESCRIPTION} type="ContactPage" />
      <ContactClient />
    </>
  );
}
