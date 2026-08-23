// src/app/admin/village-voices/new/page.tsx
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import MarkdownEditor from "@/components/admin/MarkdownEditor"

const TYPE_OPTIONS = [
  { value: "RESIDENT_STORY", label: "Ιστορία Κατοίκου" },
  { value: "YOUTH_STORY", label: "Φωνή Νέων" },
  { value: "TESTIMONIAL", label: "Μαρτυρία Επισκέπτη" },
]

export default function NewVillageVoicePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formData, setFormData] = useState({
    type: "RESIDENT_STORY",
    authorName: "",
    title: "",
    content: "",
    imageUrl: "",
    isActive: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.authorName || !formData.title || !formData.content) {
      alert("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/admin/village-voices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/village-voices')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά τη δημιουργία')
      }
    } catch (error) {
      console.error('Error creating voice:', error)
      setError('Σφάλμα κατά τη δημιουργία')
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
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
              <Button variant="outline" onClick={() => router.push("/admin/village-voices")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Νέα Μαρτυρία</h1>
                <p className="text-gray-600 text-sm">Προσθέστε μια ιστορία κατοίκου, νέου ή επισκέπτη</p>
              </div>
            </div>
            <Button type="submit" form="voice-form" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Αποθήκευση...' : 'Δημοσίευση'}
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

        <form id="voice-form" onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm font-medium text-mesia-darkText mb-2">Όνομα *</label>
                <Input
                  value={formData.authorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                  placeholder="π.χ. Μαρία Παπαδοπούλου"
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">Τίτλος *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="π.χ. Θυμάμαι το χωριό στα παιδικά μου χρόνια"
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
              <CardTitle className="text-xl text-mesia-wine font-greek">Ιστορία *</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Γράψτε την ιστορία εδώ..."
              />
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
