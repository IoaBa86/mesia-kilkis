// src/app/events/loading.tsx - Updated for events LIST page
import { CalendarDays } from "lucide-react"
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Hero Section - Matches your actual page */}
      <section className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-6">
            <CalendarDays className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
            Εκδηλώσεις & Ανακοινώσεις
          </h2>
          <div className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-mesia-gold border-t-transparent"></div>
              <span>Φόρτωση εκδηλώσεων...</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot - Matches your actual page */}
      <ResponsiveAdSlot id="events-ad-1" />

      {/* Events List Loading - Multiple cards like your actual page */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search/Filter skeleton */}
          <div className="mb-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="h-12 bg-white/50 rounded-lg flex-1"></div>
              <div className="h-12 bg-white/50 rounded-lg w-48"></div>
              <div className="h-12 bg-white/50 rounded-lg w-32"></div>
            </div>
          </div>

          {/* Events Grid Loading */}
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl rounded-2xl overflow-hidden">
                  {/* Event image skeleton */}
                  <div className="w-full h-48 bg-gradient-to-r from-mesia-gold/20 to-mesia-beige/20"></div>
                  
                  <div className="p-6 space-y-4">
                    {/* Category badge skeleton */}
                    <div className="h-6 w-24 bg-mesia-wine/20 rounded-full"></div>
                    
                    {/* Event title skeleton */}
                    <div className="h-6 bg-mesia-gold/20 rounded w-5/6"></div>
                    
                    {/* Event description skeleton */}
                    <div className="space-y-2">
                      <div className="h-4 bg-mesia-gold/15 rounded"></div>
                      <div className="h-4 bg-mesia-gold/15 rounded w-4/5"></div>
                      <div className="h-4 bg-mesia-gold/15 rounded w-3/5"></div>
                    </div>
                    
                    {/* Event details (date, location) skeleton */}
                    <div className="space-y-3 pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-4 w-4 bg-mesia-wine/20 rounded"></div>
                        <div className="h-4 bg-mesia-gold/20 rounded w-32"></div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="h-4 w-4 bg-mesia-wine/20 rounded"></div>
                        <div className="h-4 bg-mesia-gold/20 rounded w-28"></div>
                      </div>
                    </div>
                    
                    {/* "Δείτε Περισσότερα" button skeleton */}
                    <div className="pt-4">
                      <div className="h-10 bg-gradient-to-r from-mesia-wine/20 to-mesia-wine/10 rounded-lg w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
