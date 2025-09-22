// src/app/admin/photos/[id]/edit/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: string
  title: string
  titleEn: string | null
  description: string | null
  descriptionEn: string | null
  filename: string
  url: string
  thumbnailUrl: string
  alt: string
  isActive: boolean
  category: {
    id: string
    name: string
  }
  uploadedBy: {
    name: string
    email: string
  }
}

interface Category {
  id: string
  name: string
}

interface PhotoEditPageProps {
  params: { id: string }
}

export default function PhotoEditPage({ params }: PhotoEditPageProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [photo, setPhoto] = useState<Photo | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    alt: "",
    categoryId: "",
    isActive: true,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchPhoto()
      fetchCategories()
    }
  }, [session, params.id])

  const fetchPhoto = async () => {
    try {
      const response = await fetch(`/api/photos/${params.id}`)
      if (response.ok) {
        const photoData = await response.json()
        setPhoto(photoData)
        setFormData({
          title: photoData.title || "",
          titleEn: photoData.titleEn || "",
          description: photoData.description || "",
          descriptionEn: photoData.descriptionEn || "",
          alt: photoData.alt || "",
          categoryId: photoData.category.id || "",
          isActive: photoData.isActive,
        })
      } else {
        setError("Φωτογραφία δεν βρέθηκε")
      }
    } catch (error) {
      console.error('Error fetching photo:', error)
      setError("Σφάλμα κατά τη φόρτωση της φωτογραφίας")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`/api/photos/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const updatedPhoto = await response.json()
        setPhoto(updatedPhoto)
        setSuccess("Η φωτογραφία ενημερώθηκε επιτυχώς!")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά την ενημέρωση')
      }
    } catch (error) {
      console.error('Error updating photo:', error)
      setError('Σφάλμα κατά την ενημέρωση της φωτογραφίας')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη φωτογραφία;')) {
      return
    }

    try {
      const response = await fetch(`/api/photos/${params.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/photos')
      } else {
        setError('Σφάλμα κατά τη διαγραφή της φωτογραφίας')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
      setError('Σφάλμα κατά τη διαγραφή της φωτογραφίας')
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSwitchChange = (field: string) => (checked: boolean) => {
    setFormData({ ...formData, [field]: checked })
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Φόρτωση...</div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  if (!photo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">Η φωτογραφία δεν βρέθηκε</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/photos")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Επεξεργασία Φωτογραφίας</h1>
                <p className="text-gray-600">Επεξεργαστείτε τα στοιχεία της φωτογραφίας</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => window.open(photo.url, '_blank')}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Προβολή
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Διαγραφή
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photo Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Προεπισκόπηση</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Κατηγορία:</strong> {photo.category.name}</p>
                  <p><strong>Ανέβηκε από:</strong> {photo.uploadedBy.name}</p>
                  <p><strong>Αρχείο:</strong> {photo.filename}</p>
                  <div className="flex items-center">
                    <strong className="mr-2">Κατάσταση:</strong>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      photo.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {photo.isActive ? 'Ενεργή' : 'Ανενεργή'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Στοιχεία Φωτογραφίας</CardTitle>
                <CardDescription>
                  Επεξεργαστείτε τα στοιχεία και τις πληροφορίες της φωτογραφίας
                </CardDescription>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Τίτλος (Ελληνικά) *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={handleChange("title")}
                        placeholder="Τίτλος φωτογραφίας"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="titleEn">Τίτλος (Αγγλικά)</Label>
                      <Input
                        id="titleEn"
                        value={formData.titleEn}
                        onChange={handleChange("titleEn")}
                        placeholder="Photo title in English"
                      />
                    </div>
                  </div>

                  {/* Alt Text */}
                  <div>
                    <Label htmlFor="alt">Alt Text *</Label>
                    <Input
                      id="alt"
                      value={formData.alt}
                      onChange={handleChange("alt")}
                      placeholder="Περιγραφή για screen readers"
                      required
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="description">Περιγραφή (Ελληνικά)</Label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleChange("description")}
                        placeholder="Περιγραφή φωτογραφίας"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-24"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="descriptionEn">Περιγραφή (Αγγλικά)</Label>
                      <textarea
                        id="descriptionEn"
                        value={formData.descriptionEn}
                        onChange={handleChange("descriptionEn")}
                        placeholder="Photo description in English"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-24"
                      />
                    </div>
                  </div>

                  {/* Category and Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="categoryId">Κατηγορία</Label>
                      <select
                        id="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange("categoryId")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={handleSwitchChange("isActive")}
                      />
                      <Label htmlFor="isActive">Φωτογραφία ενεργή</Label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/admin/photos")}
                    >
                      Ακύρωση
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={saving}
                      className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Αποθήκευση..." : "Αποθήκευση Αλλαγών"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
