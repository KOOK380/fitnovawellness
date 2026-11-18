import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SITE_URL, SITE_NAME } from '@/lib/data';
import { getPosts, getPost, getPrograms, getSite, asCategory, asMedia, mediaUrl, programPath, waLink } from '@/lib/cms';
import { toCard, readMinutes } from '@/lib/posts';
import { seoMetadata, crumbLd } from '@/lib/seo';
import { PostCardView, fmtDate } from '@/components/PostCard';
import RichText from '@/components/RichText';
import { Shell, Breadcrumbs, Section, CtaBand, JsonLd } from '@/components/ui';

export async function generateStaticParams() {
  return (await getPosts()).map(p => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return {};
  const img = asMedia(p.image);
  // "Use the title exactly" → as typed; otherwise the site name is added by the layout's title template.
  return seoMetadata(
    { title: p.seo?.title || p.title, description: p.seo?.description || p.excerpt },
    `/blog/${p.slug}/`,
    { exactTitle: !!p.seo?.exactTitle, type: 'article', image: mediaUrl(img), published: p.publishedAt, modified: p.updatedAt },
  );
}

export default async function PostPage({ params }: Props) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const [all, programs, site] = await Promise.all([getPosts(), getPrograms(), getSite()]);
  const path = `/blog/${p.slug}/`;
  const cat = asCategory(p.category);
  const img = asMedia(p.image);
  const program = programs.find(x => asCategory(x.blogCategory)?.slug === cat?.slug);
  const related = [...all.filter(x => x.slug !== p.slug && asCategory(x.category)?.slug === cat?.slug), ...all.filter(x => x.slug !== p.slug && asCategory(x.category)?.slug !== cat?.slug)].slice(0, 3);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blogs/' }, { name: p.title, path }];
  const minutes = readMinutes(p);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting', '@id': `${SITE_URL}${path}#article`, mainEntityOfPage: SITE_URL + path,
        headline: p.title, name: p.seo?.title || p.title, description: p.seo?.description || p.excerpt,
        datePublished: p.publishedAt, dateModified: p.updatedAt, articleSection: cat?.name, inLanguage: 'en-IN', wordCount: minutes * 200,
        ...(img ? { image: { '@type': 'ImageObject', url: (mediaUrl(img) || '').startsWith('http') ? mediaUrl(img) : SITE_URL + mediaUrl(img), width: img.width, height: img.height } } : {}),
        author: { '@type': 'Organization', name: p.author || SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/fitnova-logo.webp` } },
        isPartOf: { '@id': `${SITE_URL}/blogs/#blog` },
      },
      crumbLd(crumbs),
    ],
  };

  return (
    <Shell>
      <JsonLd data={ld} />
      <article>
        <header className="hm-hero pg-hero" style={{ paddingBottom: img ? 80 : 56 }}>
          <div className="hm-wrap hm-hero-in pg-hero-solo">
            <div className="hm-hero-copy">
              <Breadcrumbs crumbs={crumbs} />
              {cat && <a href="/blogs/" className="hm-eyebrow" style={{ textDecoration: 'none' }}><span className="hm-dot"></span>{cat.name}</a>}
              <h1>{p.title}</h1>
              <div className="pg-article-meta">
                <span>By <b>{p.author || SITE_NAME}</b></span>
                <time dateTime={p.publishedAt}>{fmtDate(p.publishedAt)}</time>
                <span>{minutes} min read</span>
              </div>
            </div>
          </div>
        </header>
        {img && (
          <div className="pg-article-img">
            <Image src={mediaUrl(img, 'large') || ''} unoptimized={/^https?:/.test(mediaUrl(img, 'large') || '')} alt={img.alt} quality={90} width={img.width || 1200} height={img.height || 675} priority sizes="(max-width: 1000px) 100vw, 900px" />
          </div>
        )}
        <section className="hm-sec" style={{ paddingTop: 56 }}>
          <div className="hm-wrap">
            <RichText data={p.content} />
            <p className="pg-note" style={{ maxWidth: 760 }}>This article is for general information only and is not medical advice. Results vary from person to person — read our <a href="/disclaimer/">Medical Disclaimer</a>.</p>
          </div>
        </section>
      </article>
      {program && (
        <CtaBand
          title={`Get a personalised plan: ${program.name}`}
          text={program.card}
          ctas={[{ label: 'Book Free Consultation', url: site.ctaUrl || '/book-consultation/', style: 'lime' }, { label: 'Explore the program', url: programPath(program.slug), style: 'ghost' }]}
        />
      )}
      {!program && <CtaBand title="Talk to our doctors" ctas={[{ label: 'Book Free Consultation', url: '/book-consultation/', style: 'lime' }, { label: 'WhatsApp Us', url: waLink(site), style: 'wa' }]} />}
      <Section tone="cream" kicker="Keep reading" title="Related articles">
        <div className="pg-posts">{related.map(r => <div key={r.slug} style={{ display: 'flex' }}><PostCardView p={toCard(r)} /></div>)}</div>
      </Section>
    </Shell>
  );
}
