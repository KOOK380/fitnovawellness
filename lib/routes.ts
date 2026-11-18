// Every indexable URL, built from the CMS — used by /sitemap.xml and the HTML /sitemap/ page.
import { getPageSlugs, getPrograms, getPosts, programPath } from './cms';

export type RouteItem = { name: string; path: string; lastModified?: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' };

const LEGAL = ['privacy-policy', 'terms-conditions', 'cancellation-refund', 'disclaimer', 'sitemap'];
export const pagePath = (slug: string) => (slug === 'home' ? '/' : `/${slug}/`);

export async function getRouteGroups() {
  const [pages, programs, posts] = await Promise.all([getPageSlugs(), getPrograms(), getPosts()]);
  const nameOf = (slug: string) => pages.find(d => d.slug === slug)?.name || slug;
  const visible = pages.filter(p => !p.seo?.noindex);
  const item = (p: (typeof pages)[number], priority: number, changeFrequency: RouteItem['changeFrequency']): RouteItem =>
    ({ name: nameOf(p.slug), path: pagePath(p.slug), lastModified: p.updatedAt, priority, changeFrequency });

  return [
    {
      title: 'Main pages',
      items: visible.filter(p => !LEGAL.includes(p.slug) && p.slug !== 'programs' && p.slug !== 'blogs')
        .sort((a, b) => (a.slug === 'home' ? -1 : b.slug === 'home' ? 1 : 0))
        .map(p => item(p, p.slug === 'home' ? 1 : p.slug === 'book-consultation' ? 0.9 : 0.7, p.slug === 'home' ? 'weekly' : 'monthly')),
    },
    {
      title: 'Conditions & Programs',
      items: [
        ...visible.filter(p => p.slug === 'programs').map(p => ({ ...item(p, 0.9, 'monthly'), name: 'All Programs' })),
        ...programs.map(p => ({ name: p.name, path: programPath(p.slug), lastModified: p.updatedAt, priority: 0.9, changeFrequency: 'monthly' as const })),
      ],
    },
    {
      title: 'Blog',
      items: [
        ...visible.filter(p => p.slug === 'blogs').map(p => ({ ...item(p, 0.7, 'weekly'), name: 'All articles' })),
        ...posts.map(p => ({ name: p.title, path: `/blog/${p.slug}/`, lastModified: p.updatedAt, priority: 0.6, changeFrequency: 'monthly' as const })),
      ],
    },
    { title: 'Policies', items: visible.filter(p => LEGAL.includes(p.slug)).map(p => item(p, 0.3, 'yearly')) },
  ];
}
