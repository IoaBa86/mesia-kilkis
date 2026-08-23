import type { NextConfig } from 'next'

// Content-Security-Policy — allowlists what this site actually loads:
// Google Analytics/AdSense/Maps, and self-hosted assets. frame-src stays
// fairly open for Google's ad iframes and admin-configured Digital Museum
// virtual-tour embeds (Matterport/Sketchfab/YouTube) — that field is
// admin-only input, not public user content, so the trust boundary already
// sits at the NextAuth ADMIN role check, not at CSP. If a new embed
// provider's domain isn't covered here, its iframe just won't render —
// add the domain to frame-src below when that happens.
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google-analytics.com https://maps.googleapis.com https://fundingchoicesmessages.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.fbcdn.net https://www.newsit.gr https://images.unsplash.com https://*.googleusercontent.com https://*.google.com https://*.gstatic.com https://*.googleapis.com https://*.doubleclick.net",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://maps.googleapis.com https://fundingchoicesmessages.google.com https://api.open-meteo.com",
  "frame-src 'self' https://*.google.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.youtube.com https://my.matterport.com https://sketchfab.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: CSP_DIRECTIVES },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  /* ⬇️ Properly disable ESLint and TypeScript checks during builds */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'scontent.fskg1-2.fna.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: 'scontent.fskg1.fna.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: 'scontent.fskg2.fna.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: '*.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: 'www.newsit.gr', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // For Turbopack compatibility
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

export default nextConfig
