'use client';
// Booking form — fields exactly as listed in the page-content doc (section 13).
// Pre-fills from links: ?concern= (homepage chips), ?mode= (clinic / online buttons), ?slot= (contact page calendar).
import { useEffect, useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/lead';
import { Honeypot, withPrivacyLink } from './GuideSignup';

const CONCERNS = ['Weight Loss', 'PCOS', 'Thyroid', 'Diabetes', 'Fatty Liver', 'Gut Health', 'General Wellness', 'Not sure'];
const CHIP_TO_CONCERN: Record<string, string> = {
  'Losing weight': 'Weight Loss', 'PCOS / irregular periods': 'PCOS', 'Thyroid & low energy': 'Thyroid', 'High blood sugar': 'Diabetes',
  'Fatty liver': 'Fatty Liver', 'Bloating & acidity': 'Gut Health', 'Staying healthy': 'General Wellness',
};
const MODES = ['Clinic visit (Pune)', 'Online'];

export default function BookingForm({ title, submitLabel, consent, fine }: { title?: string | null; submitLabel?: string | null; consent?: string | null; fine?: string | null }) {
  const [concern, setConcern] = useState('');
  const [mode, setMode] = useState('');
  const [slot, setSlot] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const c = q.get('concern');
    if (c) setConcern(CHIP_TO_CONCERN[c] || (CONCERNS.includes(c) ? c : ''));
    const m = q.get('mode');
    if (m && MODES.includes(m)) setMode(m);
    const s = q.get('slot');
    if (s) setSlot(s.slice(0, 60));
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    submitLead('consultation', {
      name: f.name, phone: f.phone, email: f.email, city: f.city, age: f.age, concern: f.concern,
      mode: f.mode, callTime: f.time, slot, message: f.message, consent: f.consent, website: f.website,
    });
  };

  return (
    <form className="pg-form" onSubmit={submit} id="book-form">
      <h2>{title || 'Book your free consultation'}</h2>
      <p className="pg-form-sub">Takes under a minute. Fields marked * are required.</p>
      {slot && <div className="pg-slot">Preferred slot: <b>{slot}</b></div>}
      <div className="pg-fields">
        <div className="pg-field full"><label htmlFor="bk-name">Full name *</label><input id="bk-name" name="name" autoComplete="name" required /></div>
        <div className="pg-field"><label htmlFor="bk-phone">WhatsApp number *</label><input id="bk-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" required /></div>
        <div className="pg-field"><label htmlFor="bk-email">Email</label><input id="bk-email" name="email" type="email" autoComplete="email" /></div>
        <div className="pg-field"><label htmlFor="bk-city">City *</label><input id="bk-city" name="city" autoComplete="address-level2" required /></div>
        <div className="pg-field"><label htmlFor="bk-age">Age</label><input id="bk-age" name="age" type="number" min={1} max={120} inputMode="numeric" /></div>
        <div className="pg-field full">
          <label htmlFor="bk-concern">What do you need help with? *</label>
          <select id="bk-concern" name="concern" required value={concern} onChange={e => setConcern(e.target.value)}>
            <option value="" disabled>Choose one</option>
            {CONCERNS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <fieldset className="pg-field full" style={{ border: 0, padding: 0, margin: 0 }}>
          <span>Preferred mode *</span>
          <div className="pg-radios">
            {MODES.map((m, i) => (
              <label key={m}>
                <input type="radio" name="mode" value={m} required={i === 0} checked={mode === m} onChange={() => setMode(m)} />
                <span className="hm-chip">{m}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="pg-field full">
          <label htmlFor="bk-time">Preferred time to call</label>
          <select id="bk-time" name="time" defaultValue="">
            <option value="">Any time</option><option>Morning</option><option>Afternoon</option><option>Evening</option>
          </select>
        </div>
        <div className="pg-field full"><label htmlFor="bk-msg">Anything else you&apos;d like to tell us?</label><textarea id="bk-msg" name="message" /></div>
        <label className="pg-consent">
          <input type="checkbox" name="consent" required />
          <span>{withPrivacyLink(consent || 'I agree to be contacted by FitNova on WhatsApp / phone and accept the Privacy Policy.')}</span>
        </label>
        <Honeypot />
      </div>
      <button className="hm-btn hm-btn-primary hm-btn-lg" disabled={sending}>{sending ? 'Sending…' : submitLabel || 'Book My Free Consultation'}</button>
      {fine && <div className="pg-form-fine">{fine}</div>}
    </form>
  );
}
