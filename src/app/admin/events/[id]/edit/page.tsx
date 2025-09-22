// src/app/admin/events/[id]/edit/page.tsx - Event Edit Page
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, X } from "lucide-react"
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
  imageUrl: string | null
}

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [isActive, setIsActive] = useState(true)

  const categories = [
    { value: 'ANNOUNCEMENT', label: 'Ανακοινώσεις' },
    { value: 'FESTIVAL', label: 'Φεστιβάλ' },
    { value: 'MEETING', label: 'Συνεδριάσεις' },
    { value: 'CULTURAL', label: 'Πολιτιστικές' },
    { value: 'RELIGIOUS', label: 'Θρησκευτικές' },
    { value: 'SPORTS', label: 'Αθλητικές' },
    { value: 'COMMUNITY', label: 'Κοινοτικές' },
    { value: 'OTHER', label: 'Άλλες' }
  ]

  // Load event data
  useEffect(() => {
    async function fetchEvent() {
      if (!params.id) return

      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (response.ok) {
          const eventData = await response.json()
          setEvent(eventData)
          
          // Populate form fields
          setTitle(eventData.title || "")
          setDescription(eventData.description || "")
          setEventDate(eventData.eventDate ? new Date(eventData.eventDate).toISOString().slice(0, 16) : "")
          setEndDate(eventData.endDate ? new Date(eventData.endDate).toISOString().slice(0, 16) : "")
          setLocation(eventData.location || "")
          setCategory(eventData.category || "ANNOUNCEMENT")
          setImageUrl(eventData.imageUrl || "")
          setIsPinned(eventData.isPinned || false)
          setIsActive(eventData.isActive !== false)
        } else {
          alert('Σφάλμα φόρτωσης εκδήλωσης')
          router.push('/admin/events')
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        alert('Σφάλμα φόρτωσης εκδήλωσης')
        router.push('/admin/events')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params.id, router])

  // Save changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('Ο τίτλος είναι υποχρεωτικός')
      return
    }

    if (!eventDate) {
      alert('Η ημερομηνία είναι υποχρεωτική')
      return
    }

    setSaving(true)

    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          eventDate: new Date(eventDate).toISOString(),
          endDate: endDate ? new Date(endDate).toISOString() : null,
          location: location.trim() || null,
          category,
          imageUrl: imageUrl.trim() || null,
          isPinned,
          isActive
        }),
      })

      if (response.ok) {
        router.push('/admin/events')
      } else {
        alert('Σφάλμα κατά την αποθήκευση των αλλαγών')
      }
    } catch (error) {
      console.error('Error saving event:', error)
      alert('Σφάλμα κατά την αποθήκευση των αλλαγών')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-mesia-wine mx-auto mb-4"></div>
          <div className="text-xl text-mesia-wine">Φόρτωση εκδήλωσης...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/events">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Επιστροφή</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-mesia-wine font-greek">
                  Επεξεργασία Εκδήλωσης
                </h1>
                <p className="text-mesia-lightText">
                  Ενημερώστε τα στοιχεία της εκδήλωσης
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-mesia-wine font-greek">
              Στοιχεία Εκδήλωσης
            </CardTitle>
            <CardDescription>
              Συμπληρώστε τα παρακάτω πεδία για να ενημερώσετε την εκδήλωση
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-mesia-wine mb-2">
                  Τίτλος *
                </label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Εισάγετε τον τίτλο της εκδήλωσης"
                  required
                  className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-mesia-wine mb-2">
                  Περιγραφή
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Εισάγετε την περιγραφή της εκδήλωσης"
                  rows={4}
                  className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-mesia-wine mb-2">
                    Ημερομηνία & Ώρα Έναρξης *
                  </label>
                  <Input
                    id="eventDate"
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-mesia-wine mb-2">
                    Ημερομηνία & Ώρα Λήξης
                  </label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-mesia-wine mb-2">
                  Τοποθεσία
                </label>
                <Input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Εισάγετε την τοποθεσία της εκδήλωσης"
                  className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-mesia-wine mb-2">
                  Κατηγορία
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-mesia-wine mb-2">
                  URL Εικόνας
                </label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="rounded border-mesia-gold text-mesia-wine focus:ring-mesia-wine"
                  />
                  <label htmlFor="isPinned" className="text-sm text-mesia-darkText">
                    Καρφιτσωμένη εκδήλωση (εμφανίζεται στην κορυφή)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-mesia-gold text-mesia-wine focus:ring-mesia-wine"
                  />
                  <label htmlFor="isActive" className="text-sm text-mesia-darkText">
                    Ενεργή εκδήλωση (ορατή στο κοινό)
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-mesia-gold/20">
                <Link href="/admin/events">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="border-mesia-lightText text-mesia-lightText hover:bg-mesia-lightText hover:text-white"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Ακύρωση
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Αποθήκευση...' : 'Αποθήκευση Αλλαγών'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
