import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces, Caveat } from 'next/font/google';
import { SITE_URL, SITE_NAME } from '@/lib/data';
import './globals.css';

// Same Google fonts as the design, self-hosted by Next.js (faster, no layout shift).
const figtree = Figtree({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-figtree', display: 'swap', adjustFontFallback: false });
const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--font-fraunces', display: 'swap', adjustFontFallback: false });
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-caveat', display: 'swap', adjustFontFallback: false });

const title = 'FitNova Wellness — Doctor-Led Lifestyle Medicine in Pune & Online';
const description =
  'Personalised programs for weight loss, PCOS, thyroid, type 2 diabetes, fatty liver and gut health — designed and guided by doctors. Visit our Sinhagad Road, Pune clinic or consult online across India. First consultation free.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s | FitNova Wellness' },
  description,
  applicationName: SITE_NAME,
  keywords: [
    'lifestyle medicine Pune', 'weight loss doctor Pune', 'PCOS treatment Pune', 'thyroid diet', 'type 2 diabetes reversal',
    'fatty liver diet', 'gut health nutritionist', 'obesity clinic Sinhagad Road', 'online diet consultation India', 'FitNova Wellness',
  ],
  authors: [{ name: 'Dr Archana Shinde' }, { name: 'Dr Jeevan Shinde' }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'health',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: SITE_NAME,
    title,
    description,
    images: [{ url: '/images/hero-founders.webp', width: 912, height: 509, alt: 'Dr Archana Shinde and Dr Jeevan Shinde, founders of FitNova Wellness' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/hero-founders.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: '/favicon.webp', apple: '/favicon.webp' },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e7a3a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${figtree.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
