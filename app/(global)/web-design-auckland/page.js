import LocalPage from '@/components/LocalPage';
import { LOCAL_PAGES } from '@/lib/site';

const page = LOCAL_PAGES.find((p) => p.slug === 'web-design-auckland');

export const metadata = {
  title: page.title,
  description: page.intro,
  keywords: page.keywords,
  alternates: { canonical: 'https://pridehire.com/web-design-auckland' },
};

export default function Page() {
  return <LocalPage page={page} />;
}