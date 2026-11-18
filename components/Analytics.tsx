'use client';
// Visitor analytics, all optional and light:
//  • built-in counter: one tiny beacon per page view to /api/t/ (forwarded to Laravel). No cookies.
//  • Google Analytics 4 and Microsoft Clarity, loaded only when switched on in the admin, after the page is interactive.
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics({ ga4, clarity }: { ga4?: string | null; clarity?: string | null }) {
  const path = usePathname();

  useEffect(() => {
    if (!path || navigator.webdriver) return;
    const q = new URLSearchParams(location.search);
    const body = new URLSearchParams({ p: path, r: document.referrer || '', u: q.get('utm_source') || '' });
    try {
      if (!navigator.sendBeacon?.('/api/t/', body)) fetch('/api/t/', { method: 'POST', body, keepalive: true }).catch(() => {});
    } catch { /* never block the page */ }
  }, [path]);

  const gaId = ga4 && /^G-[A-Z0-9]+$/.test(ga4) ? ga4 : null;
  const clarityId = clarity && /^[a-z0-9]+$/i.test(clarity) ? clarity : null;
  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {clarityId && (
        <Script id="clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
    </>
  );
}
