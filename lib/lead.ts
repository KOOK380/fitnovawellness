// One submit path for every form on the site (booking, callback, guide sign-up).
// Saves the enquiry in the CMS (Leads collection → visible in /admin, emailed to Site Settings › "Send new form
// submissions to" when SMTP is configured). If saving fails (e.g. offline), WhatsApp opens with the request
// pre-written so nothing is lost. Either way the visitor lands on /thank-you/ (per the Hierarchy sheet).

const WA_NUMBER = '919923357018';

export type LeadKind = 'consultation' | 'callback' | 'guide';
export type LeadFields = Partial<Record<'name' | 'phone' | 'email' | 'city' | 'age' | 'concern' | 'mode' | 'callTime' | 'slot' | 'message' | 'consent' | 'website', string>>;

const INTRO: Record<LeadKind, string> = {
  consultation: "Hi FitNova, I'd like to book a free consultation.",
  callback: "Hi FitNova, I'd like a callback from your doctors.",
  guide: 'Hi FitNova, please send me the free 7-Day Gut Reset Guide.',
};

export async function submitLead(kind: LeadKind, fields: LeadFields) {
  if (fields.website) { window.location.href = '/thank-you/'; return; } // spam trap (hidden field)
  const clean = Object.fromEntries(Object.entries(fields).filter(([k, v]) => k !== 'website' && v && String(v).trim())) as LeadFields;
  let saved = false;
  try {
    const r = await fetch('/api/leads/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ...clean, consent: clean.consent === 'yes' || clean.consent === 'on', page: location.pathname }),
    });
    saved = r.ok;
  } catch { /* network error → WhatsApp fallback */ }
  if (!saved) {
    const lines = [INTRO[kind], ...Object.entries(clean).filter(([k]) => k !== 'consent').map(([k, v]) => `${k}: ${v}`)];
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  }
  window.location.href = '/thank-you/';
}
