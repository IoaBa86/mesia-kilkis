import type { NextConfig } from 'next'

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

  // For Turbopack compatibility
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

export default nextConfig
