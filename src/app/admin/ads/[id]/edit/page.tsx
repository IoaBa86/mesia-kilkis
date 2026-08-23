// src/app/admin/ads/[id]/edit/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save, ArrowLeft } from "lucide-react"
import { AD_SLOT_PAGES, AD_SLOT_PLACEMENTS } from "@/lib/ad-slot-placements"

const CUSTOM_POSITION = "__custom__"

export default function EditAdSlotPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [formData, setFormData] = useState({
    key: "",
    name: "",
    page: "",
    position: "",
    adClient: "",
    adSlotId: "",
    adFormat: "auto",
    isActive: true,
    order: 0,
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [customPosition, setCustomPosition] = useState(false)

  const positionsForPage = AD_SLOT_PLACEMENTS.filter((p) => p.page === formData.page)
  const knownPage = AD_SLOT_PAGES.some((p) => p.page === formData.page)

  useEffect(() => {
    fetch('/api/ad-slots')
      .then(res => res.json())
      .then((slots: any[]) => {
        const slot = slots.find(s => s.id === id)
        if (slot) {
          setFormData({
            key: slot.key,
            name: slot.name,
            page: slot.page,
            position: slot.position,
            adClient: slot.adClient,
            adSlotId: slot.adSlotId,
            adFormat: slot.adFormat,
            isActive: slot.isActive,
            order: slot.order,
          })
          const matches = AD_SLOT_PLACEMENTS.some((p) => p.page === slot.page && p.key === slot.key)
          setCustomPosition(!matches)
        } else {
          setError('Η θέση διαφήμισης δεν βρέθηκε')
        }
      })
      .catch(() => setError('Σφάλμα κατά τη φόρτωση'))
      .finally(() => setFetching(false))
  }, [id])

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const page = e.target.value
    setCustomPosition(false)
    setFormData({ ...formData, page, position: "", key: "" })
  }

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === CUSTOM_POSITION) {
      setCustomPosition(true)
      setFormData({ ...formData, position: "", key: "" })
      return
    }
    setCustomPosition(false)
    const placement = AD_SLOT_PLACEMENTS.find((p) => p.page === formData.page && p.key === value)
    if (placement) {
      setFormData({ ...formData, position: placement.position, key: placement.key })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/ad-slots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/ads')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά την ενημέρωση της θέσης')
      }
    } catch (error) {
      console.error('Error updating ad slot:', error)
      setError('Σφάλμα κατά την ενημέρωση της θέσης')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/admin/ads")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Επιστροφή
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Επεξεργασία Θέσης</h1>
              <p className="text-gray-600">{formData.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Στοιχεία Θέσης</CardTitle>
            <CardDescription>
              Το `key` πρέπει να ταιριάζει με το `slotKey` που χρησιμοποιεί το component στη σελίδα
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="key">Key (μοναδικό) *</Label>
                  <Input id="key" value={formData.key} onChange={handleChange("key")} required />
                </div>

                <div>
                  <Label htmlFor="name">Όνομα *</Label>
                  <Input id="name" value={formData.name} onChange={handleChange("name")} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="page">Σελίδα *</Label>
                  <Select id="page" value={formData.page} onChange={handlePageChange} required>
                    <option value="" disabled>Επιλέξτε σελίδα</option>
                    {!knownPage && formData.page && (
                      <option value={formData.page}>{formData.page}</option>
                    )}
                    {AD_SLOT_PAGES.map((p) => (
                      <option key={p.page} value={p.page}>{p.pageLabel}</option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="position">Θέση στη σελίδα *</Label>
                  {!customPosition ? (
                    <Select
                      id="position"
                      value={formData.key}
                      onChange={handlePositionChange}
                      disabled={!formData.page}
                      required
                    >
                      <option value="" disabled>
                        {formData.page ? "Επιλέξτε θέση" : "Επιλέξτε πρώτα σελίδα"}
                      </option>
                      {positionsForPage.map((p) => (
                        <option key={p.key} value={p.key}>{p.positionLabel} ({p.key})</option>
                      ))}
                      <option value={CUSTOM_POSITION}>Προσαρμοσμένη θέση…</option>
                    </Select>
                  ) : (
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={handleChange("position")}
                      placeholder="π.χ. after-stats, before-footer"
                      required
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="adClient">AdSense Client ID *</Label>
                  <Input id="adClient" value={formData.adClient} onChange={handleChange("adClient")} required />
                </div>

                <div>
                  <Label htmlFor="adSlotId">AdSense Slot ID *</Label>
                  <Input id="adSlotId" value={formData.adSlotId} onChange={handleChange("adSlotId")} required />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 pb-2">
                <div>
                  <Label htmlFor="isActive">Ενεργή</Label>
                  <p className="text-sm text-gray-500">Αν είναι ανενεργή, η διαφήμιση δεν εμφανίζεται στο site</p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/ads")}>
                  Ακύρωση
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Αποθήκευση..." : "Αποθήκευση"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
