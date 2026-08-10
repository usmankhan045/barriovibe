import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Every page in this site is prerendered at build time. The only server
  // surface is /api/contact. See lib/leads.ts for the swap path to a fully
  // static export.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Art is pre-generated at fixed widths by scripts/extract-art.mjs, so the
    // optimizer only ever needs these.
    deviceSizes: [640, 828, 1024, 1280, 1536],
    imageSizes: [64, 96, 128, 256, 384],
  },

  // Security headers. Static assets are immutable-cached by Next automatically.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
