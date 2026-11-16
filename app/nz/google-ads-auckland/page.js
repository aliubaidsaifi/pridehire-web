import LocalPage from '@/components/LocalPage';
import { LOCAL_PAGES } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

const page = LOCAL_PAGES.find((p) => p.slug === 'google-ads-auckland');
const PATH = '/nz/google-ads-auckland';

export const metadata = buildMetadata({ title: page.title, description: page.intro, path: PATH, market: 'nz' });

export default function Page() {
  return <LocalPage page={page} />;
}
