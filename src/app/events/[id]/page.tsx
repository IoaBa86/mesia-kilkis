// src/app/events/[id]/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
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

function DetailCard({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) {
  return (
    <div className="border border-mesia-gold/25 bg-white p-6">
      <div className="flex items-center text-mesia-wine mb-3">
        <Icon className="h-5 w-5 mr-2" />
        <h3 className="font-bold font-greek">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function EventDetailPage() {
  const params = useParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchEvent() {
      if (!params?.id) {
        setError('Το ID της εκδήλωσης λείπει από το URL')
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/events/${params.id}`)

        if (response.ok) {
          const eventData = await response.json()
          setEvent(eventData)
        } else {
          const errorData = await response.text()
          setError(`API Error: ${response.status} - ${errorData}`)
          setNotFound(true)
        }
      } catch (error) {
        setError(`Network Error: ${error instanceof Error ? error.message : String(error)}`)
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
      <div className="min-h-screen bg-mesia-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-mesia-wine mx-auto mb-4"></div>
          <div className="text-xl text-mesia-wine font-greek">Φόρτωση εκδήλωσης...</div>
        </div>
      </div>
    )
  }

  if (notFound || !event) {
    return (
      <div className="min-h-screen bg-mesia-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Calendar className="h-16 w-16 text-mesia-gold mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-mesia-wine font-greek mb-4">Εκδήλωση δεν βρέθηκε</h1>
          <p className="text-mesia-lightText mb-4">
            Η εκδήλωση με ID: <strong>{params.id}</strong> δεν υπάρχει ή δεν είναι διαθέσιμη.
          </p>
          {error && (
            <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 mb-4 text-sm text-left">
              <strong>Σφάλμα:</strong> {error}
            </div>
          )}
          <Button asChild>
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Επιστροφή στις Εκδηλώσεις
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const isUpcoming = new Date(event.eventDate) > new Date()
  const isPast = new Date(event.eventDate) < new Date()

  return (
    <div className="min-h-screen bg-mesia-cream">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Επιστροφή στις Εκδηλώσεις
            </Link>
          </Button>
        </div>

        <div className="border border-mesia-gold/25 bg-white">
          {event.imageUrl && (
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-mesia-lightCream flex items-center justify-center overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
              {event.isPinned && (
                <div className="absolute top-4 right-4 bg-mesia-gold text-mesia-wine px-3 py-1 text-sm font-medium font-mono uppercase tracking-wide">
                  Καρφιτσωμένη
                </div>
              )}
            </div>
          )}

          <div className="p-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium font-mono uppercase tracking-wide bg-mesia-wine/10 text-mesia-wine">
                {categoryLabels[event.category as keyof typeof categoryLabels] || event.category}
              </span>
              {isUpcoming && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium font-mono uppercase tracking-wide bg-green-100 text-green-800">
                  Επερχόμενη
                </span>
              )}
              {isPast && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium font-mono uppercase tracking-wide bg-gray-100 text-gray-600">
                  Παρελθούσα
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-mesia-wine font-greek mb-8 leading-tight">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <DetailCard icon={Calendar} title="Ημερομηνία & Ώρα">
                <p className="text-lg font-medium text-mesia-darkText">{formatDate(event.eventDate)}</p>
                <p className="text-mesia-lightText flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTime(event.eventDate)}
                  {event.endDate && ` - ${formatTime(event.endDate)}`}
                </p>
              </DetailCard>

              {event.location && (
                <DetailCard icon={MapPin} title="Τοποθεσία">
                  <p className="text-lg text-mesia-darkText">{event.location}</p>
                </DetailCard>
              )}

              {event.creator.name && (
                <DetailCard icon={User} title="Διοργανωτής">
                  <p className="text-lg text-mesia-darkText">{event.creator.name}</p>
                </DetailCard>
              )}

              <DetailCard icon={Info} title="Πληροφορίες">
                <div className="space-y-1 text-sm text-mesia-lightText">
                  <p>Δημοσιεύτηκε: {new Date(event.createdAt).toLocaleDateString('el-GR')}</p>
                  {new Date(event.updatedAt) > new Date(event.createdAt) && (
                    <p>Ενημερώθηκε: {new Date(event.updatedAt).toLocaleDateString('el-GR')}</p>
                  )}
                </div>
              </DetailCard>
            </div>

            {event.description && (
              <div className="border border-mesia-gold/25 bg-mesia-cream p-6 mb-8">
                <h3 className="font-bold font-greek text-mesia-wine mb-3">Περιγραφή</h3>
                <p className="whitespace-pre-wrap leading-relaxed text-mesia-darkText">
                  {event.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Όλες οι Εκδηλώσεις
                </Link>
              </Button>

              {isUpcoming && (
                <Button variant="outline" onClick={handleAddToCalendar}>
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Προσθήκη στο Ημερολόγιο
                </Button>
              )}

              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Κοινοποίηση
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
