// Renders any CMS page (by slug): header/footer, sections, structured data.
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPage, getSite } from '@/lib/cms';
import { pagePath } from '@/lib/routes';
import { seoMetadata, pageLd } from '@/lib/seo';
import { Blocks } from './Blocks';
import { Shell, JsonLd } from './ui';

export async function cmsPageMetadata(slug: string): Promise<Metadata> {
  const page = await getPage(slug);
  if (!page) return {};
  return seoMetadata(page.seo, pagePath(slug));
}

export default async function CmsPage({ slug }: { slug: string }) {
  const [page, site] = await Promise.all([getPage(slug), getSite()]);
  if (!page) notFound();
  const crumbs = slug === 'home' ? [{ name: 'Home', path: '/' }] : [{ name: 'Home', path: '/' }, { name: page.name, path: pagePath(slug) }];
  const hasContactHub = page.layout?.some(b => b.blockType === 'contactHub');
  return (
    <Shell chrome={page.chrome} fab={!hasContactHub}>
      <JsonLd data={await pageLd(page, crumbs)} />
      <Blocks blocks={page.layout} ctx={{ site, h1: page.seo.h1, h1Accent: page.seo.h1Accent, crumbs, builtAt: Date.now() }} />
    </Shell>
  );
}
