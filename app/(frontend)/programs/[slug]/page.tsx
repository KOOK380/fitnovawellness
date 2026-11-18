import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/data';
import { getPrograms, getProgram, getPosts, getSite, asProgram, asCategory, programPath, waLink, type Program } from '@/lib/cms';
import { seoMetadata, crumbLd, faqLd } from '@/lib/seo';
import { Ico } from '@/components/Icons';
import { Blocks } from '@/components/Blocks';
import { Shell, JsonLd, Breadcrumbs, Buttons, FaqSection, CtaBand, Section, type Cta } from '@/components/ui';

export async function generateStaticParams() {
  return (await getPrograms()).map(p => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProgram((await params).slug);
  return p ? seoMetadata(p.seo, programPath(p.slug)) : {};
}

export default async function ProgramPage({ params }: Props) {
  const p = await getProgram((await params).slug);
  if (!p) notFound();
  const [site, posts] = await Promise.all([getSite(), getPosts()]);
  const path = programPath(p.slug);
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Programs', path: '/programs/' }, { name: p.name, path }];
  const wa = waLink(site);
  const ctas: Cta[] = [{ label: 'Book Free Consultation', url: site.ctaUrl || '/book-consultation/' }];
  ctas.push(p.guideButton ? { label: 'Download Free Gut Reset Guide', url: '/free-resource/', style: 'ghost' } : { label: 'WhatsApp Us', url: wa, style: 'wa' });
  const related = (p.related || []).map(asProgram).filter(Boolean) as Program[];
  const cat = asCategory(p.blogCategory);
  const articles = cat ? posts.filter(a => asCategory(a.category)?.slug === cat.slug).slice(0, 3) : [];
  const faqs = p.faqs || [];

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage', '@id': `${SITE_URL}${path}#webpage`, url: SITE_URL + path, name: p.seo.title, description: p.seo.description,
        inLanguage: 'en-IN', isPartOf: { '@id': `${SITE_URL}/#website` }, publisher: { '@id': `${SITE_URL}/#clinic` },
        audience: { '@type': 'PeopleAudience', geographicArea: { '@type': 'Country', name: 'India' } },
        ...(p.condition ? { about: { '@type': 'MedicalCondition', name: p.condition } } : {}),
        mainEntity: { '@type': 'MedicalTherapy', name: p.name, description: p.card, provider: { '@id': `${SITE_URL}/#clinic` } },
      },
      crumbLd(crumbs),
      ...(faqs.length ? [faqLd(faqs)] : []),
    ],
  };

  return (
    <Shell>
      <JsonLd data={ld} />
      <section className="hm-hero pg-hero">
        <div className="hm-wrap hm-hero-in pg-hero-solo">
          <div className="hm-hero-copy">
            <Breadcrumbs crumbs={crumbs} />
            {p.heroEyebrow && <div className="hm-eyebrow"><span className="hm-dot"></span>{p.heroEyebrow}</div>}
            <h1>{p.seo.h1}</h1>
            <p className="hm-lead">{p.heroSub}</p>
            <Buttons ctas={ctas} />
            {p.trust && <div className="hm-hero-trust">{p.trust.split(' · ').map(t => <span key={t}>{t}</span>)}</div>}
          </div>
        </div>
      </section>
      <Blocks blocks={p.layout} ctx={{ site, h1: p.seo.h1, crumbs, builtAt: Date.now() }} />
      {faqs.length > 0 && <FaqSection items={faqs} title="FAQs" id={`faq-${p.slug}`} intro="Still unsure? Message us — a real person from our team replies." wa={wa} />}
      <Section tone="mint" kicker="Keep reading" title="Related programs & articles">
        <div className="pg-links">
          {related.map(r => <a key={r.slug} href={programPath(r.slug)}>{r.name} <Ico.Arrow /></a>)}
          {articles.map(a => <a key={a.slug} href={`/blog/${a.slug}/`}>{a.title}</a>)}
          <a href="/success-stories/">Read success stories <Ico.Arrow /></a>
        </div>
      </Section>
      <CtaBand
        title={p.closingTitle}
        text={p.closingText}
        ctas={[{ label: 'Book Free Consultation', url: site.ctaUrl || '/book-consultation/', style: 'lime' }, { label: 'WhatsApp Us', url: wa, style: 'wa' }]}
        fine={p.footerNote ? <>{p.footerNote} <a href="/disclaimer/">Medical Disclaimer</a>.</> : undefined}
      />
    </Shell>
  );
}
