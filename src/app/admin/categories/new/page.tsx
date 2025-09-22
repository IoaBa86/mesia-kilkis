// src/app/admin/categories/new/page.tsx
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, ArrowLeft } from "lucide-react"

export default function NewCategoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    description: "",
    slug: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/categories')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά τη δημιουργία της κατηγορίας')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      setError('Σφάλμα κατά τη δημιουργία της κατηγορίας')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/categories")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Νέα Κατηγορία</h1>
                <p className="text-gray-600">Δημιουργήστε μια νέα κατηγορία φωτογραφιών</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Στοιχεία Κατηγορίας</CardTitle>
            <CardDescription>
              Συμπληρώστε τα στοιχεία για τη νέα κατηγορία φωτογραφιών
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
                  <Label htmlFor="name">Όνομα (Ελληνικά) *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    placeholder="π.χ. Αξιοθέατα"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="nameEn">Όνομα (Αγγλικά)</Label>
                  <Input
                    id="nameEn"
                    value={formData.nameEn}
                    onChange={handleChange("nameEn")}
                    placeholder="e.g. Sights"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={handleChange("slug")}
                  placeholder="Αυτόματο από το όνομα (προαιρετικό)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Αν δεν συμπληρωθεί, θα δημιουργηθεί αυτόματα από το ελληνικό όνομα
                </p>
              </div>

              <div>
                <Label htmlFor="description">Περιγραφή</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange("description")}
                  placeholder="Περιγραφή της κατηγορίας (προαιρετικό)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-24"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/categories")}
                >
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
