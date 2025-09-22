// src/app/admin/events/new/page.tsx
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Calendar } from "lucide-react"

const categoryOptions = [
  { value: 'ANNOUNCEMENT', label: 'Ανακοίνωση' },
  { value: 'FESTIVAL', label: 'Φεστιβάλ' },
  { value: 'MEETING', label: 'Συνεδρίαση' },
  { value: 'CULTURAL', label: 'Πολιτιστική' },
  { value: 'RELIGIOUS', label: 'Θρησκευτική' },
  { value: 'SPORTS', label: 'Αθλητική' },
  { value: 'COMMUNITY', label: 'Κοινοτική' },
  { value: 'OTHER', label: 'Άλλη' }
]

export default function NewEventPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    eventDate: "",
    eventTime: "",
    endDate: "",
    endTime: "",
    location: "",
    category: "ANNOUNCEMENT",
    imageUrl: "",
    isPinned: false,
    isActive: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      // Combine date and time for eventDate
      const eventDateTime = new Date(`${formData.eventDate}T${formData.eventTime || '00:00'}`)
      let endDateTime = null
      
      if (formData.endDate) {
        endDateTime = new Date(`${formData.endDate}T${formData.endTime || '23:59'}`)
      }

      const eventData = {
        title: formData.title,
        titleEn: formData.titleEn || null,
        description: formData.description || null,
        descriptionEn: formData.descriptionEn || null,
        eventDate: eventDateTime.toISOString(),
        endDate: endDateTime?.toISOString() || null,
        location: formData.location || null,
        category: formData.category,
        imageUrl: formData.imageUrl || null,
        isPinned: formData.isPinned,
        isActive: formData.isActive,
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      if (response.ok) {
        const event = await response.json()
        setSuccess("Η εκδήλωση δημιουργήθηκε επιτυχώς!")
        setTimeout(() => {
          router.push("/admin/events")
        }, 2000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά τη δημιουργία της εκδήλωσης')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      setError('Σφάλμα κατά τη δημιουργία της εκδήλωσης')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSwitchChange = (field: string) => (checked: boolean) => {
    setFormData({ ...formData, [field]: checked })
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <div className="text-xl text-mesia-wine">Φόρτωση...</div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/admin/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/events")}
                className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-mesia-wine font-greek">Νέα Εκδήλωση</h1>
                <p className="text-mesia-lightText">Δημιουργήστε μια νέα εκδήλωση ή ανακοίνωση</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-mesia-gold mr-3" />
              <div>
                <CardTitle className="text-2xl text-mesia-wine font-greek">Στοιχεία Εκδήλωσης</CardTitle>
                <CardDescription className="text-lg">
                  Συμπληρώστε τα στοιχεία της νέας εκδήλωσης
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-mesia-wine font-greek border-b border-mesia-gold/30 pb-2">
                  Βασικές Πληροφορίες
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title">Τίτλος (Ελληνικά) *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={handleChange("title")}
                      placeholder="Τίτλος εκδήλωσης"
                      required
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="titleEn">Τίτλος (Αγγλικά)</Label>
                    <Input
                      id="titleEn"
                      value={formData.titleEn}
                      onChange={handleChange("titleEn")}
                      placeholder="Event title in English"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Κατηγορία *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={handleChange("category")}
                      className="w-full px-3 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine"
                      required
                    >
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Τοποθεσία</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={handleChange("location")}
                      placeholder="Τοποθεσία εκδήλωσης"
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-mesia-wine font-greek border-b border-mesia-gold/30 pb-2">
                  Περιγραφή
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="description">Περιγραφή (Ελληνικά)</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={handleChange("description")}
                      placeholder="Περιγραφή της εκδήλωσης..."
                      rows={6}
                      className="w-full px-3 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="descriptionEn">Περιγραφή (Αγγλικά)</Label>
                    <textarea
                      id="descriptionEn"
                      value={formData.descriptionEn}
                      onChange={handleChange("descriptionEn")}
                      placeholder="Event description in English..."
                      rows={6}
                      className="w-full px-3 py-2 border border-mesia-gold/30 rounded-lg focus:ring-2 focus:ring-mesia-wine focus:border-mesia-wine"
                    />
                  </div>
                </div>
              </div>

              {/* Date and Time */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-mesia-wine font-greek border-b border-mesia-gold/30 pb-2">
                  Ημερομηνία & Ώρα
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="eventDate">Ημερομηνία Έναρξης *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange("eventDate")}
                      required
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="eventTime">Ώρα Έναρξης</Label>
                    <Input
                      id="eventTime"
                      type="time"
                      value={formData.eventTime}
                      onChange={handleChange("eventTime")}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="endDate">Ημερομηνία Λήξης</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange("endDate")}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endTime">Ώρα Λήξης</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleChange("endTime")}
                      className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-mesia-wine font-greek border-b border-mesia-gold/30 pb-2">
                  Επιπλέον Επιλογές
                </h3>
                
                <div>
                  <Label htmlFor="imageUrl">URL Εικόνας</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange("imageUrl")}
                    placeholder="https://example.com/image.jpg"
                    className="border-mesia-gold/30 focus:border-mesia-wine focus:ring-mesia-wine"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="isPinned"
                      checked={formData.isPinned}
                      onCheckedChange={handleSwitchChange("isPinned")}
                    />
                    <Label htmlFor="isPinned" className="font-medium">
                      Καρφιτσωμένη εκδήλωση (εμφανίζεται πρώτη)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={handleSwitchChange("isActive")}
                    />
                    <Label htmlFor="isActive" className="font-medium">
                      Ενεργή εκδήλωση
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-mesia-gold/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/events")}
                  className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
                >
                  Ακύρωση
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white px-8"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Αποθήκευση..." : "Δημιουργία Εκδήλωσης"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
