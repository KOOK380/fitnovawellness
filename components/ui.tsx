// Building blocks shared by every page. Every block reuses the homepage design classes (hm-*);
// the few pg-* classes in globals.css only extend them (e.g. a hero without a photo).
import type { ReactNode } from 'react';
import Header, { LogoHeader, type HeaderData, type NavItem } from './Header';
import Footer, { type FooterData } from './Footer';
import { Ico } from './Icons';
import { FaqList } from './Interactive';
import Motion from './Motion';
import Analytics from './Analytics';
import { SITE_URL } from '@/lib/data';
import { getSite, getPrograms, mediaUrl, asMedia, programPath, waLink, type Site, type Program } from '@/lib/cms';

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

// ── Site chrome (header + footer) from Site Settings ─────────────
const ICON = { instagram: 'ig', youtube: 'yt', facebook: 'fb', whatsapp: 'wa' } as const;
const links = (a?: { label: string; url: string }[] | null) => (a || []).map(l => ({ label: l.label, href: l.url }));

export function headerData(site: Site, programs: Program[]): HeaderData {
  const logo = asMedia(site.logo);
  const nav: NavItem[] = (site.nav || []).map(n => ({
    label: n.label, url: n.url, mobileOnly: !!n.mobileOnly,
    children: [
      ...(n.autoPrograms ? programs.map(p => ({ label: p.name, url: programPath(p.slug) })) : []),
      ...(n.children || []).map(c => ({ label: c.label, url: c.url })),
    ],
  }));
  return {
    logo: mediaUrl(logo) || '/images/fitnova-logo.webp', logoW: logo?.width || 600, logoH: logo?.height || 200, name: site.name || 'FitNova Wellness',
    announceText: site.announceText, announceLabel: site.announceLabel, announceUrl: site.announceUrl,
    nav, ctaLabel: site.ctaLabel || 'Book Free Consult', ctaUrl: site.ctaUrl || '/book-consultation/', wa: waLink(site),
  };
}

export function footerData(site: Site): FooterData {
  return {
    address: site.address, phone: site.phone, phoneHref: `tel:${site.phoneRaw}`, email: site.email,
    hours: site.hours || '', hoursClosed: site.hoursClosed || '',
    programs: links(site.programLinks), company: links(site.companyLinks), legal: links(site.legalLinks),
    socials: (site.socials || []).map(s => ({ label: s.network[0].toUpperCase() + s.network.slice(1), href: s.url, icon: ICON[s.network] })),
    disclaimer: site.disclaimer || '', copyright: site.copyright || '', brandLine: site.brandLine || '', foundedBy: site.foundedBy || '',
    finderKicker: site.finderKicker || '', finderTitle: site.finderTitle || '', finderText: site.finderText || '',
    symptoms: (site.symptoms || []).map(s => ({ label: s.label, href: s.url, emoji: s.icon || '◉' })),
    cbBadge: site.cbBadge || '', cbTitle: site.cbTitle || '', cbAccent: site.cbAccent || '', cbText: site.cbText || '', cbTextMobile: site.cbTextMobile || '',
    cbTrust: (site.cbTrust || []).map(t => t.text), cbConcerns: (site.cbConcerns || []).map(t => t.text),
    cbButton: site.cbButton || 'Request my free callback →', cbFine: site.cbFine || '',
  };
}

export function MobileBar({ wa, book }: { wa: string; book: string }) {
  return <div className="hm-mbar"><a href={wa} className="hm-mbar-wa">{Ico.wa(18)} WhatsApp</a><a href={book} className="hm-mbar-book">Book Free Consult</a></div>;
}

export async function Shell({ children, fab = true, chrome = 'full' }: { children: ReactNode; fab?: boolean; chrome?: string | null }) {
  const [site, programs] = await Promise.all([getSite(), getPrograms()]);
  const h = headerData(site, programs);
  const anim = (site as { animations?: string | null }).animations || 'full'; // Site Settings › Effects
  return (
    <>
      {chrome === 'logo' ? <LogoHeader d={h} /> : <Header d={h} />}
      {anim !== 'off' && <span id="mo-on" hidden />}
      {anim !== 'off' && <Motion level={anim === 'subtle' ? 'subtle' : 'full'} />}
      <main>{children}</main>
      <Footer d={footerData(site)} />
      <Analytics ga4={site.tracking?.ga4} clarity={site.tracking?.clarity} />
      {fab && chrome !== 'logo' && <a href={h.wa} className="hm-fab" aria-label="Chat on WhatsApp">{Ico.wa(28)}</a>}
      {fab && chrome !== 'logo' && <MobileBar wa={h.wa} book={h.ctaUrl} />}
    </>
  );
}

// ── Breadcrumbs ──────────────────────────────────────────────────
export type Crumb = { name: string; path: string };
export const crumbLd = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE_URL + c.path })),
});

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  if (crumbs.length < 2) return null;
  return (
    <nav className="pg-crumbs" aria-label="Breadcrumb">
      <ol>
        {crumbs.map((c, i) => (
          <li key={c.path}>{i < crumbs.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

// ── Buttons ──────────────────────────────────────────────────────
export type Cta = { label: string; url: string; style?: 'primary' | 'ghost' | 'lime' | 'wa' | null };

export function Buttons({ ctas, lg = true, center }: { ctas: Cta[]; lg?: boolean; center?: boolean }) {
  if (!ctas.length) return null;
  return (
    <div className={'hm-hero-ctas' + (center ? ' pg-center' : '')}>
      {ctas.map(c => {
        const cls = c.style === 'ghost' || c.style === 'wa' ? 'hm-btn-ghost' : c.style === 'lime' ? 'hm-btn-lime' : 'hm-btn-primary';
        const ext = /^https?:/.test(c.url);
        return (
          <a key={c.label + c.url} href={c.url} className={`hm-btn ${cls}${lg ? ' hm-btn-lg' : ''}`} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {c.style === 'wa' && Ico.wa(17)} {c.label} {c.style !== 'wa' && <Ico.Arrow />}
          </a>
        );
      })}
    </div>
  );
}

/** H1 with the optional green italic ending (same style as the homepage hero). */
export function H1Text({ h1, accent }: { h1: string; accent?: string | null }) {
  if (accent && h1.endsWith(accent)) return <>{h1.slice(0, -accent.length)}<em>{accent}</em></>;
  return <>{h1}</>;
}

// ── Sections ─────────────────────────────────────────────────────
export type Tone = 'white' | 'cream' | 'mint' | 'forest' | '' | null | undefined;
export function Section({ id, tone, kicker, title, intro, children, left }: {
  id?: string | null; tone?: Tone; kicker?: string | null; title?: ReactNode; intro?: ReactNode; children?: ReactNode; left?: boolean;
}) {
  const t = tone && tone !== 'white' ? ` hm-sec-${tone}` : ' pg-on-white';
  return (
    <section id={id || undefined} className={'hm-sec' + t}>
      <div className="hm-wrap">
        {(kicker || title || intro) && (
          <div className={'hm-sec-head' + (left ? ' hm-left' : '')}>
            {kicker && <div className="hm-kicker">{kicker}</div>}
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

const GLYPHS = ['◈', '◎', '◐', '◉', '⊙', '◔'];
export function IconGrid({ items }: { items: { title: string; text?: string | null }[] }) {
  return (
    <div className={'hm-track' + (items.length % 3 === 0 || items.length === 5 ? ' pg-grid-3' : '')}>
      {items.map((it, i) => (
        <div key={it.title} className="hm-track-c">
          <div className="hm-track-i" aria-hidden="true">{GLYPHS[i % GLYPHS.length]}</div>
          <h3>{it.title}</h3>
          {it.text && <p>{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

export function Checks({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) {
  return (
    <div className="hm-mode pg-card">
      <ul className={cols === 2 ? 'pg-checks-2' : ''}>{items.map(x => <li key={x}><Ico.Check />{x}</li>)}</ul>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="pg-note">{children}</p>;
}

export function CompareTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="hm-compare pg-table-wrap">
      <table className="pg-table">
        <thead><tr>{cols.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr></thead>
        <tbody>{rows.map(r => <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function Steps({ items }: { items: { title: string; text?: string | null }[] }) {
  return (
    <ol className={'hm-steps' + (items.length === 4 ? ' pg-steps-4' : '')}>
      {items.map((s, i) => <li key={s.title} className="hm-step" id={`step-${i + 1}`}><div className="hm-step-n">{i + 1}</div><h3>{s.title}</h3>{s.text && <p>{s.text}</p>}</li>)}
    </ol>
  );
}

export function FaqSection({ items, kicker = 'Questions', title, id = 'faq', intro, wa, buttonLabel = 'Ask on WhatsApp' }: {
  items: { q: string; a: string }[]; kicker?: string | null; title: string; id?: string | null; intro?: string | null; wa: string; buttonLabel?: string | null;
}) {
  return (
    <section className="hm-sec" id={id || 'faq'}>
      <div className="hm-wrap hm-faq-in">
        <div className="hm-sec-head hm-left">
          {kicker && <div className="hm-kicker">{kicker}</div>}
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
          <a href={wa} className="hm-btn hm-btn-ghost">{Ico.wa(16)} {buttonLabel || 'Ask on WhatsApp'}</a>
        </div>
        <FaqList items={items.map(f => [f.q, f.a])} id={id || 'faq'} />
      </div>
    </section>
  );
}
export const faqLd = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

// Closing CTA band — forest section like the homepage "Meet the doctors" block.
export function CtaBand({ kicker = 'Free first consultation', title, text, ctas, fine }: { kicker?: string | null; title: string; text?: string | null; ctas: Cta[]; fine?: ReactNode }) {
  return (
    <section className="hm-sec hm-sec-forest pg-cta">
      <div className="hm-wrap">
        <div className="hm-sec-head">
          {kicker && <div className="hm-kicker">{kicker}</div>}
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <Buttons ctas={ctas} center />
        {fine && <div className="hm-fine pg-fine-dark">{fine}</div>}
      </div>
    </section>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section className="hm-stats" aria-label="FitNova in numbers">
      <div className="hm-wrap hm-stats-in">{items.map(s => <div key={s.label} className="hm-stat"><div className="hm-stat-n">{s.value}</div><div className="hm-stat-l">{s.label}</div></div>)}</div>
    </section>
  );
}

export { mediaUrl };
