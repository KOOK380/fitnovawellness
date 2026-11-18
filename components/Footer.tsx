'use client';
// FitNova Footer V6 (Lead Capture) + mobile version — styles identical to components/footer-v6.jsx.
import type { CSSProperties, FormEvent } from 'react';
import { TOKENS as tokens } from '@/lib/data';

type L = { label: string; href: string };
export type FooterData = {
  address: string; phone: string; phoneHref: string; email: string; hours: string; hoursClosed: string;
  programs: L[]; company: L[]; legal: L[]; socials: { label: string; href: string; icon: 'ig' | 'yt' | 'fb' | 'wa' }[];
  disclaimer: string; copyright: string; brandLine: string; foundedBy: string;
  finderKicker: string; finderTitle: string; finderText: string; symptoms: { label: string; href: string; emoji: string }[];
  cbBadge: string; cbTitle: string; cbAccent: string; cbText: string; cbTextMobile: string; cbTrust: string[]; cbConcerns: string[]; cbButton: string; cbFine: string;
};
import { SocialIcon, LockupB } from './Icons';
import { submitLead } from '@/lib/lead';

const sendCallback = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
  submitLead('callback', { name: f.name, phone: f.phone, concern: f.concern, consent: f.consent, website: f.website });
};

const sectionHeading = (color = 'rgba(255,255,255,.55)'): CSSProperties => ({
  fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', color, marginBottom: 18,
});
const linkBase = (color = '#e8e2d4'): CSSProperties => ({
  color, textDecoration: 'none', fontSize: 14, lineHeight: 1.85, transition: 'color .15s, padding-left .15s', display: 'inline-block',
});
const fieldLabel: CSSProperties = {
  display: 'block', fontSize: 11.5, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: '#a8a293', marginBottom: 6,
};

function SymptomFinderStrip({ D }: { D: FooterData }) {
  const c = { bg: '#f5f1e6', fg: '#1a2f22', muted: '#5b6056', chipBg: '#fff', chipBorder: '#e3dfd0' };
  return (
    <div style={{ background: c.bg, padding: '36px 48px', fontFamily: tokens.family, color: c.fg }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto', maxWidth: 320 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.3, textTransform: 'uppercase', color: tokens.green, marginBottom: 6 }}>{D.finderKicker}</div>
          <div style={{ fontFamily: tokens.displayFamily, fontSize: 22, fontWeight: 600, letterSpacing: -0.4, lineHeight: 1.2 }}>{D.finderTitle}</div>
          <div style={{ fontSize: 13, color: c.muted, marginTop: 6 }}>{D.finderText}</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
          {D.symptoms.map(s => (
            <a key={s.label} href={s.href} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: c.chipBg, border: `1px solid ${c.chipBorder}`,
              color: c.fg, textDecoration: 'none', padding: '9px 14px', borderRadius: 999, fontSize: 13.5, fontWeight: 500,
              transition: 'all .15s ease', cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = tokens.green; e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = tokens.green; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = c.chipBorder; e.currentTarget.style.background = c.chipBg; e.currentTarget.style.color = c.fg; }}>
              <span style={{ color: tokens.green, fontSize: 15 }} aria-hidden="true">{s.emoji}</span>
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function DarkInput({ placeholder, type = 'text', name, options, id }: { placeholder: string; type?: string; name: string; options?: string[]; id: string }) {
  const required = name === 'name' || name === 'phone';
  const baseStyle: CSSProperties = {
    width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.18)',
    borderRadius: 8, padding: '12px 14px', fontSize: 14, color: '#fff', fontFamily: 'inherit', outline: 'none', transition: 'border .15s, background .15s',
  };
  const focus = (e: { target: HTMLElement }) => { e.target.style.borderColor = '#53b52a'; };
  const blur = (e: { target: HTMLElement }) => { e.target.style.borderColor = 'rgba(255,255,255,.18)'; };
  if (type === 'select') {
    return (
      <select id={id} name={name} defaultValue="" style={{ ...baseStyle, appearance: 'none', cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
        <option value="" disabled style={{ color: '#888' }}>{placeholder}</option>
        {options!.map(o => <option key={o} value={o} style={{ color: '#1a1a1a' }}>{o}</option>)}
      </select>
    );
  }
  return <input id={id} type={type} name={name} placeholder={placeholder} required={required} autoComplete={name === 'phone' ? 'tel' : name} style={baseStyle} onFocus={focus} onBlur={blur} />;
}

const PhoneIcon = ({ s }: { s: number }) => (
  <svg width={s} height={s} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H5zm5 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5-3H5V4h10v9z" /></svg>
);

function FooterV6({ D }: { D: FooterData }) {
  return (
    <div style={{ fontFamily: tokens.family }}>
      <SymptomFinderStrip D={D} />
      <div style={{ background: '#0f2419', color: '#e8e2d4', padding: '64px 48px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 56, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,.1)', alignItems: 'start' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: tokens.lime, fontWeight: 700, letterSpacing: 1.3, textTransform: 'uppercase',
                marginBottom: 12, background: 'rgba(83,181,42,.12)', padding: '5px 10px', borderRadius: 99, border: '1px solid rgba(83,181,42,.3)',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: 3, background: tokens.lime, display: 'inline-block' }} />
                {D.cbBadge}
              </div>
              <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 32, lineHeight: 1.15, fontWeight: 600, letterSpacing: -0.6, color: '#fff', margin: '0 0 14px' }}>
                {D.cbTitle} <span style={{ fontStyle: 'italic', color: tokens.lime }}>{D.cbAccent}</span>
              </h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#c9c2b0', maxWidth: 380, margin: '0 0 24px' }}>
                {D.cbText}
              </p>
              <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(83,181,42,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.lime, flexShrink: 0 }}>
                  <PhoneIcon s={20} />
                </div>
                <div>
                  <div style={{ fontSize: 11.5, color: '#a8a293', letterSpacing: 0.4, textTransform: 'uppercase', fontWeight: 600 }}>Or call us directly</div>
                  <a href={D.phoneHref} style={{ color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 24, letterSpacing: -0.3, fontFamily: tokens.displayFamily }}>{D.phone}</a>
                  <div style={{ fontSize: 12.5, color: '#a8a293', marginTop: 2 }}>{D.hours}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
                {D.cbTrust.map(t => (
                  <span key={t} style={{ fontSize: 12, color: '#c9c2b0', padding: '5px 11px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 99, fontWeight: 500 }}>✓ {t}</span>
                ))}
              </div>
            </div>

            <form onSubmit={sendCallback} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="fd-name" style={fieldLabel}>Full name</label>
                  <DarkInput id="fd-name" name="name" placeholder="e.g. Priya Sharma" />
                </div>
                <div>
                  <label htmlFor="fd-phone" style={fieldLabel}>Phone (we&apos;ll WhatsApp)</label>
                  <DarkInput id="fd-phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label htmlFor="fd-concern" style={fieldLabel}>What&apos;s your main concern?</label>
                  <DarkInput id="fd-concern" name="concern" type="select" placeholder="Choose one"
                    options={D.cbConcerns} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ ...fieldLabel, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400, fontSize: 13, marginTop: 4 }}>
                    <input type="checkbox" name="consent" defaultChecked style={{ accentColor: tokens.lime, width: 14, height: 14 }} />
                    Yes, I&apos;m happy to receive a call/WhatsApp from FitNova.
                  </label>
                </div>
              </div>
              <button type="submit" style={{
                marginTop: 18, width: '100%', background: tokens.lime, color: '#0f2419', border: 'none', padding: '14px 22px', borderRadius: 10,
                fontSize: 15, fontWeight: 700, letterSpacing: 0.2, cursor: 'pointer', fontFamily: 'inherit',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>{D.cbButton}</button>
              <div style={{ fontSize: 11.5, color: '#a8a293', marginTop: 10, textAlign: 'center' }}>
                {D.cbFine}
              </div>
            </form>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 48, padding: '48px 0 32px' }}>
            <div>
              <div style={{ marginBottom: 16 }}><LockupB height={42} green="#fff" lime={tokens.lime} family={tokens.displayFamily} /></div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#c9c2b0', maxWidth: 300, margin: '0 0 18px' }}>{D.brandLine}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {D.socials.map(s => (
                  <a key={s.href} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" style={{
                    width: 34, height: 34, borderRadius: 17, border: '1px solid rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e8e2d4', textDecoration: 'none',
                  }}><SocialIcon kind={s.icon} size={14} /></a>
                ))}
              </div>
            </div>
            <nav aria-label="Programs">
              <div style={sectionHeading()}>Programs</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {D.programs.map(p => <li key={p.label}><a href={p.href} style={linkBase()}>{p.label}</a></li>)}
              </ul>
            </nav>
            <nav aria-label="Company">
              <div style={sectionHeading()}>Company</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {D.company.map(p => <li key={p.label}><a href={p.href} style={linkBase()}>{p.label}</a></li>)}
              </ul>
            </nav>
            <div>
              <div style={sectionHeading()}>Visit / Connect</div>
              <address style={{ fontSize: 13.5, lineHeight: 1.7, color: '#e8e2d4', fontStyle: 'normal' }}>
                <div style={{ marginBottom: 10, display: 'flex', gap: 8 }}>
                  <span style={{ color: tokens.lime, marginTop: 2 }} aria-hidden="true">◉</span>
                  <span>{D.address}</span>
                </div>
                <div style={{ marginBottom: 6 }}><a href={`mailto:${D.email}`} style={{ color: '#e8e2d4', textDecoration: 'none' }}>{D.email}</a></div>
                <div style={{ fontSize: 13, color: '#a8a293', borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 10, marginTop: 10 }}>
                  {D.hours}<br /><span style={{ color: '#7d7868' }}>{D.hoursClosed}</span>
                </div>
              </address>
            </div>
          </div>

          <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#a8a293' }}>
            <span>Founded by <b style={{ color: '#fff', fontWeight: 600 }}>{D.foundedBy}</b> · Lifestyle Medicine, Pune</span>
            <span>{D.copyright}</span>
          </div>
          <div style={{ padding: '16px 0 0', fontSize: 11.5, lineHeight: 1.6, color: '#857f70' }}>
            <b style={{ color: '#a8a293', fontWeight: 600 }}>Medical Disclaimer:</b> {D.disclaimer}
          </div>
          <div style={{ margin: '24px 0 0', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12, color: '#a8a293' }}>
            {D.legal.map(l => <a key={l.label} href={l.href} style={{ color: '#a8a293', textDecoration: 'none' }}>{l.label}</a>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFooterV6({ D }: { D: FooterData }) {
  return (
    <div style={{ fontFamily: tokens.family, background: '#0f2419', color: '#e8e2d4' }}>
      <div style={{ background: '#f5f1e6', color: '#1a2f22', padding: '24px 0 24px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: tokens.green, marginBottom: 4, paddingRight: 18 }}>{D.finderKicker}</div>
        <div style={{ fontFamily: tokens.displayFamily, fontSize: 19, fontWeight: 600, marginBottom: 14, paddingRight: 18, letterSpacing: -0.3 }}>{D.finderTitle}</div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, paddingRight: 18, scrollSnapType: 'x mandatory' }}>
          {D.symptoms.map(s => (
            <a key={s.label} href={s.href} style={{
              flexShrink: 0, scrollSnapAlign: 'start', display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', border: '1px solid #e3dfd0',
              color: '#1a2f22', textDecoration: 'none', padding: '8px 13px', borderRadius: 999, fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap',
            }}>
              <span style={{ color: tokens.green }} aria-hidden="true">{s.emoji}</span>
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ padding: '32px 18px 28px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: tokens.lime, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase',
          marginBottom: 10, background: 'rgba(83,181,42,.12)', padding: '4px 9px', borderRadius: 99, border: '1px solid rgba(83,181,42,.3)',
        }}>{D.cbBadge}</div>
        <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 24, lineHeight: 1.18, fontWeight: 600, color: '#fff', margin: '0 0 10px' }}>
          {D.cbTitle} <span style={{ fontStyle: 'italic', color: tokens.lime }}>{D.cbAccent}</span>
        </h2>
        <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#c9c2b0', margin: '0 0 18px' }}>{D.cbTextMobile}</p>

        <form onSubmit={sendCallback} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 14, padding: 18, display: 'grid', gap: 12 }}>
          <div><label htmlFor="fm-name" style={fieldLabel}>Full name</label><DarkInput id="fm-name" name="name" placeholder="e.g. Priya Sharma" /></div>
          <div><label htmlFor="fm-phone" style={fieldLabel}>Phone</label><DarkInput id="fm-phone" name="phone" type="tel" placeholder="+91 98765 43210" /></div>
          <div>
            <label htmlFor="fm-concern" style={fieldLabel}>Main concern</label>
            <DarkInput id="fm-concern" name="concern" type="select" placeholder="Choose one" options={D.cbConcerns} />
          </div>
          <label style={{ fontSize: 12, color: '#c9c2b0', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.4 }}>
            <input type="checkbox" name="consent" defaultChecked style={{ accentColor: tokens.lime, marginTop: 2 }} />
            Yes, FitNova may call/WhatsApp me.
          </label>
          <button type="submit" style={{ background: tokens.lime, color: '#0f2419', border: 'none', padding: '14px 18px', borderRadius: 10, fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{D.cbButton}</button>
        </form>

        <a href={D.phoneHref} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16, padding: '14px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, textDecoration: 'none' }}>
          <div style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(83,181,42,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tokens.lime }}>
            <PhoneIcon s={18} />
          </div>
          <div>
            <div style={{ fontSize: 10.5, color: '#a8a293', textTransform: 'uppercase', letterSpacing: 0.4, fontWeight: 600 }}>Or call directly</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: tokens.displayFamily }}>{D.phone}</div>
          </div>
        </a>
      </div>

      <div style={{ padding: '0 18px 24px' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 18 }}>
          <div style={sectionHeading()}>Programs</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 14px' }}>
            {D.programs.map(p => <li key={p.label}><a href={p.href} style={{ ...linkBase(), fontSize: 13 }}>{p.label}</a></li>)}
          </ul>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 18, marginTop: 18 }}>
          <div style={sectionHeading()}>Company</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 14px' }}>
            {D.company.map(p => <li key={p.label}><a href={p.href} style={{ ...linkBase(), fontSize: 13 }}>{p.label}</a></li>)}
          </ul>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 18, marginTop: 18, fontSize: 13, lineHeight: 1.7 }}>
          <div style={sectionHeading()}>Visit</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <span style={{ color: tokens.lime, marginTop: 2 }} aria-hidden="true">◉</span>
            <span>{D.address}</span>
          </div>
          <a href={`mailto:${D.email}`} style={{ color: '#e8e2d4', textDecoration: 'none' }}>{D.email}</a>
          <div style={{ color: '#a8a293', marginTop: 6 }}>{D.hours} · <span style={{ color: '#7d7868' }}>{D.hoursClosed}</span></div>
        </div>
      </div>

      <div style={{ padding: '0 18px 20px', display: 'flex', justifyContent: 'center', gap: 12 }}>
        {D.socials.map(s => (
          <a key={s.href} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer" style={{
            width: 38, height: 38, borderRadius: 19, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.18)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#e8e2d4', textDecoration: 'none',
          }}><SocialIcon kind={s.icon} size={15} /></a>
        ))}
      </div>

      <div style={{ padding: '16px 18px', borderTop: '1px solid rgba(255,255,255,.1)', fontSize: 11, color: '#857f70', lineHeight: 1.55 }}>
        <b style={{ color: '#a8a293', fontWeight: 600 }}>Medical Disclaimer:</b> {D.disclaimer.length > 200 ? D.disclaimer.slice(0, 200) + '…' : D.disclaimer}
      </div>
      <div style={{ padding: '12px 18px 18px', fontSize: 11, color: '#a8a293', textAlign: 'center' }}>
        {D.copyright}
        <div style={{ marginTop: 6, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {D.legal.map(l => <a key={l.label} href={l.href} style={{ color: '#a8a293', textDecoration: 'none' }}>{l.label}</a>)}
        </div>
      </div>
    </div>
  );
}

// Original switches at 900px via JS; here both render server-side and CSS picks one (no layout flash).
export default function Footer({ d }: { d: FooterData }) {
  return (
    <footer data-screen-label="Footer">
      <div className="ft-desk"><FooterV6 D={d} /></div>
      <div className="ft-mob"><MobileFooterV6 D={d} /></div>
    </footer>
  );
}
