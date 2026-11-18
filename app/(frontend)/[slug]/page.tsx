import CmsPage, { cmsPageMetadata } from '@/components/CmsPage';
import { getPageSlugs } from '@/lib/cms';

// Every CMS page except the homepage and the programs overview (they have their own routes).
// New pages created in the admin work immediately (rendered on first visit, then cached).
const RESERVED = ['home', 'programs'];

export async function generateStaticParams() {
  return (await getPageSlugs()).filter(p => !RESERVED.includes(p.slug)).map(p => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return RESERVED.includes(slug) ? {} : cmsPageMetadata(slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CmsPage slug={RESERVED.includes(slug) ? '__none__' : slug} />;
}
