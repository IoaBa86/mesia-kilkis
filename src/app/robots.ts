import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
<<<<<<< HEAD
    sitemap: 'https://www.mesia.gr/sitemap.xml', // Added www for consistency
=======
    sitemap: 'https://mesia.gr/sitemap.xml',
>>>>>>> aa19e94c91b93b317e5373e8a4a7e514620d3181
  }
}
