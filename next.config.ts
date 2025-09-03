// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Facebook CDN domains
      {
        protocol: 'https',
        hostname: 'scontent.fskg1-2.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fskg1.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fskg2.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      // Wildcard for all Facebook CDN subdomains (more flexible)
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.newsit.gr',
        port: '',
        pathname: '/**',
      },
      
      // Add other external image domains as needed
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
