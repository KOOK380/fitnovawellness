// Renders CMS page sections ("blocks") with the existing FitNova design.
import type { ReactNode } from 'react';
import { Ico } from './Icons';
import { Slot } from './Slot';
import RichText from './RichText';
import BookingForm from './BookingForm';
import GuideSignup from './GuideSignup';
import BlogList from './BlogList';
import ContactPage, { type ContactData } from './Contact';
import { HeroFinder, GuideForm } from './Interactive';
import {
  Section, Stats, IconGrid, Checks, Note, CompareTable, Steps, FaqSection, CtaBand, Buttons, Breadcrumbs, H1Text, type Crumb, type Cta,
} from './ui';
import {
  getPrograms, getTeam, getTestimonials, getPosts, mediaUrl, asMedia, asProgram, programPath, waLink, type PageBlock, type ProgramBlock, type Site, type Team,
} from '@/lib/cms';
import { postCards } from '@/lib/posts';
import { getRouteGroups } from '@/lib/routes';

export type Ctx = { site: Site; h1: string; h1Accent?: string | null; crumbs: Crumb[]; builtAt: number };
type B = PageBlock | ProgramBlock;
type Of<T extends B['blockType']> = Extract<B, { blockType: T }>;

const linkOf = (l?: { label?: string | null; url?: string | null } | null) => (l?.label && l?.url ? { label: l.label, url: l.url } : null);
const ext = (u: string) => (/^https?:/.test(u) ? { target: '_blank', rel: 'noopener noreferrer' } : {});
const ctas = (b?: { label: string; url: string; style?: string | null }[] | null): Cta[] => (b || []).map(x => ({ label: x.label, url: x.url, style: x.style as Cta['style'] }));
const textItems = (a?: { title: string; text?: string | null }[] | null) => a || [];
const initials = (n: string) => n.replace(/^Dr\.?\s+/, '').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

// The hero photo is cropped to fill a tall box (≈456×520 on desktop, ≈350×380 on phones), so a wide photo
// is displayed much wider than the box. Tell the browser the real displayed width so it downloads a sharp file.
function heroSizes(img: { width?: number | null; height?: number | null } | null) {
  const ar = img?.width && img?.height ? img.width / img.height : 1;
  const desktop = Math.round(Math.max(480, 520 * ar));
  const mobile = Math.round(Math.max(100, ((380 * ar) / 390) * 100));
  return `(max-width: 820px) ${mobile}vw, ${desktop}px`;
}

// ── Homepage sections ────────────────────────────────────────────
async function HomeHero({ b, ctx }: { b: Of<'homeHero'>; ctx: Ctx }) {
  const chips = (b.chips || []).map(c => ({ label: c.label, url: asProgram(c.program) ? programPath(asProgram(c.program)!.slug) : '/book-consultation/' }));
  const img = asMedia(b.image);
  return (
    <section className="hm-hero" data-screen-label="Hero">
      <div className="hm-wrap hm-hero-in">
        <div className="hm-hero-copy">
          {b.eyebrow && <div className="hm-eyebrow"><span className="hm-dot"></span>{b.eyebrow}</div>}
          <h1><H1Text h1={ctx.h1} accent={ctx.h1Accent} /></h1>
          {b.lead && <p className="hm-lead">{b.lead}</p>}
          <HeroFinder question={b.finderQuestion || ''} chips={chips} ctaLabel={b.ctaLabel || 'Book Free Consultation'} ctaChosenLabel={b.ctaChosenLabel || 'Book free consult for'}
            ctaUrl={ctx.site.ctaUrl || '/book-consultation/'} waLabel={b.waLabel || 'WhatsApp Us'} wa={waLink(ctx.site)} />
          {!!b.trust?.length && <div className="hm-hero-trust">{b.trust.map((t, i) => <span key={i}>{t.before}{t.bold && <b>{t.bold}</b>}{t.after}</span>)}</div>}
        </div>
        <div className="hm-hero-media">
          <div className="hm-hero-photo"><Slot src={mediaUrl(img) || undefined} alt={img?.alt} radius={28} priority position={b.imagePosition || '50% 50%'} sizes={heroSizes(img)} placeholder="Hero photo" /></div>
          {!!b.floatDoctors?.length && (
            <div className="hm-float hm-float-a">
              {b.floatTitle && <div className="hm-float-k">{b.floatTitle}</div>}
              {b.floatDoctors.map(d => <div key={d.name} className="hm-float-v">{d.name} <small>{d.quals}</small></div>)}
            </div>
          )}
          {b.badge && <div className="hm-float hm-float-b"><span className="hm-pulse"></span>{b.badge}</div>}
        </div>
      </div>
    </section>
  );
}

async function ProgramCards({ b }: { b: Of<'programCards'> }) {
  const programs = await getPrograms();
  return (
    <Section id={b.anchor} tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="hm-prog-grid">
        {programs.map((p, i) => (
          <a key={p.slug} href={programPath(p.slug)} className="hm-prog">
            <div className="hm-prog-top"><span className="hm-prog-n">{String(i + 1).padStart(2, '0')}</span>{p.tag && <span className="hm-tag">{p.tag}</span>}</div>
            <h3>{p.name}</h3><p>{p.card}</p>
            <span className="hm-prog-link">Explore program <Ico.Arrow /></span>
          </a>
        ))}
        {b.ctaTitle && (
          <a href={b.ctaUrl || '/book-consultation/'} className="hm-prog hm-prog-cta">
            <h3>{b.ctaTitle}</h3>{b.ctaText && <p>{b.ctaText}</p>}
            <span className="hm-prog-link">{b.ctaLinkLabel || 'Book free consultation'} <Ico.Arrow /></span>
          </a>
        )}
      </div>
    </Section>
  );
}

function Compare({ b }: { b: Of<'compare'> }) {
  const btn = linkOf(b.button);
  return (
    <section className={'hm-sec' + (b.tone && b.tone !== 'white' ? ` hm-sec-${b.tone}` : '')} data-screen-label="Why FitNova">
      <div className="hm-wrap hm-compare-in">
        <div className="hm-sec-head hm-left">
          {b.kicker && <div className="hm-kicker">{b.kicker}</div>}
          {b.title && <h2>{b.title}</h2>}
          {b.intro && <p>{b.intro}</p>}
          {btn && <a href={btn.url} className="hm-btn hm-btn-ghost">{btn.label} <Ico.Arrow /></a>}
        </div>
        <div className="hm-compare">
          <div className="hm-compare-h"><span>{b.colA}</span><span>{b.colB}</span></div>
          {(b.rows || []).map(r => <div key={r.a} className="hm-compare-r"><div className="hm-no"><Ico.X />{r.a}</div><div className="hm-yes"><Ico.Check />{r.b}</div></div>)}
        </div>
      </div>
    </section>
  );
}

function StepsBlock({ b }: { b: Of<'steps'> }) {
  const btn = linkOf(b.button);
  return (
    <Section id={b.anchor} tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <Steps items={textItems(b.steps)} />
      {b.note && <Note>{b.note}</Note>}
      {btn && <div className="hm-center"><a href={btn.url} className={`hm-btn ${b.buttonStyle === 'ghost' ? 'hm-btn-ghost' : 'hm-btn-primary'}`} {...ext(btn.url)}>{btn.label} <Ico.Arrow /></a></div>}
    </Section>
  );
}

function FounderCard({ f, detailed, focusLine }: { f: Team; detailed: boolean; focusLine?: string | null }) {
  const img = asMedia(f.photo);
  const creds = (detailed ? f.credentials : f.shortCredentials) || f.credentials || [];
  return (
    <article className="hm-founder">
      <div className="hm-founder-photo"><Slot src={mediaUrl(img, 'card') || undefined} alt={img?.alt || `Portrait of ${f.name}`} radius={18} sizes="(max-width: 820px) 100vw, 200px" placeholder={`Portrait: ${f.name}`} /></div>
      <div className="hm-founder-body">
        <h3>{f.name}</h3>{f.title && <div className="hm-founder-r">{f.title}</div>}
        <ul>{creds.map(x => <li key={x.text}><Ico.Check />{x.text}</li>)}</ul>
        {(detailed ? f.bio : focusLine) && <div className="hm-founder-focus">{detailed ? f.bio : focusLine}</div>}
      </div>
    </article>
  );
}

async function Founders({ b }: { b: Of<'founders'> }) {
  const { founders } = await getTeam();
  const btn = linkOf(b.button);
  return (
    <section className="hm-sec hm-sec-forest" id={b.anchor || undefined} data-screen-label="Founders">
      <div className="hm-wrap">
        <div className="hm-sec-head">
          {b.kicker && <div className="hm-kicker">{b.kicker}</div>}
          {b.title && <h2>{b.title}</h2>}
          {b.intro && <p>{b.intro}</p>}
        </div>
        <div className="hm-founders">{founders.map(f => <FounderCard key={f.id} f={f} detailed={!!b.detailed} focusLine={b.focusLine} />)}</div>
        {b.quote && <blockquote className="hm-quote">{b.quote}</blockquote>}
        {btn && <div className="hm-center"><a href={btn.url} className="hm-btn hm-btn-lime">{btn.label} <Ico.Arrow /></a></div>}
      </div>
    </section>
  );
}

async function FounderCards({ b }: { b: Of<'founderCards'> }) {
  const { founders } = await getTeam();
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="hm-panel pg-split" style={{ maxWidth: 900, margin: '0 auto' }}>
        {founders.map(f => {
          const img = asMedia(f.photo);
          return (
            <a key={f.id} href={b.linkUrl || '/about-founders/'} className="hm-doc" style={{ textDecoration: 'none' }}>
              <div className="hm-doc-photo" style={{ width: 84, height: 84 }}><Slot src={mediaUrl(img, 'thumb') || undefined} alt={img?.alt || f.name} circle sizes="84px" placeholder="Photo" /></div>
              <div>
                <div className="hm-doc-n">{f.name}</div>
                <div className="hm-doc-s">{f.shortLine || f.quals}</div>
                <span className="hm-prog-link" style={{ marginTop: 8 }}>{b.linkLabel || 'Read our story'} <Ico.Arrow /></span>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
}

async function TeamPanel({ b }: { b: Of<'teamPanel'> }) {
  const { panel, coaches } = await getTeam();
  const btn = linkOf(b.button);
  const onTone = b.tone && b.tone !== 'white';
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className={'hm-panel' + (b.showHelp ? ' pg-panel' : '')}>
        {panel.map(d => {
          const img = asMedia(d.photo);
          return (
            <div key={d.id} className="hm-doc" style={onTone ? { background: '#fff' } : undefined}>
              <div className="hm-doc-photo"><Slot src={mediaUrl(img, 'thumb') || undefined} alt={img?.alt === 'Doctor headshot placeholder' ? `${d.name}, ${d.speciality}` : img?.alt || d.name} circle sizes="64px" placeholder="Headshot" /></div>
              <div>
                {b.showHelp ? <h3 className="hm-doc-n">{d.name}</h3> : <div className="hm-doc-n">{d.name}</div>}
                <div className="hm-doc-s">{d.speciality}</div>
                {b.showHelp && d.help && <p className="pg-doc-help">{d.help}</p>}
              </div>
            </div>
          );
        })}
      </div>
      {b.showCoachStrip && (
        <div className="hm-coaches">
          <div className="hm-avatars">{coaches.map(c => <span key={c.id} title={c.name}>{initials(c.name)}</span>)}</div>
          <div className="hm-coaches-t"><b>{b.coachesBold}</b>{b.coachesText}</div>
          {btn && <a href={btn.url} className="hm-btn hm-btn-ghost">{btn.label} <Ico.Arrow /></a>}
        </div>
      )}
    </Section>
  );
}

async function Coaches({ b }: { b: Of<'coaches'> }) {
  const { coaches } = await getTeam();
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="pg-coaches">{coaches.map(c => <div key={c.id} className="pg-coach"><span aria-hidden="true">{initials(c.name)}</span>{c.name}</div>)}</div>
    </Section>
  );
}

async function Stories({ b }: { b: Of<'stories'> }) {
  const all = await getTestimonials();
  const list = b.limit ? all.slice(0, b.limit) : all;
  const btn = linkOf(b.button);
  const video = asMedia(b.video);
  const placeholders = ['Obesity', 'PCOS', 'Type 2 Diabetes'];
  return (
    <section className={'hm-sec' + (b.tone && b.tone !== 'white' ? ` hm-sec-${b.tone}` : '')} id={b.anchor || undefined} data-screen-label="Success stories">
      <div className="hm-wrap">
        <div className="hm-sec-head">
          {b.kicker && <div className="hm-kicker">{b.kicker}</div>}
          {b.title && <h2>{b.title}</h2>}
          {b.intro && <p>{b.intro}</p>}
        </div>
        <div className="hm-stories">
          <div className="hm-video">
            {b.videoUrl ? (
              <a href={b.videoUrl} {...ext(b.videoUrl)} aria-label="Watch the video testimonial">
                <Slot src={mediaUrl(video, 'card') || undefined} alt={video?.alt} radius={18} placeholder="Video testimonial" /><span className="hm-play" aria-hidden="true">▶</span>
              </a>
            ) : (
              <><Slot src={mediaUrl(video, 'card') || undefined} alt={video?.alt} radius={18} placeholder="Video testimonial thumbnail (YouTube)" /><span className="hm-play" aria-hidden="true">▶</span></>
            )}
          </div>
          {list.length
            ? list.map(t => (
              <div key={t.id} className="hm-story">
                {t.tag && <span className="hm-tag">{t.tag}</span>}
                <p className="hm-story-q" style={{ color: 'var(--f)' }}>{t.quote}</p>
                {(t.before || t.after) && <div className="hm-story-m"><div><small>Before</small><b style={{ color: 'var(--f)' }}>{t.before}</b></div><div><small>After</small><b style={{ color: 'var(--f)' }}>{t.after}</b></div></div>}
                <div className="hm-story-who" style={{ color: 'var(--f)' }}><span className="hm-av">{initials(t.name)}</span>{[t.name, t.age, t.area].filter(Boolean).join(', ')}</div>
              </div>
            ))
            : placeholders.map((t, i) => (
              <div key={t} className="hm-story">
                <span className="hm-tag">{t}</span>
                <p className="hm-story-q">[Client&apos;s own words — add in CMS › Success stories after written consent]</p>
                <div className="hm-story-m"><div><small>Before</small><b>[marker]</b></div><div><small>After</small><b>[marker]</b></div></div>
                <div className="hm-story-who"><span className="hm-av">{'ABC'[i]}</span>[First name, age, area]</div>
              </div>
            ))}
        </div>
        {btn && <div className="hm-center"><a href={btn.url} className="hm-btn hm-btn-ghost">{btn.label} <Ico.Arrow /></a></div>}
      </div>
    </section>
  );
}

function Modes({ b, site }: { b: Of<'modes'>; site: Site }) {
  const card = (c: Of<'modes'>['clinic'], dark: boolean) => {
    if (!c?.title) return null;
    const main = linkOf(c.button);
    const sec = linkOf(c.secondary);
    const isWa = sec && sec.url.includes('wa.me');
    return (
      <div className={'hm-mode' + (dark ? ' hm-mode-dark' : '')}>
        <h3>{c.title}</h3>
        <ul>{(c.items || []).map(i => <li key={i.text}><Ico.Check />{i.text}</li>)}</ul>
        <div className="hm-mode-cta">
          {main && <a href={main.url} className={`hm-btn ${dark ? 'hm-btn-lime' : 'hm-btn-primary'}`} {...ext(main.url)}>{main.label} <Ico.Arrow /></a>}
          {sec && <a href={isWa ? waLink(site) : sec.url} className="hm-link" {...ext(sec.url)}>{isWa && Ico.wa(15)} {sec.label}</a>}
        </div>
      </div>
    );
  };
  return (
    <Section id={b.anchor} tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="hm-modes">{card(b.clinic, false)}{card(b.online, true)}</div>
    </Section>
  );
}

function GuidePromo({ b }: { b: Of<'guidePromo'> }) {
  const cover = asMedia(b.cover);
  return (
    <section className="hm-guide" id={b.anchor || undefined} data-screen-label="Lead magnet">
      <div className="hm-wrap hm-guide-in">
        <div className="hm-guide-cover"><Slot src={mediaUrl(cover, 'card') || undefined} alt={cover?.alt} radius={10} sizes="300px" placeholder="Guide cover" /></div>
        <div className="hm-guide-copy">
          {b.kicker && <div className="hm-kicker">{b.kicker}</div>}
          {b.title && <h2>{b.title}</h2>}
          {b.text && <p>{b.text}</p>}
          <GuideForm id={`guide-${b.id || 'promo'}`} label={b.buttonLabel} />
          {b.fine && <div className="hm-fine">{b.fine}</div>}
        </div>
      </div>
    </section>
  );
}

// ── Inner-page sections ──────────────────────────────────────────
function PageHero({ b, ctx }: { b: Of<'pageHero'>; ctx: Ctx }) {
  const img = asMedia(b.image);
  return (
    <section className="hm-hero pg-hero">
      <div className={'hm-wrap hm-hero-in' + (img ? '' : ' pg-hero-solo')}>
        <div className="hm-hero-copy">
          <Breadcrumbs crumbs={ctx.crumbs} />
          {b.eyebrow && <div className="hm-eyebrow"><span className="hm-dot"></span>{b.eyebrow}</div>}
          <h1><H1Text h1={ctx.h1} accent={ctx.h1Accent} /></h1>
          {b.sub && <p className="hm-lead">{b.sub}</p>}
          <Buttons ctas={ctas(b.buttons)} />
          {!!b.trust?.length && <div className="hm-hero-trust">{b.trust.map(t => <span key={t.text}>{t.text}</span>)}</div>}
        </div>
        {img && (
          <div className="hm-hero-media">
            <div className="hm-hero-photo"><Slot src={mediaUrl(img) || undefined} alt={img.alt} radius={28} priority position={b.imagePosition || '50% 50%'} sizes={heroSizes(img)} /></div>
            {b.showDoctorBadges && <DoctorBadges />}
          </div>
        )}
      </div>
    </section>
  );
}

async function DoctorBadges() {
  const { founders } = await getTeam();
  return (
    <>
      <div className="hm-float hm-float-a">
        <div className="hm-float-k">Your doctors</div>
        {founders.map(f => <div key={f.id} className="hm-float-v">{f.name} <small>{f.quals}</small></div>)}
      </div>
      <div className="hm-float hm-float-b"><span className="hm-pulse"></span>Member, Indian Society of Lifestyle Medicine</div>
    </>
  );
}

function TextBlock({ b }: { b: Of<'text'> }) {
  const dark = b.tone === 'forest';
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      {b.quote && <blockquote className="hm-quote pg-quote" style={{ color: dark ? '#fff' : 'var(--f)', margin: '0 auto 24px' }}>{b.quote}</blockquote>}
      {!!b.paragraphs?.length && <div className="pg-text" style={dark ? { color: '#cfd8cf', textAlign: 'center' } : undefined}>{b.paragraphs.map((p, i) => <p key={i}>{p.text}</p>)}</div>}
      {!!b.buttons?.length && <div style={{ marginTop: b.paragraphs?.length ? 28 : 0 }}><Buttons ctas={ctas(b.buttons)} lg={false} center /></div>}
    </Section>
  );
}

function Checklist({ b }: { b: Of<'checklist'> }) {
  const items = (b.items || []).map(i => i.text);
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      {items.length > 0 && <Checks items={items} cols={b.columns === '1' ? 1 : 2} />}
      {b.note && (items.length > 0
        ? <Note>{b.note}</Note>
        : <p className="pg-text pg-big">{b.note}</p>)}
      {b.source && <p className="hm-fine" style={{ textAlign: 'center' }}><a href={b.source} target="_blank" rel="noopener noreferrer">Source</a></p>}
    </Section>
  );
}

function TableBlock({ b }: { b: Of<'table'> }) {
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <CompareTable cols={[b.colLabel || '', b.colA || '', b.colB || '']} rows={(b.rows || []).map(r => [r.label, r.a || '', r.b || ''])} />
      {b.note && <Note>{b.note}</Note>}
    </Section>
  );
}

function CtaBandBlock({ b }: { b: Of<'ctaBand'> }) {
  const fl = linkOf(b.fineLink);
  return <CtaBand kicker={b.kicker} title={b.title} text={b.text} ctas={ctas(b.buttons)} fine={b.fine ? <>{b.fine}{fl && <> <a href={fl.url}>{fl.label}</a>.</>}</> : undefined} />;
}

async function LinkList({ b }: { b: Of<'linkList'> }) {
  const posts = b.latestPosts ? (await getPosts()).slice(0, b.latestPosts) : [];
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="pg-links">
        {posts.map(p => <a key={p.slug} href={`/blog/${p.slug}/`}>{p.title}</a>)}
        {(b.links || []).map(l => <a key={l.url + l.label} href={l.url} {...ext(l.url)}>{l.label}</a>)}
      </div>
    </Section>
  );
}

function Cards({ b }: { b: Of<'cards'> }) {
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="hm-prog-grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
        {(b.cards || []).map(c => <a key={c.url + c.title} href={c.url} className="hm-prog" {...ext(c.url)}><h3>{c.title}</h3>{c.text && <p>{c.text}</p>}<span className="hm-prog-link">{c.linkLabel || 'Open'} <Ico.Arrow /></span></a>)}
      </div>
    </Section>
  );
}

function BookingHero({ b, ctx }: { b: Of<'bookingHero'>; ctx: Ctx }) {
  return (
    <section className="hm-hero pg-hero">
      <div className="hm-wrap hm-hero-in" style={{ alignItems: 'start' }}>
        <div className="hm-hero-copy">
          <Breadcrumbs crumbs={ctx.crumbs} />
          {b.eyebrow && <div className="hm-eyebrow"><span className="hm-dot"></span>{b.eyebrow}</div>}
          <h1><H1Text h1={ctx.h1} accent={ctx.h1Accent} /></h1>
          {b.sub && <p className="hm-lead">{b.sub}</p>}
          <ul className="pg-ticks">{(b.ticks || []).map(t => <li key={t.text}><Ico.Check />{t.text}</li>)}</ul>
        </div>
        <BookingForm title={b.formTitle} submitLabel={b.submitLabel} consent={b.consent} fine={b.fine} />
      </div>
    </section>
  );
}

function ContactButtons({ b, site }: { b: Of<'contactButtons'>; site: Site }) {
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <div className="hm-hero-ctas pg-center">
        <a href={waLink(site, "Hi FitNova, I'd like to book a free consultation.")} className="hm-btn hm-btn-primary hm-btn-lg">{Ico.wa(17)} WhatsApp Us — {site.phone}</a>
        <a href={`tel:${site.phoneRaw}`} className="hm-btn hm-btn-ghost hm-btn-lg">Call Us — {site.phone}</a>
        <a href={`mailto:${site.email}`} className="hm-btn hm-btn-ghost hm-btn-lg">Email — {site.email}</a>
      </div>
    </Section>
  );
}

function GuideHero({ b, ctx }: { b: Of<'guideHero'>; ctx: Ctx }) {
  const cover = asMedia(b.cover);
  return (
    <section className="hm-hero pg-hero">
      <div className="hm-wrap hm-hero-in" style={{ alignItems: 'start' }}>
        <div className="hm-hero-copy">
          <Breadcrumbs crumbs={ctx.crumbs} />
          {b.eyebrow && <div className="hm-eyebrow"><span className="hm-dot"></span>{b.eyebrow}</div>}
          <h1><H1Text h1={ctx.h1} accent={ctx.h1Accent} /></h1>
          {b.sub && <p className="hm-lead">{b.sub}</p>}
          {cover && (
            <div style={{ width: 220, height: 280, transform: 'rotate(-3deg)', boxShadow: '0 24px 50px rgba(15,36,25,.18)', borderRadius: 10, marginTop: 8 }}>
              <Slot src={mediaUrl(cover) || undefined} alt={cover.alt} radius={10} sizes="240px" priority />
            </div>
          )}
        </div>
        <GuideSignup title={b.formTitle} sub={b.formSub} submitLabel={b.submitLabel} consent={b.consent} />
      </div>
    </section>
  );
}

async function BlogIndex({ b }: { b: Of<'blogIndex'> }) {
  const { cards, cats } = await postCards();
  return (
    <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
      <BlogList posts={cards} cats={cats} />
    </Section>
  );
}

async function SitemapList() {
  const groups = await getRouteGroups();
  return (
    <section className="hm-sec" style={{ paddingTop: 64 }}>
      <div className="hm-wrap pg-map">
        {groups.map(g => (
          <div key={g.title}>
            <h2>{g.title}</h2>
            <ul>{g.items.map(r => <li key={r.path}><a href={r.path}>{r.name}</a></li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactHub({ b, ctx }: { b: Of<'contactHub'>; ctx: Ctx }) {
  const s = ctx.site;
  const c: ContactData = {
    h1: ctx.h1, h1Accent: ctx.h1Accent,
    openBadge: b.openBadge || '', statBold: b.statBadgeBold || '', statText: b.statBadgeText || '', sub: b.sub || '',
    incTitle: b.incentiveTitle || '', incText: b.incentiveText || '', incMobile: b.incentiveMobile || b.incentiveTitle || '',
    counters: (b.counters || []).map(x => ({ value: x.value || '', label: x.label || '' })),
    stepsKicker: b.stepsKicker || '', stepsTitle: b.stepsTitle || '', stepsAccent: b.stepsAccent || '', steps: textItems(b.steps),
    desksKicker: b.desksKicker || '', desksTitle: b.desksTitle || '', desksAccent: b.desksAccent || '', desksText: b.desksText || '',
    desks: (b.desks || []).map(d => ({ title: d.title || '', sub: d.sub || '', glyph: d.glyph || '◉', color: d.color || '#d4e7c2' })),
    visitKicker: b.visitKicker || '', virtualTourUrl: b.virtualTourUrl,
    guideKicker: b.guideKicker || '', guideText: b.guideText || '', enquiriesKicker: b.enquiriesKicker || '',
    enquiries: (b.enquiries || []).map(e => ({ title: e.title || '', email: e.email || s.email })),
    faqKicker: b.faqKicker || '', faqs: b.faqs || [],
    wa: waLink(s), tel: `tel:${s.phoneRaw}`, phone: s.phone, email: s.email,
    street: s.street || '', city: s.city || '', address1: [s.street, s.city].filter(Boolean).join(', '),
    address2: `${s.region || ''} — ${s.postcode || ''}, India`, hours: s.hours || '', hoursClosed: s.hoursClosed || '', maps: s.mapsUrl || '#',
  };
  return <ContactPage builtAt={ctx.builtAt} c={c} />;
}

function NoteBlock({ b }: { b: Of<'note'> }) {
  const l = linkOf(b.link);
  return <div className="hm-wrap"><p className="hm-fine" style={{ textAlign: 'center', margin: '0 0 48px' }}>{b.text}{l && <> <a href={l.url}>{l.label}</a></>}</p></div>;
}

// ── Dispatcher ───────────────────────────────────────────────────
export function Block({ b, ctx }: { b: B; ctx: Ctx }): ReactNode {
  switch (b.blockType) {
    case 'homeHero': return <HomeHero b={b} ctx={ctx} />;
    case 'pageHero': return <PageHero b={b} ctx={ctx} />;
    case 'stats': return <Stats items={(b.items || []).map(i => ({ value: i.value, label: i.label }))} />;
    case 'programCards': return <ProgramCards b={b} />;
    case 'compare': return <Compare b={b} />;
    case 'steps': return <StepsBlock b={b} />;
    case 'founders': return <Founders b={b} />;
    case 'founderCards': return <FounderCards b={b} />;
    case 'teamPanel': return <TeamPanel b={b} />;
    case 'coaches': return <Coaches b={b} />;
    case 'iconGrid': {
      const fl = linkOf(b.fineLink);
      return (
        <Section tone={b.tone} kicker={b.kicker} title={b.title} intro={b.intro}>
          <IconGrid items={textItems(b.items)} />
          {b.note && <Note>{b.note}</Note>}
          {b.fine && <div className="hm-fine" style={{ textAlign: 'center' }}>{b.fine}{fl && <> <a href={fl.url}>{fl.label}</a>.</>}</div>}
        </Section>
      );
    }
    case 'stories': return <Stories b={b} />;
    case 'modes': return <Modes b={b} site={ctx.site} />;
    case 'guidePromo': return <GuidePromo b={b} />;
    case 'faq': return <FaqSection items={b.faqs || []} kicker={b.kicker} title={b.title || 'Questions'} id={b.anchor} intro={b.intro} wa={waLink(ctx.site)} buttonLabel={b.buttonLabel} />;
    case 'text': return <TextBlock b={b} />;
    case 'checklist': return <Checklist b={b} />;
    case 'table': return <TableBlock b={b} />;
    case 'ctaBand': return <CtaBandBlock b={b} />;
    case 'linkList': return <LinkList b={b} />;
    case 'cards': return <Cards b={b} />;
    case 'richText': return <section className="hm-sec" style={{ paddingTop: 64 }}><div className="hm-wrap"><RichText data={b.content} /></div></section>;
    case 'bookingHero': return <BookingHero b={b} ctx={ctx} />;
    case 'contactButtons': return <ContactButtons b={b} site={ctx.site} />;
    case 'guideHero': return <GuideHero b={b} ctx={ctx} />;
    case 'blogIndex': return <BlogIndex b={b} />;
    case 'sitemapList': return <SitemapList />;
    case 'contactHub': return <ContactHub b={b} ctx={ctx} />;
    case 'note': return <NoteBlock b={b} />;
    default: return null;
  }
}

export function Blocks({ blocks, ctx }: { blocks?: B[] | null; ctx: Ctx }) {
  return <>{(blocks || []).map((b, i) => <Block key={b.id || i} b={b} ctx={ctx} />)}</>;
}
