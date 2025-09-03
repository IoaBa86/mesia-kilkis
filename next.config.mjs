/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {               // ⬅️  turns off ESLint during `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {           // ⬅️  turns off type-checking during `next build`
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'scontent.fskg1-2.fna.fbcdn.net', pathname: '/**' },
      { protocol: 'https', hostname: 'scontent.fskg1.fna.fbcdn.net',  pathname: '/**' },
      { protocol: 'https', hostname: 'scontent.fskg2.fna.fbcdn.net',  pathname: '/**' },
      { protocol: 'https', hostname: '*.fbcdn.net',                  pathname: '/**' },
      { protocol: 'https', hostname: 'www.newsit.gr',                pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com',          pathname: '/**' },
    ],
  },
};

export default nextConfig;
