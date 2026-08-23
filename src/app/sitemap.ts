import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mesia.gr'

  // Static pages - REMOVED trailing slashes
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl, // No trailing slash (homepage exception)
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/village`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/access`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/photos`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/area`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/history`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal/privacy-policy`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookie-policy`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms-of-service`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/legal-notice`, // Removed trailing slash
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  try {
    // Dynamic Events - REMOVED trailing slashes
    const events = await prisma.event.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
      url: `${baseUrl}/events/${event.id}`, // Removed trailing slash
      lastModified: event.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Dynamic Historical Posts - REMOVED trailing slashes
    const historicalPosts = await prisma.historicalPost.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const historyPages: MetadataRoute.Sitemap = historicalPosts.map((post) => ({
      url: `${baseUrl}/history/${post.slug}`, // Removed trailing slash
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    // Village Voices / Digital Museum are only indexed while their admin
    // nav-visibility toggle is on — no point ranking a page that's hidden
    // from the site's own navigation.
    const config = await prisma.siteConfig.findUnique({ where: { key: 'general' } })
    const visibility = (config?.value as Record<string, unknown>) || {}

    const featurePages: MetadataRoute.Sitemap = []
    if (visibility.showVillageVoices) {
      featurePages.push({
        url: `${baseUrl}/village-voices`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
    if (visibility.showDigitalMuseum) {
      featurePages.push({
        url: `${baseUrl}/digital-museum`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // Combine all pages
    return [...staticPages, ...eventPages, ...historyPages, ...featurePages]

  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if database query fails
    return staticPages
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600
