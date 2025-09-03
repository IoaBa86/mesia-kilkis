import type { NextConfig } from 'next'
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig: NextConfig = {
  /* ⬇️ Add this experimental flag */
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },

  /* ⬇️ Keep your existing config */
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

  webpack(config, { isServer, nextRuntime }) {
    if (isServer && nextRuntime === 'nodejs') {
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
}

export default nextConfig
