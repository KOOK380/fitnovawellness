// Blog card + date format (server-safe; used by the blog index and post pages).
import Image from 'next/image';

export type PostCard = {
  slug: string; title: string; excerpt: string; date: string; category: string; categoryName: string; readMinutes: number;
  image: { src: string; width: number; height: number; alt: string } | null;
};

export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

export function PostCardView({ p, priority }: { p: PostCard; priority?: boolean }) {
  return (
    <a href={`/blog/${p.slug}/`} className="pg-post">
      <div className="pg-post-img">
        {p.image
          ? <Image src={p.image.src} unoptimized={/^https?:/.test(p.image.src)} alt={p.image.alt} quality={90} fill sizes="(max-width: 820px) 100vw, (max-width: 1080px) 50vw, 380px" priority={priority} />
          : <span className="pg-post-noimg" aria-hidden="true">◐</span>}
      </div>
      <div className="pg-post-body">
        <span className="hm-tag">{p.categoryName}</span>
        <h3>{p.title}</h3>
        <p>{p.excerpt}</p>
        <div className="pg-post-meta"><time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.readMinutes} min read</div>
      </div>
    </a>
  );
}
