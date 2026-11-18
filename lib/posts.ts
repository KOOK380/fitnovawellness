import { getPosts, getCategories, asMedia, asCategory, mediaUrl, type Post } from './cms';
import type { PostCard } from '@/components/PostCard';

const ENT: Record<string, string> = { amp: '&', '#39': "'", apos: "'", quot: '"', nbsp: ' ', lt: '<', gt: '>' };
/** Words in an article's HTML (block ends count as spaces; entities count as the character they stand for). */
const words = (html: unknown): number =>
  typeof html === 'string'
    ? html.replace(/<\/(p|li|td|th|h\d|tr)>|<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '').replace(/&(amp|#39|apos|quot|nbsp|lt|gt);/g, (_, e: string) => ENT[e])
      .split(/\s+/).filter(Boolean).length
    : 0;
export const readMinutes = (p: Post) => Math.max(1, Math.round(words(p.content) / 200));

export function toCard(p: Post): PostCard {
  const img = asMedia(p.image);
  const cat = asCategory(p.category);
  return {
    slug: p.slug, title: p.title, excerpt: p.excerpt || '', date: p.publishedAt,
    category: cat?.slug || '', categoryName: cat?.name || '', readMinutes: readMinutes(p),
    image: img ? { src: mediaUrl(img, 'card') || '', width: img.width || 800, height: img.height || 450, alt: img.alt } : null,
  };
}

export async function postCards() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const cards = posts.map(toCard);
  const cats = categories.filter(c => cards.some(p => p.category === c.slug)).map(c => [c.slug, c.name] as [string, string]);
  return { cards, cats };
}
