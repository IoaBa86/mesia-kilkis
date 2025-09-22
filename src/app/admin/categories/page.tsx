// src/app/admin/categories/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  nameEn: string | null
  slug: string
  description: string | null
  order: number
  isActive: boolean
  createdAt: string
  _count: {
    photos: number
  }
}

export default function CategoriesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την κατηγορία;')) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== id))
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Σφάλμα κατά τη διαγραφή της κατηγορίας')
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
              <h1 className="text-3xl font-bold text-gray-900">Κατηγορίες Φωτογραφιών</h1>
              <p className="text-gray-600">Διαχειριστείτε τις κατηγορίες της γκαλερί</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => router.push("/admin")}
                variant="outline"
              >
                Επιστροφή
              </Button>
              <Button onClick={() => router.push("/admin/categories/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Νέα Κατηγορία
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {categories.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-gray-900">Δεν υπάρχουν κατηγορίες</CardTitle>
              <CardDescription>
                Ξεκινήστε δημιουργώντας την πρώτη κατηγορία φωτογραφιών
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/categories/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Δημιουργία Κατηγορίας
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        category.isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <FolderOpen className={`h-6 w-6 ${
                          category.isActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        {category.nameEn && (
                          <p className="text-sm text-gray-500">{category.nameEn}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/categories/${category.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {category.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      {category._count.photos} φωτογραφίες
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      category.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {category.isActive ? 'Ενεργή' : 'Ανενεργή'}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => router.push(`/admin/photos?category=${category.id}`)}
                    >
                      Προβολή Φωτογραφιών
                    </Button>
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
