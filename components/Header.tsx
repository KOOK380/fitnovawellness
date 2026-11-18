'use client';
// Site header — homepage design (announcement bar + sticky header) + mobile menu panel.
// All text, links and the logo come from Site Settings in the CMS.
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Ico } from './Icons';
import { NavDropdown } from './Interactive';

export type NavItem = { label: string; url: string; children: { label: string; url: string }[]; mobileOnly?: boolean };
export type HeaderData = {
  logo: string; logoW: number; logoH: number; name: string;
  announceText?: string | null; announceLabel?: string | null; announceUrl?: string | null;
  nav: NavItem[]; ctaLabel: string; ctaUrl: string; wa: string;
};

function Logo({ d }: { d: HeaderData }) {
  return (
    <a href="/" className="hm-logo" aria-label={`${d.name} — Home`}>
      <Image src={d.logo} unoptimized={/^https?:/.test(d.logo)} alt={d.name} quality={90} width={d.logoW} height={d.logoH} priority style={{ width: 'auto' }} />
    </a>
  );
}

export function LogoHeader({ d }: { d: HeaderData }) {
  return (
    <header className="hm-header">
      <div className="hm-wrap hm-header-in"><Logo d={d} /></div>
    </header>
  );
}

export default function Header({ d }: { d: HeaderData }) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<number | null>(null);
  useEffect(() => {
    const close = () => { if (window.innerWidth > 1080) setOpen(false); };
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);
  const items = d.nav.map(n => ({ ...n, children: n.children.map(c => ({ label: c.label, href: c.url })) }));

  return (
    <>
      {d.announceText && (
        <div className="hm-announce"><span>{d.announceText}</span>{d.announceUrl && <a href={d.announceUrl}>{d.announceLabel || 'Learn more →'}</a>}</div>
      )}
      <header className="hm-header">
        <div className="hm-wrap hm-header-in">
          <Logo d={d} />
          <nav className="hm-nav" aria-label="Main">
            {items.filter(n => !n.mobileOnly).map(n =>
              n.children.length ? <NavDropdown key={n.label} label={n.label} href={n.url} items={n.children} /> : <a key={n.label} href={n.url}>{n.label}</a>,
            )}
          </nav>
          <div className="hm-header-cta">
            <a href={d.wa} className="hm-wa-btn" aria-label="WhatsApp">{Ico.wa(18)}<span>Chat</span></a>
            <a href={d.ctaUrl} className="hm-btn hm-btn-primary">{d.ctaLabel} <Ico.Arrow /></a>
            <button className="hm-menu-btn" aria-label={open ? 'Close menu' : 'Menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}>
              {open ? <Ico.X /> : <Ico.Menu />}
            </button>
          </div>
        </div>
        <nav id="mobile-menu" className="hm-mnav" aria-label="Mobile" hidden={!open}>
          {items.map((n, i) =>
            n.children.length ? (
              <div key={n.label}>
                <div className="hm-mnav-row">
                  <a href={n.url}>{n.label}</a>
                  <button type="button" aria-label={`Show ${n.label}`} aria-expanded={sub === i} onClick={() => setSub(s => (s === i ? null : i))} className={sub === i ? 'on' : ''}><Ico.Chev /></button>
                </div>
                {sub === i && <div className="hm-mnav-sub">{n.children.map(c => <a key={c.href + c.label} href={c.href}>{c.label}</a>)}</div>}
              </div>
            ) : <a key={n.label} href={n.url}>{n.label}</a>,
          )}
          <div className="hm-mnav-cta"><a href={d.ctaUrl} className="hm-btn hm-btn-primary hm-btn-lg">{d.ctaLabel} <Ico.Arrow /></a></div>
        </nav>
      </header>
    </>
  );
}
