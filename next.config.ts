import type { NextConfig } from 'next';

// Content and images come from the Laravel API (fitnova-api). Uploaded images and the form endpoint are
// served through this site's own domain, so pages only ever link to fitnovawellness.com.
const API = (process.env.CMS_API_URL || 'http://127.0.0.1:8010').replace(/\/$/, '');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true, // URLs end in / exactly as in Hierarchy.xlsx
  turbopack: { root: process.cwd() },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90], // photos are served at 90 for a crisp, HD look
    localPatterns: [{ pathname: '/media/**' }, { pathname: '/images/**' }],
  },
  async rewrites() {
    return [
      { source: '/media/:path*', destination: `${API}/storage/media/:path*` },
      { source: '/api/leads/', destination: `${API}/api/leads` },
      { source: '/api/t/', destination: `${API}/api/track` }, // visitor counter
    ];
  },
};

export default nextConfig;
