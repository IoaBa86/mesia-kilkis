// src/app/admin/village-voices/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, Plus, Edit, Trash2 } from "lucide-react"

const TYPE_LABELS: Record<string, string> = {
  RESIDENT_STORY: "Ιστορία Κατοίκου",
  YOUTH_STORY: "Φωνή Νέων",
  TESTIMONIAL: "Μαρτυρία Επισκέπτη",
}

interface VillageVoice {
  id: string
  type: string
  authorName: string
  title: string
  isActive: boolean
  createdAt: string
  creator: { name: string | null }
}

export default function VillageVoicesAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [voices, setVoices] = useState<VillageVoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchVoices()
  }, [])

  const fetchVoices = async () => {
    try {
      const response = await fetch('/api/admin/village-voices')
      if (response.ok) {
        const data = await response.json()
        setVoices(data.voices || [])
      }
    } catch (error) {
      console.error('Error fetching village voices:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (voice: VillageVoice) => {
    const updated = { ...voice, isActive: !voice.isActive }
    setVoices(voices.map(v => v.id === voice.id ? updated : v))
    try {
      const response = await fetch(`/api/admin/village-voices/${voice.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updated.isActive }),
      })
      if (!response.ok) {
        setVoices(voices.map(v => v.id === voice.id ? voice : v))
      }
    } catch (error) {
      console.error('Error updating voice:', error)
      setVoices(voices.map(v => v.id === voice.id ? voice : v))
    }
  }

  const deleteVoice = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη μαρτυρία;')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/village-voices/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setVoices(voices.filter(v => v.id !== id))
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error deleting voice:', error)
      alert('Σφάλμα κατά τη διαγραφή')
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Φόρτωση...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Φωνές του Χωριού</h1>
              <p className="text-gray-600">Ιστορίες κατοίκων, νέων και μαρτυρίες επισκεπτών</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => router.push("/admin")} variant="outline">
                Επιστροφή
              </Button>
              <Button onClick={() => router.push("/admin/village-voices/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Νέα Μαρτυρία
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {voices.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-gray-900">Δεν υπάρχουν μαρτυρίες ακόμα</CardTitle>
              <CardDescription>
                Ξεκινήστε προσθέτοντας την πρώτη ιστορία ή μαρτυρία
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/village-voices/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Δημιουργία
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {voices.map((voice) => (
              <Card key={voice.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        voice.isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <MessageCircle className={`h-6 w-6 ${voice.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{voice.title}</CardTitle>
                        <p className="text-sm text-gray-500">{voice.authorName} · {TYPE_LABELS[voice.type] || voice.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/village-voices/${voice.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteVoice(voice.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-gray-700">
                      {voice.isActive ? 'Ενεργό' : 'Ανενεργό'}
                    </span>
                    <Switch checked={voice.isActive} onCheckedChange={() => toggleActive(voice)} />
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
