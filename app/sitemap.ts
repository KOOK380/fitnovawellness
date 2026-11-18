import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/data';
import { getRouteGroups } from '@/lib/routes';

// /sitemap.xml — every published, indexable page in the CMS (pages marked "Hide from Google" are left out).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const groups = await getRouteGroups();
  return groups.flatMap(g => g.items).map(r => ({
    url: SITE_URL + r.path,
    lastModified: r.lastModified ? new Date(r.lastModified) : new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
