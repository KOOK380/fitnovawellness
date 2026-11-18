// Icons — identical paths to components/home.jsx (Ico) and components/footers.jsx (SocialIcon).

export const Ico = {
  wa: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>,
  Arrow: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>,
  Chev: () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 4l3 3 3-3" /></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 8.5l3 3 7-7" /></svg>,
  X: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M3 3l8 8M11 3l-8 8" /></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16" /></svg>,
};

const SOCIAL_PATHS = {
  ig: 'M8 2.5c1.5 0 1.7 0 2.3 0 .55.03 1.1.13 1.5.3.5.2.85.45 1.2.8.35.35.6.7.8 1.2.17.4.27.95.3 1.5 0 .6 0 .8 0 2.3s0 1.7 0 2.3c-.03.55-.13 1.1-.3 1.5-.2.5-.45.85-.8 1.2-.35.35-.7.6-1.2.8-.4.17-.95.27-1.5.3-.6 0-.8 0-2.3 0s-1.7 0-2.3 0c-.55-.03-1.1-.13-1.5-.3-.5-.2-.85-.45-1.2-.8-.35-.35-.6-.7-.8-1.2-.17-.4-.27-.95-.3-1.5 0-.6 0-.8 0-2.3s0-1.7 0-2.3c.03-.55.13-1.1.3-1.5.2-.5.45-.85.8-1.2.35-.35.7-.6 1.2-.8.4-.17.95-.27 1.5-.3.6 0 .8 0 2.3 0M8 1c-1.6 0-1.8 0-2.4 0-.7.03-1.4.17-2 .4-.65.25-1.2.6-1.7 1.1-.5.5-.85 1.05-1.1 1.7-.23.6-.37 1.3-.4 2C.5 6.2.5 6.4.5 8s0 1.8 0 2.4c.03.7.17 1.4.4 2 .25.65.6 1.2 1.1 1.7.5.5 1.05.85 1.7 1.1.6.23 1.3.37 2 .4.6 0 .8 0 2.4 0s1.8 0 2.4 0c.7-.03 1.4-.17 2-.4.65-.25 1.2-.6 1.7-1.1.5-.5.85-1.05 1.1-1.7.23-.6.37-1.3.4-2 0-.6 0-.8 0-2.4s0-1.8 0-2.4c-.03-.7-.17-1.4-.4-2-.25-.65-.6-1.2-1.1-1.7-.5-.5-1.05-.85-1.7-1.1-.6-.23-1.3-.37-2-.4C9.8 1 9.6 1 8 1z M8 4.6A3.4 3.4 0 1 0 8 11.4 3.4 3.4 0 1 0 8 4.6z M8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M12.6 4.4a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0z',
  yt: 'M14.7 4.5c-.16-.6-.6-1.07-1.18-1.24C12.46 3 8 3 8 3s-4.46 0-5.52.26C1.9 3.43 1.45 3.9 1.3 4.5 1 5.6 1 8 1 8s0 2.4.3 3.5c.16.6.6 1.07 1.18 1.24C3.54 13 8 13 8 13s4.46 0 5.52-.26c.58-.17 1.02-.64 1.18-1.24.3-1.1.3-3.5.3-3.5s0-2.4-.3-3.5zM6.6 10.1V5.9L10.3 8 6.6 10.1z',
  fb: 'M8 .5C3.86.5.5 3.86.5 8c0 3.74 2.74 6.84 6.32 7.4V10.16H4.92V8h1.9V6.36c0-1.88 1.12-2.92 2.83-2.92.82 0 1.68.15 1.68.15v1.84h-.95c-.93 0-1.22.58-1.22 1.17V8h2.08l-.33 2.16H9.16V15.4C12.74 14.84 15.5 11.74 15.5 8c0-4.14-3.36-7.5-7.5-7.5z',
  wa: 'M11.5 9.6c-.2-.1-1.2-.6-1.4-.7-.2-.07-.3-.1-.5.1s-.5.7-.6.8c-.1.1-.2.15-.5.05s-1-.4-1.9-1.2c-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4.1-.1.2-.25.3-.37.1-.13.13-.2.2-.35.07-.13.03-.25-.02-.35S5.6 4.45 5.4 4c-.16-.4-.32-.34-.45-.35-.12 0-.25-.02-.4-.02s-.36.05-.55.25c-.2.2-.7.7-.7 1.7s.7 2 .8 2.13c.1.13 1.4 2.13 3.4 2.98.47.2.84.32 1.13.42.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.86.12-.94-.04-.08-.18-.13-.38-.23zM8 1.5C4.4 1.5 1.5 4.4 1.5 8c0 1.27.36 2.46 1 3.45L1.6 14.5l3.18-.84A6.49 6.49 0 0 0 8 14.5c3.6 0 6.5-2.9 6.5-6.5S11.6 1.5 8 1.5z',
};

export function SocialIcon({ kind, size = 16 }: { kind: keyof typeof SOCIAL_PATHS; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d={SOCIAL_PATHS[kind]} /></svg>;
}

// Logo lockup B (badge + wordmark + script tagline) — from components/logo.jsx
export function LockupB({ height = 40, green = '#1e7a3a', lime = '#53b52a', family }: { height?: number; green?: string; lime?: string; family?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: family }}>
      <svg width={height} height={height} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="none" stroke={green} strokeWidth="2.5" />
        <path d="M50 18 C 30 28, 22 44, 26 62 C 34 54, 42 48, 50 46 Z" fill={lime} />
        <path d="M50 18 C 70 28, 78 44, 74 62 C 66 54, 58 48, 50 46 Z" fill={green} />
        <path d="M50 46 L 50 74" stroke={green} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 60 Q 44 64, 42 72" stroke={green} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M50 64 Q 56 68, 58 76" stroke={green} strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontSize: height * 0.58, fontWeight: 800, letterSpacing: -0.5 }}>
          <span style={{ color: '#111' }}>Fit</span>
          <span style={{ color: green }}>Nova</span>
        </span>
        <span style={{ fontFamily: 'var(--script)', fontSize: height * 0.3, color: lime, marginTop: 2, letterSpacing: 0.2 }}>
          explore the new you
        </span>
      </div>
    </div>
  );
}
