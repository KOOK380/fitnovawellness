'use client';

import { useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/lead';
import { Ico } from './Icons';

// Desktop nav item with hover/focus dropdown (same markup and classes as the homepage design).
export function NavDropdown({ label, href, items }: { label: string; href: string; items: { label: string; href: string }[] }) {
  const [dd, setDd] = useState(false);
  return (
    <div className="hm-dd" onMouseEnter={() => setDd(true)} onMouseLeave={() => setDd(false)} onFocus={() => setDd(true)} onBlur={() => setDd(false)}>
      <a href={href} aria-haspopup="true" aria-expanded={dd}>{label} <Ico.Chev /></a>
      {dd && <div className="hm-dd-menu">{items.map(p => <a key={p.href} href={p.href}>{p.label}</a>)}</div>}
    </div>
  );
}

// Clicking a chip selects it (as in the design); the green button then opens that chip's page.
export type Chip = { label: string; url: string };
export function HeroFinder({ question, chips, ctaLabel, ctaChosenLabel, ctaUrl, waLabel, wa }: {
  question: string; chips: Chip[]; ctaLabel: string; ctaChosenLabel: string; ctaUrl: string; waLabel: string; wa: string;
}) {
  const [pick, setPick] = useState<number | null>(null);
  const href = pick !== null ? chips[pick].url : ctaUrl;
  return (
    <>
      <div className="hm-finder">
        <div className="hm-finder-q">{question}</div>
        <div className="hm-chips">
          {chips.map((c, i) => (
            <button key={c.label} type="button" aria-pressed={pick === i} className={'hm-chip' + (pick === i ? ' on' : '')} onClick={() => setPick(i)}>{c.label}</button>
          ))}
        </div>
      </div>
      <div className="hm-hero-ctas">
        <a href={href} className="hm-btn hm-btn-primary hm-btn-lg">{pick !== null ? `${ctaChosenLabel} ${chips[pick].label.toLowerCase()}` : ctaLabel} <Ico.Arrow /></a>
        <a href={wa} className="hm-btn hm-btn-ghost hm-btn-lg">{Ico.wa(17)} {waLabel}</a>
      </div>
    </>
  );
}

// FAQ accordion (homepage design). Answers stay in the HTML for search engines; closed ones are hidden.
export function FaqList({ items, id = 'faq' }: { items: string[][]; id?: string }) {
  const [o, setO] = useState(0);
  return (
    <div className="hm-faq">
      {items.map(([q, a], i) => (
        <div key={q} className={'hm-faq-i' + (o === i ? ' open' : '')}>
          <button type="button" aria-expanded={o === i} aria-controls={`${id}-${i}`} onClick={() => setO(o === i ? -1 : i)}>
            <span>{q}</span><span className="hm-faq-p" aria-hidden="true">+</span>
          </button>
          <p id={`${id}-${i}`} hidden={o !== i}>{a}</p>
        </div>
      ))}
    </div>
  );
}

const fd = (e: FormEvent<HTMLFormElement>) => Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

export function GuideForm({ id = 'guide-email', label = 'Send me the guide' }: { id?: string; label?: string | null }) {
  return (
    <form className="hm-guide-form" onSubmit={e => { e.preventDefault(); const f = fd(e); submitLead('guide', { email: f.email, consent: 'yes' }); }}>
      <label htmlFor={id} className="sr-only">Your email address</label>
      <input id={id} type="email" name="email" placeholder="Your email address" autoComplete="email" required />
      <button className="hm-btn hm-btn-primary">{label || 'Send me the guide'}</button>
    </form>
  );
}
