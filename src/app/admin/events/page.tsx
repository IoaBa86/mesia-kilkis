// src/app/admin/events/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Calendar, Pin, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string | null
  eventDate: string
  endDate: string | null
  location: string | null
  category: string
  isActive: boolean
  isPinned: boolean
  creator: {
    name: string
    email: string
  }
}

export default function AdminEventsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = [
    { value: '', label: 'Όλες οι κατηγορίες' },
    { value: 'ANNOUNCEMENT', label: 'Ανακοινώσεις' },
    { value: 'FESTIVAL', label: 'Φεστιβάλ' },
    { value: 'MEETING', label: 'Συνεδριάσεις' },
    { value: 'CULTURAL', label: 'Πολιτιστικές' },
    { value: 'RELIGIOUS', label: 'Θρησκευτικές' },
    { value: 'SPORTS', label: 'Αθλητικές' },
    { value: 'COMMUNITY', label: 'Κοινοτικές' },
    { value: 'OTHER', label: 'Άλλες' }
  ]

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchEvents()
  }, [selectedCategory])

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedCategory) {
        params.append('category', selectedCategory)
      }
      
      const response = await fetch(`/api/events?${params}`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την εκδήλωση;')) {
      return
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEvents(events.filter(event => event.id !== id))
      } else {
        alert('Σφάλμα κατά τη διαγραφή της εκδήλωσης')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      alert('Σφάλμα κατά τη διαγραφή της εκδήλωσης')
    }
  }

  const togglePin = async (id: string, currentPinned: boolean) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPinned: !currentPinned }),
      })

      if (response.ok) {
        fetchEvents() // Refresh the list
      } else {
        alert('Σφάλμα κατά την ενημέρωση της εκδήλωσης')
      }
    } catch (error) {
      console.error('Error updating event:', error)
      alert('Σφάλμα κατά την ενημέρωση της εκδήλωσης')
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <div className="text-xl text-mesia-wine">Φόρτωση...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin")}
                className="flex items-center space-x-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Επιστροφή</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-mesia-wine font-greek">
                  Διαχείριση Εκδηλώσεων
                </h1>
                <p className="text-mesia-lightText">
                  Δημιουργήστε και διαχειριστείτε εκδηλώσεις και ανακοινώσεις
                </p>
              </div>
            </div>
            <Button 
              onClick={() => router.push("/admin/events/new")}
              className="bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Νέα Εκδήλωση
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-mesia-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-mesia-wine" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine bg-white/80 backdrop-blur-sm"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <span className="text-sm text-mesia-lightText">
              {events.length} εκδηλώσεις συνολικά
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {events.length === 0 ? (
          <Card className="text-center py-16 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <div className="h-16 w-16 text-mesia-lightText mx-auto mb-4 text-6xl">📅</div>
              <CardTitle className="text-2xl text-mesia-wine font-greek">Δεν υπάρχουν εκδηλώσεις</CardTitle>
              <CardDescription className="text-lg">
                Δημιουργήστε την πρώτη εκδήλωση ή ανακοίνωση για το χωριό
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push("/admin/events/new")}
                className="bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Νέα Εκδήλωση
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <Card key={event.id} className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        {event.isPinned && (
                          <Pin className="h-5 w-5 text-mesia-gold mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-mesia-wine font-greek">
                              {event.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              event.category === 'ANNOUNCEMENT' ? 'bg-blue-100 text-blue-800' :
                              event.category === 'FESTIVAL' ? 'bg-purple-100 text-purple-800' :
                              event.category === 'MEETING' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {categories.find(cat => cat.value === event.category)?.label}
                            </span>
                          </div>
                          
                          {event.description && (
                            <p className="text-mesia-darkText mb-3 line-clamp-2">
                              {event.description}
                            </p>
                          )}
                          
                          <div className="flex items-center space-x-6 text-sm text-mesia-lightText">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(event.eventDate).toLocaleDateString('el-GR', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                <span>📍 {event.location}</span>
                              </div>
                            )}
                            <div className="text-xs">
                              Δημιουργήθηκε από: {event.creator.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={event.isPinned ? "default" : "outline"}
                        onClick={() => togglePin(event.id, event.isPinned)}
                        className={event.isPinned ? "bg-mesia-gold text-mesia-wine" : "border-mesia-gold text-mesia-gold hover:bg-mesia-gold hover:text-mesia-wine"}
                      >
                        <Pin className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/events/${event.id}`, '_blank')}
                        className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                        className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteEvent(event.id)}
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
