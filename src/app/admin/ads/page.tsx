// src/app/admin/ads/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Megaphone, Plus, Edit, Trash2 } from "lucide-react"

interface AdSlot {
  id: string
  key: string
  name: string
  page: string
  position: string
  adClient: string
  adSlotId: string
  adFormat: string
  isActive: boolean
  order: number
}

export default function AdSlotsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [adSlots, setAdSlots] = useState<AdSlot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchAdSlots()
  }, [])

  const fetchAdSlots = async () => {
    try {
      const response = await fetch('/api/ad-slots')
      if (response.ok) {
        setAdSlots(await response.json())
      }
    } catch (error) {
      console.error('Error fetching ad slots:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (slot: AdSlot) => {
    const updated = { ...slot, isActive: !slot.isActive }
    setAdSlots(adSlots.map(s => s.id === slot.id ? updated : s))
    try {
      const response = await fetch(`/api/ad-slots/${slot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      })
      if (!response.ok) {
        setAdSlots(adSlots.map(s => s.id === slot.id ? slot : s))
      }
    } catch (error) {
      console.error('Error toggling ad slot:', error)
      setAdSlots(adSlots.map(s => s.id === slot.id ? slot : s))
    }
  }

  const deleteAdSlot = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη θέση διαφήμισης;')) {
      return
    }

    try {
      const response = await fetch(`/api/ad-slots/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setAdSlots(adSlots.filter(s => s.id !== id))
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error deleting ad slot:', error)
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
              <h1 className="text-3xl font-bold text-gray-900">Θέσεις Διαφημίσεων</h1>
              <p className="text-gray-600">Διαχειριστείτε τις θέσεις AdSense σε όλο το site</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => router.push("/admin")} variant="outline">
                Επιστροφή
              </Button>
              <Button onClick={() => router.push("/admin/ads/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Νέα Θέση
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {adSlots.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-gray-900">Δεν υπάρχουν θέσεις διαφημίσεων</CardTitle>
              <CardDescription>
                Προσθέστε μια θέση διαφήμισης ώστε να εμφανίζονται AdSense ads στο site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/ads/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Δημιουργία Θέσης
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adSlots.map((slot) => (
              <Card key={slot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        slot.isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Megaphone className={`h-6 w-6 ${
                          slot.isActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{slot.name}</CardTitle>
                        <p className="text-sm text-gray-500 font-mono">{slot.key}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/ads/${slot.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAdSlot(slot.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <p><span className="text-gray-400">Σελίδα:</span> {slot.page}</p>
                    <p><span className="text-gray-400">Θέση:</span> {slot.position}</p>
                    <p className="font-mono text-xs"><span className="text-gray-400 font-sans">Slot ID:</span> {slot.adSlotId}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm font-medium text-gray-700">
                      {slot.isActive ? 'Ενεργή' : 'Ανενεργή'}
                    </span>
                    <Switch
                      checked={slot.isActive}
                      onCheckedChange={() => toggleActive(slot)}
                    />
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
