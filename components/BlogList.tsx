'use client';
// Blog cards with category filter chips (homepage chip + program-card styles).
// All cards are in the HTML; filtering only hides cards, so every post stays crawlable.
import { useState } from 'react';
import { PostCardView, type PostCard } from './PostCard';

export type { PostCard };

export default function BlogList({ posts, cats }: { posts: PostCard[]; cats: [string, string][] }) {
  const [cat, setCat] = useState('all');
  return (
    <>
      <div className="pg-filter" role="group" aria-label="Filter by topic">
        {[['all', 'All articles'] as [string, string], ...cats].map(([k, n]) => (
          <button key={k} type="button" aria-pressed={cat === k} className={'hm-chip' + (cat === k ? ' on' : '')} onClick={() => setCat(k)}>{n}</button>
        ))}
      </div>
      <div className="pg-posts">
        {posts.map((p, i) => (
          <div key={p.slug} hidden={cat !== 'all' && p.category !== cat} style={{ display: cat !== 'all' && p.category !== cat ? 'none' : 'flex' }}>
            <PostCardView p={p} priority={i < 3} />
          </div>
        ))}
      </div>
    </>
  );
}
