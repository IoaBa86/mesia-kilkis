// src/app/events/[id]/page.tsx - Fixed with responsive Image component
"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft, 
  User,
  Share2,
  CalendarPlus,
  Info
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
    email: string
  }
  createdAt: string
  updatedAt: string
}

const categoryLabels = {
  'ANNOUNCEMENT': 'Ανακοίνωση',
  'FESTIVAL': 'Φεστιβάλ',
  'MEETING': 'Συνεδρίαση',
  'CULTURAL': 'Πολιτιστική',
  'RELIGIOUS': 'Θρησκευτική',
  'SPORTS': 'Αθλητική',
  'COMMUNITY': 'Κοινοτική',
  'OTHER': 'Άλλη'
}

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState('')

  // Fetch event data on client side
  useEffect(() => {
    async function fetchEvent() {
      console.log('🔍 Event ID from URL:', params.id)
      
      if (!params?.id) {
        console.log('❌ No event ID provided in URL')
        setError('Το ID της εκδήλωσης λείπει από το URL')
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        console.log('📡 Fetching event data from:', `/api/events/${params.id}`)
        
        const response = await fetch(`/api/events/${params.id}`)
        console.log('📊 API Response status:', response.status)
        
        if (response.ok) {
          const eventData = await response.json()
          console.log('✅ Event data received:', eventData)
          setEvent(eventData)
        } else {
          const errorData = await response.text()
          console.log('❌ API Error response:', errorData)
          setError(`API Error: ${response.status} - ${errorData}`)
          setNotFound(true)
        }
      } catch (error) {
        console.error('💥 Fetch error:', error)
        setError(`Network Error: ${error.message}`)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('el-GR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString))
  }

  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('el-GR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(dateString))
  }

  // Event handlers
  const handleAddToCalendar = () => {
    if (!event) return
    
    const eventUrl = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${new Date(event.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
END:VEVENT
END:VCALENDAR`
    
    const element = document.createElement('a')
    element.setAttribute('href', eventUrl)
    element.setAttribute('download', `${event.title}.ics`)
    element.click()
  }

  const handleShare = () => {
    if (!event) return
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description || '',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Ο σύνδεσμος αντιγράφηκε!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mesia-wine mx-auto mb-4"></div>
          <div className="text-xl text-mesia-wine">Φόρτωση εκδήλωσης...</div>
          <div className="text-sm text-mesia-lightText mt-2">ID: {params.id}</div>
        </div>
      </div>
    )
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Calendar className="h-24 w-24 text-mesia-gold mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-mesia-wine mb-4">Εκδήλωση δεν βρέθηκε</h1>
          <p className="text-mesia-lightText mb-4">
            Η εκδήλωση με ID: <strong>{params.id}</strong> δεν υπάρχει ή δεν είναι διαθέσιμη.
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              <strong>Σφάλμα:</strong> {error}
            </div>
          )}
          <Link href="/events">
            <Button className="bg-mesia-wine text-white hover:bg-mesia-wine/90">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Επιστροφή στις Εκδηλώσεις
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isUpcoming = new Date(event.eventDate) > new Date()
  const isPast = new Date(event.eventDate) < new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Navigation */}
      <header>
        <nav className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-mesia-wine to-mesia-gold rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg font-greek">Μ</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-mesia-wine font-greek">Μεσιά Κιλκίς</h1>
                  <p className="text-xs text-mesia-lightText">Λεπτομέρειες Εκδήλωσης</p>
                </div>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-mesia-wine hover:text-mesia-gold transition-colors font-medium">
                  Αρχική
                </Link>
                <Link href="/photos" className="text-mesia-wine hover:text-mesia-gold transition-colors font-medium">
                  Φωτογραφίες
                </Link>
                <Link href="/events" className="text-mesia-wine hover:text-mesia-gold transition-colors font-medium">
                  Εκδηλώσεις
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/events">
            <Button variant="outline" className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Επιστροφή στις Εκδηλώσεις
            </Button>
          </Link>
        </div>

        {/* Event Header */}
        <div className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl rounded-2xl overflow-hidden mb-8">
    {/* Event Image - Fits completely within container */}
{event.imageUrl && (
  <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-mesia-lightCream flex items-center justify-center overflow-hidden">
    <Image
      src={event.imageUrl}
      alt={event.title}
      fill
      priority
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
      className="transition-all duration-300 hover:scale-105"
      style={{
        objectFit: 'contain', // 👈 Shows full image, may have letterboxing
        objectPosition: 'center'
      }}
    />
    {/* Gradient overlay - lighter for contain */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    
    {/* Pinned badge */}
    {event.isPinned && (
      <div className="absolute top-4 right-4 bg-mesia-gold/90 backdrop-blur-sm text-mesia-wine px-3 py-1 rounded-full text-sm font-medium shadow-lg">
        📌 Καρφιτσωμένη
      </div>
    )}
  </div>
)}


          {/* Event Content */}
          <div className="p-8">
            {/* Category & Status */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-mesia-wine/10 text-mesia-wine">
                {categoryLabels[event.category as keyof typeof categoryLabels] || event.category}
              </span>
              {isUpcoming && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✨ Επερχόμενη
                </span>
              )}
              {isPast && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                  📅 Παρελθούσα
                </span>
              )}
            </div>

            {/* Event Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-mesia-wine font-greek mb-6 leading-tight">
              {event.title}
            </h1>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Date & Time */}
              <Card className="border-mesia-gold/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-mesia-wine">
                    <Calendar className="h-5 w-5 mr-2" />
                    Ημερομηνία & Ώρα
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-mesia-darkText">
                      {formatDate(event.eventDate)}
                    </p>
                    <p className="text-mesia-lightText flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatTime(event.eventDate)}
                      {event.endDate && ` - ${formatTime(event.endDate)}`}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              {event.location && (
                <Card className="border-mesia-gold/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-mesia-wine">
                      <MapPin className="h-5 w-5 mr-2" />
                      Τοποθεσία
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-mesia-darkText">{event.location}</p>
                  </CardContent>
                </Card>
              )}

              {/* Organizer */}
              {event.creator.name && (
                <Card className="border-mesia-gold/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-mesia-wine">
                      <User className="h-5 w-5 mr-2" />
                      Διοργανωτής
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-mesia-darkText">{event.creator.name}</p>
                  </CardContent>
                </Card>
              )}

              {/* Event Info */}
              <Card className="border-mesia-gold/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-mesia-wine">
                    <Info className="h-5 w-5 mr-2" />
                    Πληροφορίες
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-sm text-mesia-lightText">
                    <p>Δημοσιεύτηκε: {new Date(event.createdAt).toLocaleDateString('el-GR')}</p>
                    {new Date(event.updatedAt) > new Date(event.createdAt) && (
                      <p>Ενημερώθηκε: {new Date(event.updatedAt).toLocaleDateString('el-GR')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event Description */}
            {event.description && (
              <Card className="border-mesia-gold/20 mb-8">
                <CardHeader>
                  <CardTitle className="text-mesia-wine font-greek">Περιγραφή</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none text-mesia-darkText">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/events">
                <Button className="bg-mesia-wine text-white hover:bg-mesia-wine/90">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Όλες οι Εκδηλώσεις
                </Button>
              </Link>
              
              {isUpcoming && (
                <Button 
                  variant="outline" 
                  className="border-mesia-gold text-mesia-wine hover:bg-mesia-gold hover:text-mesia-wine"
                  onClick={handleAddToCalendar}
                >
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Προσθήκη στο Ημερολόγιο
                </Button>
              )}

              <Button 
                variant="outline" 
                className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Κοινοποίηση
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-mesia-darkText via-mesia-wine to-mesia-darkText text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-mesia-gold to-mesia-accent rounded-xl flex items-center justify-center">
                <span className="text-mesia-wine font-bold text-xl">Μ</span>
              </div>
              <h3 className="text-4xl font-bold font-greek text-mesia-gold">Μεσιά Κιλκίς</h3>
            </div>
            <p className="text-mesia-cream text-xl mb-8">
              Παραδοσιακό χωριό της Κεντρικής Μακεδονίας
            </p>
            <div className="border-t border-mesia-wine pt-8">
              <p className="text-mesia-lightCream">
                © 2025 Μεσιά Κιλκίς. Όλα τα δικαιώματα διατηρούνται.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
