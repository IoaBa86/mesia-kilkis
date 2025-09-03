// src/components/EventsClient.tsx - Updated with clickable event cards
"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"  // 👈 ADD THIS IMPORT
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  MapPin, 
  Clock, 
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
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(initialSearch || '')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all')
  const [showUpcoming, setShowUpcoming] = useState(initialUpcoming || false)

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    let filtered = [...initialEvents]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Filter by upcoming
    if (showUpcoming) {
      const now = new Date()
      filtered = filtered.filter(event => new Date(event.eventDate) >= now)
    }

    return filtered
  }, [initialEvents, searchQuery, selectedCategory, showUpcoming])

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams()
    
    if (searchQuery.trim()) params.set('search', searchQuery.trim())
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (showUpcoming) params.set('upcoming', 'true')

    const queryString = params.toString()
    const newURL = queryString ? `/events?${queryString}` : '/events'
    
    router.push(newURL, { scroll: false })
  }

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL()
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setTimeout(updateURL, 0)
  }

  // Handle upcoming toggle
  const handleUpcomingToggle = () => {
    setShowUpcoming(!showUpcoming)
    setTimeout(updateURL, 0)
  }

  // Clear all filters
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
        <div className="mb-12">
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-mesia-wine font-greek">
                <Filter className="h-5 w-5 mr-2" />
                Αναζήτηση & Φίλτρα
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Search Bar */}
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

                {/* Category Filter */}
                <div>
                  <h4 className="text-sm font-medium text-mesia-wine mb-3">Κατηγορία:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryChange('all')}
                      className={selectedCategory === 'all' 
                        ? 'bg-mesia-wine text-white' 
                        : 'border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white'
                      }
                    >
                      Όλες
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange(category)}
                        className={selectedCategory === category 
                          ? 'bg-mesia-wine text-white' 
                          : 'border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white'
                        }
                      >
                        {categoryLabels[category]}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showUpcoming}
                        onChange={handleUpcomingToggle}
                        className="rounded border-mesia-gold text-mesia-wine focus:ring-mesia-wine"
                      />
                      <span className="text-sm text-mesia-darkText">Μόνο επερχόμενες</span>
                    </label>
                  </div>

                  {hasActiveFilters && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-mesia-lightText hover:text-mesia-wine"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Καθαρισμός φίλτρων
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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

        {/* Events Grid */}
  
{filteredEvents.length === 0 ? (
  <Card className="text-center py-16 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
    <CardContent>
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
        <Button onClick={clearFilters} className="bg-mesia-wine text-white">
          Καθαρισμός φίλτρων
        </Button>
      )}
    </CardContent>
  </Card>
) : (
  <div className="space-y-6">
    {filteredEvents.map((event) => (
      <Link href={`/events/${event.id}`} key={event.id}>
        <Card className="cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  {event.isPinned && (
                    <Pin className="h-5 w-5 text-mesia-gold mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-2 hover:text-mesia-gold transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-mesia-lightText mb-3">
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
                      <div className="ml-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.category === 'ANNOUNCEMENT' ? 'bg-blue-100 text-blue-800' :
                          event.category === 'FESTIVAL' ? 'bg-purple-100 text-purple-800' :
                          event.category === 'MEETING' ? 'bg-green-100 text-green-800' :
                          event.category === 'CULTURAL' ? 'bg-orange-100 text-orange-800' :
                          event.category === 'RELIGIOUS' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {categoryLabels[event.category]}
                        </span>
                      </div>
                    </div>
                    
                    {event.description && (
                      <p className="text-mesia-darkText mb-4 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-mesia-lightText">
                        Δημιουργήθηκε από: {event.creator.name}
                      </div>
                      {new Date(event.eventDate) >= new Date() && (
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Επερχόμενη
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
)}

      </div>
    </section>
  )
}
