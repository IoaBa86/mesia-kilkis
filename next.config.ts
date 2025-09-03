import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* ⬇️  Ignore lint & type errors only during CI builds */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  /* ⬇️  Image optimisation rules */
  images: {
    remotePatterns: [
      // Facebook CDN hosts
      {
        protocol: 'https',
        hostname: 'scontent.fskg1-2.fna.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fskg1.fna.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fskg2.fna.fbcdn.net',
        pathname: '/**',
      },
      // Generic fbcdn fallback
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        pathname: '/**',
      },
      // Newsit
      {
        protocol: 'https',
        hostname: 'www.newsit.gr',
        pathname: '/**',
      },
      // Unsplash
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
