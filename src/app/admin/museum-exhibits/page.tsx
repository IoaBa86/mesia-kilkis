// src/app/admin/museum-exhibits/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Landmark, Plus, Edit, Trash2 } from "lucide-react"

const TYPE_LABELS: Record<string, string> = {
  EXHIBIT: "Έκθεμα",
  AUDIO_GUIDE: "Ηχητικός Οδηγός",
  VIRTUAL_TOUR: "Εικονική Περιήγηση",
  ARTIFACT: "Αντικείμενο",
}

interface MuseumExhibit {
  id: string
  type: string
  title: string
  isActive: boolean
  createdAt: string
  creator: { name: string | null }
}

export default function MuseumExhibitsAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [exhibits, setExhibits] = useState<MuseumExhibit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchExhibits()
  }, [])

  const fetchExhibits = async () => {
    try {
      const response = await fetch('/api/admin/museum-exhibits')
      if (response.ok) {
        const data = await response.json()
        setExhibits(data.exhibits || [])
      }
    } catch (error) {
      console.error('Error fetching museum exhibits:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (exhibit: MuseumExhibit) => {
    const updated = { ...exhibit, isActive: !exhibit.isActive }
    setExhibits(exhibits.map(x => x.id === exhibit.id ? updated : x))
    try {
      const response = await fetch(`/api/admin/museum-exhibits/${exhibit.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: updated.isActive }),
      })
      if (!response.ok) {
        setExhibits(exhibits.map(x => x.id === exhibit.id ? exhibit : x))
      }
    } catch (error) {
      console.error('Error updating exhibit:', error)
      setExhibits(exhibits.map(x => x.id === exhibit.id ? exhibit : x))
    }
  }

  const deleteExhibit = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το έκθεμα;')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/museum-exhibits/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setExhibits(exhibits.filter(x => x.id !== id))
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error deleting exhibit:', error)
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
              <h1 className="text-3xl font-bold text-gray-900">Ψηφιακό Μουσείο</h1>
              <p className="text-gray-600">Εκθέματα, ηχητικοί οδηγοί, περιηγήσεις και αντικείμενα</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => router.push("/admin")} variant="outline">
                Επιστροφή
              </Button>
              <Button onClick={() => router.push("/admin/museum-exhibits/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Νέο Έκθεμα
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {exhibits.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <Landmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-gray-900">Δεν υπάρχουν εκθέματα ακόμα</CardTitle>
              <CardDescription>
                Ξεκινήστε προσθέτοντας το πρώτο έκθεμα του ψηφιακού μουσείου
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/museum-exhibits/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Δημιουργία
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exhibits.map((exhibit) => (
              <Card key={exhibit.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        exhibit.isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Landmark className={`h-6 w-6 ${exhibit.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{exhibit.title}</CardTitle>
                        <p className="text-sm text-gray-500">{TYPE_LABELS[exhibit.type] || exhibit.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/museum-exhibits/${exhibit.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteExhibit(exhibit.id)}
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
                      {exhibit.isActive ? 'Ενεργό' : 'Ανενεργό'}
                    </span>
                    <Switch checked={exhibit.isActive} onCheckedChange={() => toggleActive(exhibit)} />
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
