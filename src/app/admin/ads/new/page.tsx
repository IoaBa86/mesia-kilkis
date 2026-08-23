// src/app/admin/ads/new/page.tsx
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, ArrowLeft } from "lucide-react"

const DEFAULT_AD_CLIENT = "ca-pub-1184028367307988"

export default function NewAdSlotPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [formData, setFormData] = useState({
    key: "",
    name: "",
    page: "",
    position: "",
    adClient: DEFAULT_AD_CLIENT,
    adSlotId: "",
    adFormat: "auto",
    isActive: true,
    order: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/ad-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/ads')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά τη δημιουργία της θέσης')
      }
    } catch (error) {
      console.error('Error creating ad slot:', error)
      setError('Σφάλμα κατά τη δημιουργία της θέσης')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/admin/ads")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Επιστροφή
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Νέα Θέση Διαφήμισης</h1>
              <p className="text-gray-600">Προσθέστε μια νέα θέση AdSense</p>
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
              Το `key` πρέπει να ταιριάζει με το `slotKey` που χρησιμοποιεί το component στη σελίδα (π.χ. home-ad-1, photos-ad-1, village-ad-2)
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
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={handleChange("key")}
                    placeholder="π.χ. home-ad-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="name">Όνομα *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="π.χ. Αρχική - Μετά τα στατιστικά"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="page">Σελίδα *</Label>
                  <Input
                    id="page"
                    value={formData.page}
                    onChange={handleChange("page")}
                    placeholder="π.χ. home, photos, events, village"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="position">Θέση στη σελίδα *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={handleChange("position")}
                    placeholder="π.χ. after-stats, before-footer"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="adClient">AdSense Client ID *</Label>
                  <Input
                    id="adClient"
                    value={formData.adClient}
                    onChange={handleChange("adClient")}
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="adSlotId">AdSense Slot ID *</Label>
                  <Input
                    id="adSlotId"
                    value={formData.adSlotId}
                    onChange={handleChange("adSlotId")}
                    placeholder="π.χ. 9390449710"
                    required
                  />
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
