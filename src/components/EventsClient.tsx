// src/components/EventsClient.tsx
"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  MapPin,
  Pin,
  Filter,
  Search,
  X
} from "lucide-react"

interface Event {
  id: string
  title: string
  description: string | null
  eventDate: string
  endDate: string | null
  location: string | null
  category: string
  isPinned: boolean
  imageUrl: string | null
  creator: {
    name: string
  }
}

interface EventsClientProps {
  initialEvents: Event[]
  categories: string[]
  categoryLabels: Record<string, string>
  initialCategory?: string
  initialSearch?: string
  initialUpcoming?: boolean
}

export default function EventsClient({
  initialEvents,
  categories,
  categoryLabels,
  initialCategory,
  initialSearch,
  initialUpcoming
}: EventsClientProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialSearch || '')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all')
  const [showUpcoming, setShowUpcoming] = useState(initialUpcoming || false)

  const filteredEvents = useMemo(() => {
    let filtered = [...initialEvents]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    if (showUpcoming) {
      const now = new Date()
      filtered = filtered.filter(event => new Date(event.eventDate) >= now)
    }

    return filtered
  }, [initialEvents, searchQuery, selectedCategory, showUpcoming])

  const updateURL = () => {
    const params = new URLSearchParams()

    if (searchQuery.trim()) params.set('search', searchQuery.trim())
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (showUpcoming) params.set('upcoming', 'true')

    const queryString = params.toString()
    const newURL = queryString ? `/events?${queryString}` : '/events'

    router.push(newURL, { scroll: false })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL()
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setTimeout(updateURL, 0)
  }

  const handleUpcomingToggle = () => {
    setShowUpcoming(!showUpcoming)
    setTimeout(updateURL, 0)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setShowUpcoming(false)
    router.push('/events', { scroll: false })
  }

  const hasActiveFilters = searchQuery.trim() || selectedCategory !== 'all' || showUpcoming

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-12 border border-mesia-gold/30 bg-white p-6">
          <h3 className="flex items-center text-mesia-wine font-greek font-bold text-lg mb-6">
            <Filter className="h-5 w-5 mr-2" />
            Αναζήτηση & Φίλτρα
          </h3>

          <div className="space-y-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mesia-lightText" />
              <Input
                type="text"
                placeholder="Αναζήτηση εκδηλώσεων..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
              />
            </form>

            <div>
              <h4 className="text-sm font-medium text-mesia-wine mb-3">Κατηγορία:</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange('all')}
                >
                  Όλες
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {categoryLabels[category]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUpcoming}
                  onChange={handleUpcomingToggle}
                  className="border-mesia-gold text-mesia-wine focus:ring-mesia-wine"
                />
                <span className="text-sm text-mesia-darkText">Μόνο επερχόμενες</span>
              </label>

              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Καθαρισμός φίλτρων
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-mesia-lightText">
            {filteredEvents.length === 0
              ? 'Δεν βρέθηκαν εκδηλώσεις'
              : `Βρέθηκαν ${filteredEvents.length} εκδηλώσεις`
            }
            {hasActiveFilters && (
              <span className="text-mesia-wine font-medium"> με τα τρέχοντα φίλτρα</span>
            )}
          </p>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 border border-mesia-gold/30 bg-white">
            <div className="h-16 w-16 text-mesia-lightText mx-auto mb-4 text-6xl">📅</div>
            <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-4">
              Δεν βρέθηκαν εκδηλώσεις
            </h3>
            <p className="text-mesia-lightText mb-6">
              {hasActiveFilters
                ? 'Δοκιμάστε να αλλάξετε τα φίλτρα αναζήτησης.'
                : 'Δεν υπάρχουν εκδηλώσεις προς το παρόν.'
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters}>
                Καθαρισμός φίλτρων
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id} className="block">
                <div className="border border-mesia-gold/25 bg-white p-6 hover:border-mesia-wine/40 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    {event.isPinned && (
                      <Pin className="h-5 w-5 text-mesia-gold mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-mesia-wine font-greek mb-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-mesia-lightText flex-wrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(event.eventDate).toLocaleDateString('el-GR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-wide border border-mesia-wine/25 text-mesia-wine px-3 py-1 flex-shrink-0">
                          {categoryLabels[event.category]}
                        </span>
                      </div>

                      {event.description && (
                        <p className="text-mesia-darkText/80 mb-4 leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="text-xs font-mono text-mesia-lightText">
                          {event.creator.name}
                        </div>
                        {new Date(event.eventDate) >= new Date() && (
                          <span className="font-mono text-xs uppercase tracking-wide border border-green-700/25 bg-green-50 text-green-800 px-2 py-1">
                            Επερχόμενη
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
