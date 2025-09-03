import type { NextConfig } from 'next'
// Remove this line: import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig: NextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
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

  // Remove the entire webpack section if you remove the plugin
}

export default nextConfig
