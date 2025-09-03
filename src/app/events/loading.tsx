// src/app/events/[id]/loading.tsx - Loading state for event details
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* Back button skeleton */}
          <div className="h-10 w-32 bg-mesia-gold/20 rounded mb-6"></div>
          
          {/* Event card skeleton */}
          <div className="bg-white/90 border border-mesia-gold/20 shadow-xl rounded-2xl overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full h-64 md:h-80 bg-mesia-gold/20"></div>
            
            <div className="p-8 space-y-6">
              {/* Title skeleton */}
              <div className="h-8 bg-mesia-gold/20 rounded w-3/4"></div>
              
              {/* Details skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-32 bg-mesia-gold/20 rounded"></div>
                <div className="h-32 bg-mesia-gold/20 rounded"></div>
              </div>
              
              {/* Description skeleton */}
              <div className="space-y-3">
                <div className="h-4 bg-mesia-gold/20 rounded"></div>
                <div className="h-4 bg-mesia-gold/20 rounded w-5/6"></div>
                <div className="h-4 bg-mesia-gold/20 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
