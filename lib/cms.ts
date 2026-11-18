// Reads published content from the Laravel API (fitnova-api). Responses are cached by Next.js and refreshed
// when content changes in the admin (Laravel calls /api/revalidate). Cached per request as well.
import { cache } from 'react';
import type { Page, Program, Post, Team, Testimonial, Category, Site, Media } from './cms-types';

export type { Page, Program, Post, Team, Testimonial, Category, Site, Media };
export type PageBlock = NonNullable<Page['layout']>[number];
export type ProgramBlock = NonNullable<Program['layout']>[number];

export const CMS_TAG = 'cms';
const API = (process.env.CMS_API_URL || 'http://127.0.0.1:8010').replace(/\/$/, '');

async function api<T>(path: string, allow404 = false): Promise<T> {
  const r = await fetch(`${API}/api/${path}`, { headers: { Accept: 'application/json' }, cache: 'force-cache', next: { tags: [CMS_TAG] } });
  if (allow404 && r.status === 404) return null as T;
  if (!r.ok) throw new Error(`CMS API ${path} → ${r.status}`);
  return r.json() as Promise<T>;
}

export const getSite = cache(() => api<Site>('site'));

export const getPage = cache((slug: string) => api<Page | null>(`pages/${encodeURIComponent(slug)}`, true));

export const getPageSlugs = cache(() => api<(Pick<Page, 'slug' | 'updatedAt' | 'seo'> & { name: string })[]>('pages'));

export const getPrograms = cache(() => api<Program[]>('programs'));

export const getProgram = cache(async (slug: string) => (await getPrograms()).find(p => p.slug === slug) ?? null);

export const getPosts = cache(() => api<Post[]>('posts'));

export const getPost = cache(async (slug: string) => (await getPosts()).find(p => p.slug === slug) ?? null);

export const getCategories = cache(() => api<Category[]>('categories'));

export const getTeam = cache(async () => {
  const all = await api<Team[]>('team');
  return { founders: all.filter(t => t.role === 'founder'), panel: all.filter(t => t.role === 'panel'), coaches: all.filter(t => t.role === 'coach') };
});

export const getTestimonials = cache(() => api<Testimonial[]>('testimonials'));

// ── helpers ──────────────────────────────────────────────────────
export const asMedia = (m: unknown): Media | null => (m && typeof m === 'object' && 'url' in (m as object) ? (m as Media) : null);
export const asCategory = (c: unknown): Category | null => (c && typeof c === 'object' && 'slug' in (c as object) ? (c as Category) : null);
export const asProgram = (p: unknown): Program | null => (p && typeof p === 'object' && 'slug' in (p as object) ? (p as Program) : null);

/** Best URL for an uploaded image; `size` picks a generated smaller version when available.
 *  Laravel's uploads (…/storage/media/…) are served through this site as /media/… (see next.config.ts). */
export function mediaUrl(m: unknown, size?: 'thumb' | 'card' | 'large'): string | null {
  const x = asMedia(m);
  if (!x) return null;
  const raw = (size && x.sizes?.[size]?.url) || x.url || null;
  if (!raw) return null;
  const local = raw.match(/^(?:https?:\/\/[^/]+)?\/storage\/(media\/.*)$/);
  return local ? `/${local[1]}` : raw;
}

/** Images on another host skip Next's optimizer (they are already resized by the CMS). */
export const isRemote = (src?: string | null) => !!src && /^https?:\/\//.test(src);

export const programPath = (slug: string) => `/programs/${slug}/`;
export const waLink = (site: Site, text?: string) => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
