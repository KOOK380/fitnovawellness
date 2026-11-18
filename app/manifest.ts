import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FitNova Wellness',
    short_name: 'FitNova',
    description: 'Doctor-led lifestyle medicine — Pune & online across India.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e7a3a',
    icons: [{ src: '/favicon.webp', sizes: '400x400', type: 'image/webp' }],
  };
}
