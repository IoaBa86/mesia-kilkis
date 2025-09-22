// src/app/events/page.tsx
import { Metadata } from 'next'
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  Pin,
  Filter,
  Search,
  CalendarDays
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import EventsClient from "@/components/EventsClient"
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export const metadata: Metadata = {
  title: 'Εκδηλώσεις & Ανακοινώσεις',
  description: 'Δείτε όλες τις εκδηλώσεις και ανακοινώσεις του χωριού Μεσιά Κιλκίς. Φεστιβάλ, συνεδριάσεις, πολιτιστικές εκδηλώσεις και περισσότερα.',
  keywords: ['εκδηλώσεις', 'ανακοινώσεις', 'Μεσιά Κιλκίς', 'φεστιβάλ', 'πολιτιστικές εκδηλώσεις', 'κοινότητα'],
  alternates: {
    canonical: '/events', // ✅ Fixed canonical URL
  },
  openGraph: {
    title: 'Εκδηλώσεις & Ανακοινώσεις - Μεσιά Κιλκίς',
    description: 'Όλες οι εκδηλώσεις και ανακοινώσεις του χωριού Μεσιά Κιλκίς',
    url: 'https://www.mesia.gr/events', // Added for consistency
    images: ['/og-image.jpg'],
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
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        {/* Main content */}
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              <div className="mb-6">
                <CalendarDays className="h-16 w-16 text-mesia-gold mx-auto mb-6" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
                Εκδηλώσεις & Ανακοινώσεις
              </h2>
              <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
                Μείνετε ενημερωμένοι για όλες τις εκδηλώσεις και ανακοινώσεις του χωριού μας
              </p>
            </div>
          </section>
          
          {/* ⭐ Responsive Ad Slot */}
          <ResponsiveAdSlot id="events-ad-1" />

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
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <main className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-bold text-mesia-wine mb-6">Εκδηλώσεις</h2>
          <p className="text-mesia-lightText">Σφάλμα φόρτωσης εκδηλώσεων. Δοκιμάστε ξανά.</p>
          <Button asChild className="mt-6">
            <Link href="/">Επιστροφή στην Αρχική</Link>
          </Button>
        </main>
      </div>
    )
  }
}
