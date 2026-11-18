'use client';
// FitNova Contact Us — Variant 4 "Booking Hub" (desktop + mobile).
// Styles and copy identical to components/contact-v4.jsx, contact.jsx (CONTACT, Ic, MapPlaceholder)
// and contact-variants.jsx (FAQStrip) in the design folder.
import { useEffect, useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/lead';

const sendGuide = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  submitLead('guide', { email: String(new FormData(e.currentTarget).get('email') || ''), consent: 'yes' });
};
import { TOKENS as tokens } from '@/lib/data';

type Item = { title: string; text?: string | null };
export type ContactData = {
  h1: string; h1Accent?: string | null;
  openBadge: string; statBold: string; statText: string; sub: string;
  incTitle: string; incText: string; incMobile: string; counters: { value: string; label: string }[];
  stepsKicker: string; stepsTitle: string; stepsAccent: string; steps: Item[];
  desksKicker: string; desksTitle: string; desksAccent: string; desksText: string; desks: { title: string; sub: string; glyph: string; color: string }[];
  visitKicker: string; virtualTourUrl?: string | null;
  guideKicker: string; guideText: string; enquiriesKicker: string; enquiries: { title: string; email: string }[];
  faqKicker: string; faqs: { q: string; a: string }[];
  wa: string; tel: string; phone: string; email: string; street: string; city: string; address1: string; address2: string; hours: string; hoursClosed: string; maps: string;
};
const H1 = ({ c }: { c: ContactData }) => {
  const a = c.h1Accent && c.h1.endsWith(c.h1Accent) ? c.h1Accent : '';
  return <>{a ? c.h1.slice(0, -a.length).trim() : c.h1}{' '}<br />{a && <span style={{ fontStyle: 'italic', color: tokens.green }}>{a}</span>}</>;
};

// Section side padding: 56px at the 1280px design width; content stays 1168px wide on larger screens.
const sidePad = 'max(56px, calc((100% - 1168px) / 2))';

const svgProps = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
const Ic = {
  phone: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" strokeWidth="1.7" {...svgProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  mail: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" strokeWidth="1.7" {...svgProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  pin: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" strokeWidth="1.7" {...svgProps}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  clock: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" strokeWidth="1.7" {...svgProps}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  wa: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>,
  arrow: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" strokeWidth="2" {...svgProps}><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
  check: (s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" strokeWidth="2.4" {...svgProps}><path d="M20 6 9 17l-5-5" /></svg>,
};

// ── Booking calendar: next open days in IST (Mon–Sat, 10 AM – 7 PM; Sunday closed) ──
const IST_OFFSET = 330 * 60000;
const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MO = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
type Day = { n: string; d: string; sub: string; today: boolean };

// Slot label -> minutes after midnight ("2:00" without AM/PM means afternoon, as in the design's mobile slots)
function slotMinutes(label: string) {
  const [, h, m, ap] = label.match(/(d+):(d+)s*(AM|PM)?/) || [];
  let hr = Number(h);
  if (ap === 'PM' && hr !== 12) hr += 12;
  if (!ap && hr < 10) hr += 12;
  return hr * 60 + Number(m);
}

function openDays(now: number, count: number, lastSlot: number): Day[] {
  const ist = new Date(now + IST_OFFSET); // read with UTC getters = IST wall clock
  const minsNow = ist.getUTCHours() * 60 + ist.getUTCMinutes();
  const out: Day[] = [];
  let offset = minsNow < lastSlot ? 0 : 1; // today only if a slot is still ahead
  while (out.length < count) {
    const d = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() + offset));
    if (d.getUTCDay() !== 0) out.push({ n: WD[d.getUTCDay()], d: String(d.getUTCDate()), sub: MO[d.getUTCMonth()], today: offset === 0 });
    offset++;
  }
  return out;
}

// Starts from the build date (same on server and first client render), then updates to today in the browser.
function useOpenDays(builtAt: number, count: number, slots: string[]) {
  const last = slotMinutes(slots[slots.length - 1]);
  const [days, setDays] = useState(() => openDays(builtAt, count, last));
  const [now, setNow] = useState(builtAt);
  useEffect(() => { const t = Date.now(); setNow(t); setDays(openDays(t, count, last)); }, [count, last]);
  const ist = new Date(now + IST_OFFSET);
  const minsNow = ist.getUTCHours() * 60 + ist.getUTCMinutes();
  // A slot is unavailable only if it is today and already past (or starting within 30 minutes).
  const isPast = (dayIdx: number, slotLabel: string) => !!days[dayIdx]?.today && slotMinutes(slotLabel) <= minsNow + 30;
  return { days, isPast };
}

// Step 2 = the booking form, carrying the chosen slot (shown there and sent with the request).
function slotLabel(m: number) {
  const h = Math.floor(m / 60), mm = String(m % 60).padStart(2, '0');
  return `${((h + 11) % 12) + 1}:${mm} ${h < 12 ? 'AM' : 'PM'}`;
}
function goToStep2(day: Day, slot: string) {
  const v = `${day.n} ${day.d} ${day.sub} · ${slotLabel(slotMinutes(slot))} IST`;
  window.location.href = '/book-consultation/?slot=' + encodeURIComponent(v);
}

function MapPlaceholder({ height = 360, maps }: { height?: number; maps: string }) {
  const land = '#eef2e6', water = '#cfe1eb', road = '#fff', stroke = '#d6d2c1';
  return (
    <div style={{ position: 'relative', width: '100%', height, background: land, borderRadius: 12, overflow: 'hidden', border: `1px solid ${stroke}` }}>
      <svg width="100%" height="100%" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }} role="img" aria-label="Map: FitNova Wellness clinic on Sinhagad Road, Pune">
        <rect width="600" height="400" fill={land} />
        <path d="M-20 280 Q 100 250 200 270 T 420 240 T 640 220" stroke={water} strokeWidth="34" fill="none" />
        <ellipse cx="120" cy="120" rx="80" ry="50" fill="#dde7c8" />
        <ellipse cx="480" cy="330" rx="100" ry="60" fill="#dde7c8" />
        <path d="M0 60 L 600 80" stroke={road} strokeWidth="6" />
        <path d="M0 200 L 600 195" stroke={road} strokeWidth="9" />
        <path d="M0 360 L 600 340" stroke={road} strokeWidth="5" />
        <path d="M150 0 L 170 400" stroke={road} strokeWidth="6" />
        <path d="M340 0 L 320 400" stroke={road} strokeWidth="9" />
        <path d="M500 0 L 510 400" stroke={road} strokeWidth="5" />
        <g stroke={road} strokeWidth="2" opacity="0.7">
          <path d="M60 0 L 70 400" /><path d="M250 0 L 240 400" /><path d="M420 0 L 410 400" />
          <path d="M0 130 L 600 140" /><path d="M0 280 L 600 270" />
        </g>
        <text x="40" y="50" fill="#8b8a78" fontSize="11" fontFamily="monospace">Sinhagad Rd</text>
        <text x="380" y="200" fill="#8b8a78" fontSize="10" fontFamily="monospace">Mutha River</text>
        <text x="160" y="380" fill="#8b8a78" fontSize="10" fontFamily="monospace">Vadgaon Bk</text>
      </svg>
      <div style={{ position: 'absolute', left: '52%', top: '46%', transform: 'translate(-50%, -100%)' }}>
        <div style={{
          background: tokens.green, color: '#fff', padding: '8px 14px 8px 10px', borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12.5, fontWeight: 600, boxShadow: '0 6px 16px rgba(0,0,0,.18)', fontFamily: tokens.family, whiteSpace: 'nowrap',
        }}>
          <span style={{ color: tokens.lime }}>{Ic.pin(13)}</span>
          FitNova · Pune
        </div>
        <div style={{ width: 0, height: 0, margin: '-2px auto 0', borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: `9px solid ${tokens.green}` }} />
      </div>
      <a href={maps} target="_blank" rel="noopener noreferrer" style={{
        position: 'absolute', right: 14, bottom: 14, fontFamily: tokens.family, background: '#fff', color: '#1a2f22', padding: '8px 14px', borderRadius: 8,
        fontSize: 12, fontWeight: 600, textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,.12)', display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>Open in Google Maps {Ic.arrow(12)}</a>
    </div>
  );
}

function FAQStrip({ c }: { c: ContactData }) {
  const subFg = '#ffffffaa';
  return (
    <section style={{ background: '#0f2419', color: '#f0ebe0', padding: `64px ${sidePad}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 56 }}>
        <div>
          <div style={{ fontSize: 11.5, color: tokens.lime, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>{c.faqKicker}</div>
          <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 38, fontWeight: 500, margin: 0, letterSpacing: -1, lineHeight: 1.05 }}>
            Before you<br />
            <span style={{ fontStyle: 'italic', color: tokens.lime }}>reach out.</span>
          </h2>
          <p style={{ fontSize: 14.5, color: subFg, marginTop: 14, lineHeight: 1.55, maxWidth: 320 }}>Quick answers to the questions we hear most often.</p>
        </div>
        <div>
          {c.faqs.map((it, i) => (
            <div key={i} style={{ padding: '18px 0', borderBottom: i < c.faqs.length - 1 ? '1px solid #ffffff20' : 'none' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, fontFamily: tokens.displayFamily, letterSpacing: -0.2 }}>{it.q}</h3>
              <div style={{ fontSize: 14, color: subFg, lineHeight: 1.55 }}>{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactV4({ builtAt, c }: { builtAt: number; c: ContactData }) {
  const [day, setDay] = useState(2);
  const [slot, setSlot] = useState(3);
  const slots = ['10:30 AM', '11:30 AM', '12:30 PM', '2:00 PM', '3:30 PM', '4:30 PM', '5:30 PM', '6:30 PM'];
  const { days, isPast } = useOpenDays(builtAt, 6, slots);
  const pickDay = (i: number) => { setDay(i); if (isPast(i, slots[slot])) setSlot(Math.max(0, slots.findIndex(x => !isPast(i, x)))); };

  return (
    <div style={{ fontFamily: tokens.family, background: '#faf8f3', color: '#1a1a1a', position: 'relative' }}>
      {/* 1. Hero with live signal */}
      <section style={{ padding: `52px ${sidePad} 28px`, borderBottom: '1px solid #e8e3d6', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#1a4d2a', fontWeight: 700, padding: '5px 11px', background: '#dff1d9', borderRadius: 99 }}>
                <span style={{ width: 7, height: 7, borderRadius: 4, background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,.18)' }} />
                <span>{c.openBadge}</span>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b6a63', padding: '5px 11px', border: '1px solid #e3e0d4', background: '#fff', borderRadius: 99 }}>
                <b style={{ color: '#1a1a1a' }}>{c.statBold}</b>
                <span>{c.statText}</span>
              </div>
            </div>
            <h1 style={{ fontFamily: tokens.displayFamily, fontSize: 56, lineHeight: 1.02, fontWeight: 600, letterSpacing: -1.8, margin: '0 0 18px' }}>
              <H1 c={c} />
            </h1>
            <p style={{ fontSize: 16.5, color: '#555', maxWidth: 480, margin: '0 0 24px', lineHeight: 1.55 }}>
              {c.sub}
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: '#fff7d6', border: '1px solid #f0e6a8', borderRadius: 12, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: tokens.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" {...svgProps}>
                  <path d="M20 12V8H6a2 2 0 1 1 0-4h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
                </svg>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.4 }}>
                <b style={{ color: '#1a1a1a' }}>{c.incTitle}</b><br />
                <span style={{ color: '#6b5a1a' }}>{c.incText}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 24, paddingTop: 18, borderTop: '1px solid #e8e3d6', maxWidth: 460 }}>
              {c.counters.map(x => ({ n: x.value, l: x.label })).map((s, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{ fontFamily: tokens.displayFamily, fontSize: 28, fontWeight: 600, color: tokens.green, letterSpacing: -0.5 }}>{s.n}</div>
                  <div style={{ fontSize: 12, color: '#6b6a63', marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar / time-slot booking widget */}
          <div style={{ background: '#fff', border: '1px solid #ece8d8', borderRadius: 18, padding: 24, boxShadow: '0 12px 40px rgba(20,40,20,.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: tokens.green, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Step 1 of 2</div>
                <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 22, fontWeight: 600, marginTop: 2, letterSpacing: -0.3 }}>Pick a time</h2>
              </div>
              <div style={{ fontSize: 12, color: '#6b6a63', textAlign: 'right' }}>
                IST · 15 min<br />
                <span style={{ color: tokens.green, fontWeight: 600 }}>Free consultation</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 16 }}>
              {days.map((dx, i) => (
                <button key={i} type="button" aria-pressed={day === i} onClick={() => pickDay(i)} style={{
                  padding: '10px 4px', borderRadius: 10, cursor: 'pointer', border: day === i ? `2px solid ${tokens.green}` : '1px solid #ece8d8',
                  background: day === i ? '#f0f8ed' : '#fff', fontFamily: tokens.family, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, color: '#6b6a63', textTransform: 'uppercase', letterSpacing: 0.4 }}>{dx.n}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginTop: 2 }}>{dx.d}</div>
                  <div style={{ fontSize: 10, color: '#8a897e', marginTop: 1 }}>{dx.sub}</div>
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 18 }}>
              {slots.map((s, i) => {
                const isTaken = isPast(day, s);
                const isSelected = slot === i;
                return (
                  <button key={i} type="button" disabled={isTaken} aria-pressed={isSelected} onClick={() => setSlot(i)} style={{
                    padding: '10px 4px', borderRadius: 8, cursor: isTaken ? 'not-allowed' : 'pointer',
                    border: isSelected ? `2px solid ${tokens.green}` : '1px solid #ece8d8',
                    background: isSelected ? tokens.green : (isTaken ? '#f6f4ee' : '#fff'),
                    color: isSelected ? '#fff' : (isTaken ? '#bcb9ad' : '#1a1a1a'),
                    fontSize: 12.5, fontWeight: 600, fontFamily: tokens.family, textDecoration: isTaken ? 'line-through' : 'none',
                  }}>{s}</button>
                );
              })}
            </div>

            <div style={{ background: '#faf8f3', borderRadius: 10, padding: '12px 14px', marginBottom: 14, fontSize: 12.5, color: '#555', display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ color: tokens.green }}>{Ic.check(15)}</span>
              <span>Booking <b style={{ color: '#1a1a1a' }}>{days[day].n} {days[day].d} {days[day].sub} · {slots[slot]}</b></span>
            </div>

            <button type="button" onClick={() => goToStep2(days[day], slots[slot])} style={{
              width: '100%', background: tokens.green, color: '#fff', padding: '14px 22px', borderRadius: 12, border: 'none',
              fontSize: 15, fontWeight: 700, fontFamily: tokens.family, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              Continue · Step 2 (your details) {Ic.arrow(15)}
            </button>
            <div style={{ fontSize: 11.5, color: '#8a897e', textAlign: 'center', marginTop: 10 }}>No card needed · cancel any time</div>
          </div>
        </div>
      </section>

      {/* 2. What happens next */}
      <section style={{ padding: `56px ${sidePad} 40px` }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11.5, color: tokens.green, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>{c.stepsKicker}</div>
          <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 36, fontWeight: 500, margin: 0, letterSpacing: -1, lineHeight: 1.1 }}>
            {c.stepsTitle} <span style={{ fontStyle: 'italic', color: tokens.green }}>{c.stepsAccent}</span>
          </h2>
        </div>
        <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, position: 'relative', listStyle: 'none', padding: 0, margin: 0 }}>
          <li aria-hidden="true" style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, borderTop: `1.5px dashed ${tokens.green}55`, zIndex: 0 }} />
          {c.steps.map((x, i) => ({ n: i + 1, t: x.title, d: x.text })).map((s, i) => (
            <li key={i} style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 28, background: '#fff', border: `2px solid ${tokens.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: tokens.displayFamily, fontSize: 22, fontWeight: 600, color: tokens.green, margin: '0 auto 16px',
              }}>{s.n}</div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: '#1a1a1a' }}>{s.t}</h3>
                <div style={{ fontSize: 13, color: '#6b6a63', lineHeight: 1.5 }}>{s.d}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 3. Concern-specific desks */}
      <section style={{ padding: `40px ${sidePad} 56px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11.5, color: tokens.green, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 }}>{c.desksKicker}</div>
            <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 32, fontWeight: 500, margin: 0, letterSpacing: -0.8, lineHeight: 1.1 }}>
              {c.desksTitle} <span style={{ fontStyle: 'italic', color: tokens.green }}>{c.desksAccent}</span>
            </h2>
          </div>
          <p style={{ fontSize: 13.5, color: '#6b6a63', margin: 0, maxWidth: 320, textAlign: 'right' }}>
            {c.desksText}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {c.desks.map(x => ({ t: x.title, sub: x.sub, glyph: x.glyph, color: x.color })).map((d, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #ece8d8', borderRadius: 16, padding: 24, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: d.color, opacity: 0.6 }} />
              <div style={{ position: 'relative' }}>
                <div aria-hidden="true" style={{ fontFamily: tokens.displayFamily, fontSize: 30, fontWeight: 600, color: tokens.green, marginBottom: 16 }}>{d.glyph}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{d.t}</h3>
                <div style={{ fontSize: 12.5, color: '#6b6a63', marginBottom: 18, lineHeight: 1.4 }}>{d.sub}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={c.wa} aria-label={`WhatsApp the ${d.t}`} style={{
                    flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 12px', background: '#25D366', color: '#fff', borderRadius: 8,
                    fontSize: 12.5, fontWeight: 600, textDecoration: 'none',
                  }}>{Ic.wa(13)} WhatsApp</a>
                  <a href={c.tel} aria-label={`Call the ${d.t}`} style={{
                    flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 12px', background: 'transparent', color: tokens.green,
                    border: `1px solid ${tokens.green}`, borderRadius: 8, fontSize: 12.5, fontWeight: 600, textDecoration: 'none',
                  }}>{Ic.phone(13)} Call</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Map + visit info */}
      <section style={{
        background: '#fff', borderTop: '1px solid #e8e3d6', borderBottom: '1px solid #e8e3d6', padding: `56px ${sidePad}`,
        display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11.5, color: tokens.green, fontWeight: 700, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>{c.visitKicker}</div>
          <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 36, fontWeight: 500, margin: '0 0 18px', letterSpacing: -1, lineHeight: 1.05 }}>
            {c.street},<br />
            <span style={{ fontStyle: 'italic', color: tokens.green }}>{c.city}.</span>
          </h2>
          <address style={{ display: 'grid', gap: 14, fontSize: 14, color: '#1a1a1a', marginBottom: 22, fontStyle: 'normal' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: tokens.green, marginTop: 2 }}>{Ic.pin(16)}</span>
              <span>{c.address1}<br /><span style={{ color: '#6b6a63' }}>{c.address2}</span></span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: tokens.green }}>{Ic.clock(16)}</span>
              <span>{c.hours} · <span style={{ color: '#6b6a63' }}>{c.hoursClosed}</span></span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: tokens.green }}>{Ic.phone(16)}</span>
              <a href={c.tel} style={{ color: '#1a1a1a', textDecoration: 'none' }}>{c.phone}</a>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ color: tokens.green }}>{Ic.mail(16)}</span>
              <a href={`mailto:${c.email}`} style={{ color: '#1a1a1a', textDecoration: 'none' }}>{c.email}</a>
            </div>
          </address>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={c.maps} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', background: '#0f2419', color: '#fff', borderRadius: 99, fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>Get directions {Ic.arrow(14)}</a>
            {c.virtualTourUrl && <a href={c.virtualTourUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '11px 18px', border: '1px solid #ece8d8', color: '#1a1a1a', borderRadius: 99, fontSize: 13.5, fontWeight: 600, textDecoration: 'none', background: '#fff' }}>Virtual tour</a>}
          </div>
        </div>
        <MapPlaceholder height={380} maps={c.maps} />
      </section>

      {/* 5. Soft conversion: free guide + other enquiries */}
      <section style={{ padding: `56px ${sidePad} 56px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: `linear-gradient(135deg, ${tokens.green} 0%, #0f3a21 100%)`, color: '#fff', borderRadius: 20, padding: 36, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -80, bottom: -80, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${tokens.lime}55 0%, transparent 70%)` }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 11.5, color: tokens.lime, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{c.guideKicker}</div>
              <h3 style={{ fontFamily: tokens.displayFamily, fontSize: 26, fontWeight: 500, margin: '0 0 10px', letterSpacing: -0.5, lineHeight: 1.15 }}>
                Get our 7-Day <span style={{ fontStyle: 'italic', color: tokens.lime }}>Gut Reset</span> guide — free.
              </h3>
              <p style={{ fontSize: 13.5, color: '#ffffffcc', margin: '0 0 20px', lineHeight: 1.5, maxWidth: 360 }}>
                {c.guideText}
              </p>
              <form onSubmit={sendGuide} style={{ display: 'flex', gap: 6 }}>
                <label htmlFor="ct-guide-email" className="sr-only">Email address</label>
                <input id="ct-guide-email" type="email" name="email" autoComplete="email" style={{
                  flex: 1, padding: '12px 14px', fontSize: 14, background: '#ffffff15', color: '#fff', border: '1px solid #ffffff33', borderRadius: 10, outline: 'none',
                }} placeholder="your@email.com" />
                <button style={{ background: tokens.lime, color: '#0a2418', padding: '12px 18px', borderRadius: 10, border: 'none', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}>Send me the guide</button>
              </form>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #ece8d8', borderRadius: 20, padding: 36 }}>
            <div style={{ fontSize: 11.5, color: tokens.green, fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{c.enquiriesKicker}</div>
            <h3 style={{ fontFamily: tokens.displayFamily, fontSize: 26, fontWeight: 500, margin: '0 0 18px', letterSpacing: -0.5, lineHeight: 1.15 }}>
              Press, partnerships,<br /><span style={{ fontStyle: 'italic', color: tokens.green }}>and careers.</span>
            </h3>
            <div style={{ display: 'grid', gap: 10 }}>
              {c.enquiries.map(e => ({ t: e.title, e: e.email })).map((x, i) => (
                <a key={i} href={`mailto:${x.e}?subject=${encodeURIComponent(x.t + ' enquiry')}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#faf8f3', borderRadius: 10, textDecoration: 'none', color: '#1a1a1a' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{x.t}</div>
                    <div style={{ fontSize: 12, color: '#6b6a63' }}>{x.e}</div>
                  </div>
                  <span style={{ color: tokens.green }}>{Ic.arrow(14)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQStrip c={c} />

      {/* Floating WhatsApp button (sticky) */}
      <a href={c.wa} className="ct-float" style={{
        position: 'fixed', right: 28, bottom: 28, zIndex: 60, background: '#25D366', color: '#fff', borderRadius: 99, padding: '14px 18px',
        display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none',
        boxShadow: '0 10px 30px rgba(37,211,102,.4), 0 4px 8px rgba(0,0,0,.1)',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: '#a7f3a3', boxShadow: '0 0 0 3px rgba(167,243,163,.4)' }} />
        {Ic.wa(20)} Chat with us
      </a>
    </div>
  );
}

function MobileContactV4({ builtAt, c }: { builtAt: number; c: ContactData }) {
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState(2);
  const slots = ['10:30', '11:30', '12:30', '2:00', '3:30', '4:30'];
  const { days, isPast } = useOpenDays(builtAt, 5, slots);
  const pickDay = (i: number) => { setDay(i); if (isPast(i, slots[slot])) setSlot(Math.max(0, slots.findIndex(x => !isPast(i, x)))); };

  return (
    <div style={{ fontFamily: tokens.family, background: '#faf8f3', color: '#1a1a1a', minHeight: '100%', position: 'relative' }}>
      <div style={{ padding: '24px 18px 16px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#1a4d2a', fontWeight: 700, padding: '4px 10px', background: '#dff1d9', borderRadius: 99, marginBottom: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#16a34a' }} />
          {c.openBadge}
        </div>
        <h1 style={{ fontFamily: tokens.displayFamily, fontSize: 32, lineHeight: 1.05, fontWeight: 600, letterSpacing: -1, margin: '0 0 8px' }}>
          <H1 c={c} />
        </h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: '#6b6a63' }}>
          <b style={{ color: '#1a1a1a' }}>{c.statBold}</b><span>{c.statText}</span>
        </div>
      </div>

      <div style={{ margin: '8px 16px', background: '#fff', border: '1px solid #ece8d8', borderRadius: 16, padding: 18 }}>
        <div style={{ fontSize: 11, color: tokens.green, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>Step 1 of 2</div>
        <h2 style={{ fontFamily: tokens.displayFamily, fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Pick a time</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 5, marginBottom: 12 }}>
          {days.map((dx, i) => (
            <button key={i} type="button" aria-pressed={day === i} onClick={() => pickDay(i)} style={{
              padding: '8px 2px', borderRadius: 8, border: day === i ? `2px solid ${tokens.green}` : '1px solid #ece8d8',
              background: day === i ? '#f0f8ed' : '#fff', textAlign: 'center', cursor: 'pointer', fontFamily: tokens.family,
            }}>
              <div style={{ fontSize: 9.5, color: '#6b6a63', textTransform: 'uppercase' }}>{dx.n}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 1 }}>{dx.d}</div>
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginBottom: 14 }}>
          {slots.map((s, i) => {
            const isTaken = isPast(day, s);
            return (
              <button key={i} type="button" disabled={isTaken} aria-pressed={slot === i} onClick={() => setSlot(i)} style={{
                padding: '9px 4px', borderRadius: 7, border: slot === i ? `2px solid ${tokens.green}` : '1px solid #ece8d8',
                background: slot === i ? tokens.green : (isTaken ? '#f6f4ee' : '#fff'), color: slot === i ? '#fff' : (isTaken ? '#bcb9ad' : '#1a1a1a'),
                fontSize: 11.5, fontWeight: 600, fontFamily: tokens.family, cursor: isTaken ? 'not-allowed' : 'pointer',
                textDecoration: isTaken ? 'line-through' : 'none',
              }}>{s}</button>
            );
          })}
        </div>
        <button type="button" onClick={() => goToStep2(days[day], slots[slot])} style={{ width: '100%', background: tokens.green, color: '#fff', padding: '13px', borderRadius: 10, border: 'none', fontSize: 14.5, fontWeight: 700, fontFamily: tokens.family, cursor: 'pointer' }}>Continue · Step 2 →</button>
      </div>

      <div style={{ margin: '12px 16px', padding: '12px 14px', background: '#fff7d6', border: '1px solid #f0e6a8', borderRadius: 10, fontSize: 12.5 }}>
        🎁 <b>{c.incMobile}</b>
      </div>

      <div style={{ padding: '12px 16px 8px' }}>
        <div style={{ fontSize: 11, color: tokens.green, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>{c.stepsKicker}</div>
        {c.steps.map(x => [x.title, x.text || '']).map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < c.steps.length - 1 ? '1px solid #ece8d8' : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: tokens.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s[0]}</div>
              <div style={{ fontSize: 12, color: '#6b6a63', marginTop: 1 }}>{s[1]}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px 16px 16px' }}>
        <div style={{ fontSize: 11, color: tokens.green, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>{c.desksKicker}</div>
        {c.desks.map(x => ({ t: x.title, s: x.sub })).map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#fff', border: '1px solid #ece8d8', borderRadius: 12, marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{d.t}</div>
              <div style={{ fontSize: 11.5, color: '#6b6a63' }}>{d.s}</div>
            </div>
            <a href={c.wa} aria-label={`Chat with the ${d.t} on WhatsApp`} style={{ padding: '7px 11px', background: '#25D366', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>{Ic.wa(11)} Chat</a>
          </div>
        ))}
      </div>

      <div style={{ padding: '8px 16px 16px' }}>
        <MapPlaceholder height={180} maps={c.maps} />
        <div style={{ fontSize: 13, color: '#555', marginTop: 12, lineHeight: 1.5 }}>
          {c.address1}, {c.address2}<br />
          <b>{c.hours}</b> · {c.hoursClosed}
        </div>
      </div>

      <form onSubmit={sendGuide} style={{ margin: '12px 16px 20px', padding: 20, borderRadius: 16, background: `linear-gradient(135deg, ${tokens.green} 0%, #0f3a21 100%)`, color: '#fff' }}>
        <div style={{ fontSize: 11, color: tokens.lime, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>{c.guideKicker}</div>
        <div style={{ fontFamily: tokens.displayFamily, fontSize: 20, lineHeight: 1.15, fontWeight: 500, marginBottom: 14 }}>
          Get the 7-Day <span style={{ fontStyle: 'italic', color: tokens.lime }}>Gut Reset</span> guide — free.
        </div>
        <label htmlFor="ctm-guide-email" className="sr-only">Email address</label>
        <input id="ctm-guide-email" type="email" name="email" autoComplete="email" style={{
          width: '100%', padding: '11px 14px', fontSize: 13, background: '#ffffff18', color: '#fff', border: '1px solid #ffffff33',
          borderRadius: 10, marginBottom: 8, boxSizing: 'border-box', fontFamily: 'inherit',
        }} placeholder="your@email.com" />
        <button style={{ width: '100%', background: tokens.lime, color: '#0a2418', padding: '12px', borderRadius: 10, border: 'none', fontSize: 13.5, fontWeight: 700, fontFamily: 'inherit' }}>Send me the guide</button>
      </form>

      <a href={c.wa} style={{
        position: 'fixed', right: 16, bottom: 16, zIndex: 60, background: '#25D366', color: '#fff', borderRadius: 99, padding: '12px 14px',
        display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 28px rgba(37,211,102,.4)',
      }}>{Ic.wa(18)} Chat</a>
    </div>
  );
}

// Same 900px desktop/mobile switch as the footer; both are server-rendered, CSS shows one.
export default function ContactPage({ builtAt, c }: { builtAt: number; c: ContactData }) {
  return (
    <div className="ct">
      <div className="ct-desk"><ContactV4 builtAt={builtAt} c={c} /></div>
      <div className="ct-mob"><MobileContactV4 builtAt={builtAt} c={c} /></div>
    </div>
  );
}
