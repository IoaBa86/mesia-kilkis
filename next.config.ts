import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* ⬇️ Properly disable ESLint and TypeScript checks during builds */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  /* ⬇️ Remove the invalid experimental flag - it doesn't exist in Next.js 15 */
  // experimental: {
  //   missingSuspenseWithCSRBailout: false, // ❌ This doesn't work in Next.js 15
  // },

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
}

export default nextConfig
