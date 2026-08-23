// src/app/admin/museum-exhibits/[id]/edit/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import MarkdownEditor from "@/components/admin/MarkdownEditor"

const TYPE_OPTIONS = [
  { value: "EXHIBIT", label: "Έκθεμα" },
  { value: "AUDIO_GUIDE", label: "Ηχητικός Οδηγός" },
  { value: "VIRTUAL_TOUR", label: "Εικονική Περιήγηση" },
  { value: "ARTIFACT", label: "Αντικείμενο" },
]

const MEDIA_HELP: Record<string, string> = {
  EXHIBIT: "Προαιρετικό — σύνδεσμος σε βίντεο ή επιπλέον υλικό",
  AUDIO_GUIDE: "Σύνδεσμος σε αρχείο ήχου (π.χ. .mp3) — θα αναπαραχθεί με audio player",
  VIRTUAL_TOUR: "Σύνδεσμος ενσωμάτωσης (embed) από Matterport, Sketchfab, YouTube 360 κ.λπ.",
  ARTIFACT: "Προαιρετικό — σύνδεσμος σε επιπλέον υλικό",
}

export default function EditMuseumExhibitPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [formData, setFormData] = useState({
    type: "EXHIBIT",
    title: "",
    description: "",
    imageUrl: "",
    mediaUrl: "",
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/admin/museum-exhibits/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.exhibit) {
          setFormData({
            type: data.exhibit.type,
            title: data.exhibit.title,
            description: data.exhibit.description,
            imageUrl: data.exhibit.imageUrl || "",
            mediaUrl: data.exhibit.mediaUrl || "",
            isActive: data.exhibit.isActive,
          })
        } else {
          setError('Το έκθεμα δεν βρέθηκε')
        }
      })
      .catch(() => setError('Σφάλμα κατά τη φόρτωση'))
      .finally(() => setFetching(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      alert("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/museum-exhibits/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/museum-exhibits')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά την ενημέρωση')
      }
    } catch (error) {
      console.error('Error updating exhibit:', error)
      setError('Σφάλμα κατά την ενημέρωση')
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || fetching) {
    return <div className="flex items-center justify-center min-h-screen">Φόρτωση...</div>
  }

  if (status === "unauthenticated") {
    router.push("/admin/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/admin/museum-exhibits")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Επεξεργασία Εκθέματος</h1>
                <p className="text-gray-600 text-sm">{formData.title}</p>
              </div>
            </div>
            <Button type="submit" form="exhibit-form" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Αποθήκευση...' : 'Αποθήκευση'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form id="exhibit-form" onSubmit={handleSubmit} className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-mesia-wine font-greek">Βασικές Πληροφορίες</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">Τύπος *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-mesia-gold/30 rounded-md focus:outline-none focus:border-mesia-wine bg-white"
                >
                  {TYPE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">Τίτλος *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">URL Φωτογραφίας</label>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://..."
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">URL Πολυμέσων</label>
                <Input
                  value={formData.mediaUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, mediaUrl: e.target.value }))}
                  placeholder="https://..."
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
                <p className="text-xs text-mesia-lightText mt-1">{MEDIA_HELP[formData.type]}</p>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <label className="text-sm font-medium text-mesia-darkText">Ενεργό (εμφανίζεται στην ιστοσελίδα)</label>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-mesia-wine font-greek">Περιγραφή *</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value={formData.description}
                onChange={(description) => setFormData(prev => ({ ...prev, description }))}
              />
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
