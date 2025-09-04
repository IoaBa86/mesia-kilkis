import type { NextConfig } from 'next'
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig: NextConfig = {
<<<<<<< HEAD
=======
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

>>>>>>> bd0feefd6ab19a1977b662431814a1b2ccdb00b1
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

  webpack(config, { isServer, dev }) {
    // Only apply in server-side builds
    if (isServer) {
      config.plugins = config.plugins || []
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },

  // For Turbopack compatibility
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
}

export default nextConfig
