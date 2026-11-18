// Page metadata + schema.org structured data, generated from CMS content.
import type { Metadata } from 'next';
import { SITE_URL } from './data';
import { getSite, getPrograms, getTeam, getPosts, mediaUrl, programPath, type Page, type Site } from './cms';
import { pagePath } from './routes';

type Seo = { title?: string | null; description?: string | null; keywords?: string | null; ogImage?: unknown; noindex?: boolean | null };

const abs = (u?: string | null) => (u ? (u.startsWith('http') ? u : SITE_URL + u) : undefined);

export function seoMetadata(seo: Seo | null | undefined, path: string, opts: { exactTitle?: boolean; type?: 'website' | 'article'; image?: string | null; published?: string; modified?: string } = {}): Metadata {
  const title = seo?.title || 'FitNova Wellness';
  const description = seo?.description || undefined;
  const image = abs(mediaUrl(seo?.ogImage, 'large') || opts.image || '/images/hero-founders.webp');
  return {
    title: opts.exactTitle === false ? title : { absolute: title },
    description,
    keywords: seo?.keywords || undefined,
    alternates: { canonical: path },
    robots: seo?.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: opts.type || 'website', locale: 'en_IN', url: path, siteName: 'FitNova Wellness', title, description,
      images: image ? [{ url: image }] : undefined,
      ...(opts.type === 'article' ? { publishedTime: opts.published, modifiedTime: opts.modified } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: image ? [image] : undefined },
  };
}

export const crumbLd = (crumbs: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE_URL + c.path })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export function clinicLd(site: Site) {
  return {
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': `${SITE_URL}/#clinic`,
    name: site.name || 'FitNova Wellness',
    url: SITE_URL,
    logo: abs(mediaUrl(site.logo)) || `${SITE_URL}/images/fitnova-logo.webp`,
    image: `${SITE_URL}/images/hero-founders.webp`,
    description: site.brandLine || undefined,
    telephone: site.phoneRaw,
    email: site.email,
    priceRange: 'Free first consultation',
    paymentAccepted: 'UPI, Cash',
    address: { '@type': 'PostalAddress', streetAddress: site.street, addressLocality: site.city, addressRegion: site.region, postalCode: site.postcode, addressCountry: 'IN' },
    areaServed: [{ '@type': 'City', name: site.city || 'Pune' }, { '@type': 'Country', name: 'India' }],
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '10:00', closes: '19:00' }],
    sameAs: (site.socials || []).map(s => s.url).filter(u => /^https?:/.test(u)),
  };
}

/** schema.org graph for a CMS page, based on its slug and the sections it contains. */
export async function pageLd(page: Page, crumbs: { name: string; path: string }[]) {
  const site = await getSite();
  const path = pagePath(page.slug);
  const blocks = page.layout || [];
  const type = page.slug === 'about-founders' ? 'AboutPage' : ['contact-us', 'book-consultation'].includes(page.slug) ? ['WebPage', 'ContactPage'] : 'WebPage';
  const graph: Record<string, unknown>[] = [{
    '@type': type, '@id': `${SITE_URL}${path}#webpage`, url: SITE_URL + path, name: page.seo.title, description: page.seo.description,
    inLanguage: 'en-IN', isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#clinic` },
  }];

  if (page.slug === 'home') {
    graph.push({ '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: site.name, inLanguage: 'en-IN', publisher: { '@id': `${SITE_URL}/#clinic` } });
  }
  if (['home', 'contact-us', 'book-consultation', 'about-founders'].includes(page.slug)) {
    const programs = await getPrograms();
    graph.push({ ...clinicLd(site), availableService: programs.map(p => ({ '@type': 'MedicalTherapy', name: p.name, description: p.card, url: SITE_URL + programPath(p.slug) })) });
  }
  if (['home', 'about-founders'].includes(page.slug)) {
    const { founders } = await getTeam();
    for (const f of founders) {
      graph.push({
        '@type': ['Person', 'Physician'], name: f.name, jobTitle: f.title || undefined, description: f.bio || undefined,
        image: abs(mediaUrl(f.photo)), knowsAbout: ['Lifestyle medicine', 'Nutrition', 'Obesity', 'Type 2 diabetes', 'PCOS', 'Thyroid', 'Gut health'],
        hasCredential: (f.credentials || []).map(c => c.text), worksFor: { '@id': `${SITE_URL}/#clinic` },
      });
    }
  }
  if (page.slug === 'our-expert-team') {
    const { founders, panel, coaches } = await getTeam();
    graph.push({
      '@type': ['MedicalOrganization', 'MedicalClinic'], '@id': `${SITE_URL}/#clinic`, name: site.name, url: SITE_URL,
      member: [
        ...founders.map(f => ({ '@type': 'Physician', name: f.name, description: f.title || undefined })),
        ...panel.map(d => ({ '@type': 'Physician', name: d.name, medicalSpecialty: d.speciality })),
        ...coaches.map(c => ({ '@type': 'Person', name: c.name, jobTitle: 'Health Coach' })),
      ],
    });
  }
  if (page.slug === 'programs' || blocks.some(b => b.blockType === 'programCards') && page.slug !== 'home') {
    const programs = await getPrograms();
    graph.push({ '@type': 'ItemList', name: 'FitNova Wellness programs', itemListElement: programs.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: SITE_URL + programPath(p.slug) })) });
  }
  if (page.slug === 'how-it-works') {
    const steps = blocks.find(b => b.blockType === 'steps');
    if (steps && steps.blockType === 'steps') {
      graph.push({
        '@type': 'HowTo', name: page.seo.h1, description: page.seo.description,
        step: (steps.steps || []).map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text, url: `${SITE_URL}${path}#step-${i + 1}` })),
      });
    }
  }
  if (blocks.some(b => b.blockType === 'blogIndex')) {
    const posts = await getPosts();
    graph.push({
      '@type': 'Blog', '@id': `${SITE_URL}${path}#blog`, url: SITE_URL + path, name: page.seo.title, publisher: { '@id': `${SITE_URL}/#clinic` },
      blogPost: posts.map(p => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}/`, datePublished: p.publishedAt })),
    });
  }
  const faqs = blocks.flatMap(b => (b.blockType === 'faq' || b.blockType === 'contactHub' ? b.faqs || [] : []));
  if (faqs.length) graph.push(faqLd(faqs));
  if (crumbs.length > 1) graph.push(crumbLd(crumbs));
  return { '@context': 'https://schema.org', '@graph': graph };
}
