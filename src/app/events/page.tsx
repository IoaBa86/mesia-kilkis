// src/app/events/page.tsx
import { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import { prisma } from "@/lib/prisma"
import EventsClient from "@/components/EventsClient"
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'
import PageHero from '@/components/site/PageHero'

export const metadata: Metadata = {
  title: 'Εκδηλώσεις & Ανακοινώσεις',
  description: 'Δείτε όλες τις εκδηλώσεις και ανακοινώσεις του χωριού Μεσιά Κιλκίς. Φεστιβάλ, συνεδριάσεις, πολιτιστικές εκδηλώσεις και περισσότερα.',
  keywords: ['εκδηλώσεις', 'ανακοινώσεις', 'Μεσιά', 'Mesia', 'Μεσιά Κιλκίς', 'Κιλκίς', 'φεστιβάλ', 'πολιτιστικές εκδηλώσεις', 'κοινότητα'],
  alternates: {
    canonical: '/events', // ✅ Fixed canonical URL
  },
  openGraph: {
    title: 'Εκδηλώσεις & Ανακοινώσεις - Μεσιά Κιλκίς',
    description: 'Όλες οι εκδηλώσεις και ανακοινώσεις του χωριού Μεσιά Κιλκίς',
    url: 'https://www.mesia.gr/events', // Added for consistency
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Εκδηλώσεις - Μεσιά Κιλκίς',
    description: 'Δείτε όλες τις εκδηλώσεις του χωριού Μεσιά Κιλκίς',
  },
}


// 🚀 PERFORMANCE: Enable static generation with revalidation
export const revalidate = 3600 // Cache for 1 hour
export const dynamic = 'force-dynamic' // Still dynamic for search params

interface EventsPageProps {
  searchParams: Promise<{ 
    category?: string
    search?: string
    upcoming?: string
  }>
}

const categoryLabels = {
  'ANNOUNCEMENT': 'Ανακοινώσεις',
  'FESTIVAL': 'Φεστιβάλ',
  'MEETING': 'Συνεδριάσεις',
  'CULTURAL': 'Πολιτιστικές',
  'RELIGIOUS': 'Θρησκευτικές',
  'SPORTS': 'Αθλητικές',
  'COMMUNITY': 'Κοινοτικές',
  'OTHER': 'Άλλες'
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams
  const category = params.category
  const search = params.search
  const upcoming = params.upcoming === 'true'

  // 🚀 PERFORMANCE: Single optimized query instead of multiple queries
  try {
    // Build where clause for filtering
    const where: any = {
      isActive: true
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (upcoming) {
      where.eventDate = {
        gte: new Date()
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    // 🚀 SINGLE OPTIMIZED QUERY: Get events and categories together
    const [events, categoriesResult] = await Promise.all([
      // Events query - optimized with selected fields only
      prisma.event.findMany({
        where,
        select: {
          id: true,
          title: true,
          titleEn: true,
          description: true,
          descriptionEn: true,
          eventDate: true,
          endDate: true,
          location: true,
          category: true,
          isPinned: true,
          imageUrl: true,
          createdAt: true,
          creator: {
            select: { 
              name: true 
            }
          }
        },
        orderBy: [
          { isPinned: 'desc' },
          { eventDate: 'desc' }
        ],
        take: 50, // 🚀 LIMIT: Prevent loading too many events
      }),
      
      // Categories query - run in parallel
      prisma.event.findMany({
        where: { isActive: true },
        select: { category: true },
        distinct: ['category']
      })
    ])

    return (
      <div className="min-h-screen bg-mesia-cream">
        {/* Main content */}
        <main>
          <PageHero
            icon={CalendarDays}
            eyebrow="Ημερολόγιο Χωριού"
            title="Εκδηλώσεις & Ανακοινώσεις"
            description="Μείνετε ενημερωμένοι για όλες τις εκδηλώσεις και ανακοινώσεις του χωριού μας"
          />

          {/* ⭐ Responsive Ad Slot */}
          <ResponsiveAdSlot slotKey="events-ad-1" />

          {/* Events Client Component with Search and Filters */}
          <EventsClient 
            initialEvents={events} 
            categories={categoriesResult.map(c => c.category)}
            categoryLabels={categoryLabels}
            initialCategory={category}
            initialSearch={search}
            initialUpcoming={upcoming}
          />
        </main>
      </div>
    )

  } catch (error) {
    console.error('Events page error:', error)
    
    // 🚀 ERROR FALLBACK: Return minimal page on database error
    return (
      <div className="min-h-screen bg-mesia-cream">
        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <CalendarDays className="h-12 w-12 text-mesia-gold mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-mesia-wine font-greek mb-4">Εκδηλώσεις</h2>
          <p className="text-mesia-lightText mb-6">Σφάλμα φόρτωσης εκδηλώσεων. Δοκιμάστε ξανά.</p>
          <Button asChild>
            <Link href="/">Επιστροφή στην Αρχική</Link>
          </Button>
        </main>
      </div>
    )
  }
}
