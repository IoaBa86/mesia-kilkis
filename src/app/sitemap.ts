<<<<<<< HEAD
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mesia.gr'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
=======
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mesia.gr'
  
  return [
>>>>>>> aa19e94c91b93b317e5373e8a4a7e514620d3181
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
<<<<<<< HEAD
      url: `${baseUrl}/village`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/access`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
=======
>>>>>>> aa19e94c91b93b317e5373e8a4a7e514620d3181
      url: `${baseUrl}/photos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
<<<<<<< HEAD
      url: `${baseUrl}/area`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
=======
>>>>>>> aa19e94c91b93b317e5373e8a4a7e514620d3181
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
<<<<<<< HEAD
    // Legal pages
=======
    {
      url: `${baseUrl}/history`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
>>>>>>> aa19e94c91b93b317e5373e8a4a7e514620d3181
    {
      url: `${baseUrl}/legal/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
<<<<<<< HEAD
    {
      url: `${baseUrl}/legal/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/legal-notice`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    // Dynamic Events
    const events = await prisma.event.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
      url: `${baseUrl}/events/${event.id}`,
      lastModified: event.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Dynamic Historical Posts
    const historicalPosts = await prisma.historicalPost.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const historyPages: MetadataRoute.Sitemap = historicalPosts.map((post) => ({
      url: `${baseUrl}/history/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Combine all pages
    return [...staticPages, ...eventPages, ...historyPages]

  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if database query fails
    return staticPages
  }
}

// Force static generation at build time
export const dynamic = 'force-static'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600
=======
  ]
}
>>>>>>> aa19e94c91b93b317e5373e8a4a7e514620d3181
