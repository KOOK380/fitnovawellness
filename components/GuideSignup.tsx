'use client';
// Gut Reset Guide sign-up — wording comes from the CMS (Free Resource page › Free guide sign-up hero).
import { useState, type FormEvent } from 'react';
import { submitLead } from '@/lib/lead';

/** Turns the words "Privacy Policy" in a consent sentence into a link (adds one if missing). */
export function withPrivacyLink(text: string) {
  const i = text.indexOf('Privacy Policy');
  if (i < 0) return <>{text} <a href="/privacy-policy/">Privacy Policy</a>.</>;
  return <>{text.slice(0, i)}<a href="/privacy-policy/">Privacy Policy</a>{text.slice(i + 14)}</>;
}

export function Honeypot() {
  // invisible to people; bots that fill every field get filtered out
  return <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />;
}

export default function GuideSignup({ id = 'guide-form', title, sub, submitLabel, consent }: {
  id?: string; title?: string | null; sub?: string | null; submitLabel?: string | null; consent?: string | null;
}) {
  const [sending, setSending] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    submitLead('guide', { name: f.name, email: f.email, phone: f.phone, consent: f.consent, website: f.website });
  };
  return (
    <form className="pg-form" onSubmit={submit} id={id}>
      <h2>{title || 'Get the free guide'}</h2>
      {sub && <p className="pg-form-sub">{sub}</p>}
      <div className="pg-fields">
        <div className="pg-field full"><label htmlFor={`${id}-name`}>First name *</label><input id={`${id}-name`} name="name" autoComplete="given-name" required /></div>
        <div className="pg-field full"><label htmlFor={`${id}-email`}>Email *</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" required /></div>
        <div className="pg-field full"><label htmlFor={`${id}-phone`}>WhatsApp number</label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+91" /></div>
        <label className="pg-consent">
          <input type="checkbox" name="consent" required />
          <span>{withPrivacyLink(consent || 'I agree to receive the guide and health tips from FitNova by email/WhatsApp. I can unsubscribe anytime. See Privacy Policy.')}</span>
        </label>
        <Honeypot />
      </div>
      <button className="hm-btn hm-btn-primary hm-btn-lg" disabled={sending}>{sending ? 'Sending…' : submitLabel || 'Send Me the Free Guide'}</button>
    </form>
  );
}
