// src/app/admin/photos/manage/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Settings } from "lucide-react"
import PhotoReorder from "@/components/PhotoReorder"

interface Photo {
  id: string
  title: string
  url: string
  thumbnailUrl: string
  order: number
}

interface Category {
  id: string
  name: string
  photos: Photo[]
}

export default function PhotoManagePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchCategories()
    }
  }, [session])

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Listen for success/error events from PhotoReorder
    const handleSuccess = (event: CustomEvent) => {
      setSuccess(event.detail)
      setTimeout(() => setSuccess(""), 3000)
    }

    const handleError = (event: CustomEvent) => {
      setError(event.detail)
      setTimeout(() => setError(""), 3000)
    }

    window.addEventListener('showSuccess', handleSuccess as EventListener)
    window.addEventListener('showError', handleError as EventListener)

    return () => {
      window.removeEventListener('showSuccess', handleSuccess as EventListener)
      window.removeEventListener('showError', handleError as EventListener)
    }
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const categoriesData = await response.json()
        
        // Fetch photos for each category
        const categoriesWithPhotos = await Promise.all(
          categoriesData.map(async (category: any) => {
            const photosResponse = await fetch(`/api/photos?categoryId=${category.id}`)
            const photosData = await photosResponse.json()
            
            return {
              id: category.id,
              name: category.name,
              photos: photosData.photos || []
            }
          })
        )
        
        setCategories(categoriesWithPhotos)
        
        // Set first category as default if none selected
        if (!selectedCategory && categoriesWithPhotos.length > 0) {
          setSelectedCategory(categoriesWithPhotos[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Σφάλμα κατά τη φόρτωση των κατηγοριών')
    } finally {
      setLoading(false)
    }
  }

  const handleReorder = (newOrder: Photo[]) => {
    // Update local state
    setCategories(prev => 
      prev.map(cat => 
        cat.id === selectedCategory 
          ? { ...cat, photos: newOrder }
          : cat
      )
    )
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

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

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
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Settings className="h-8 w-8 mr-3" />
                  Διαχείριση Φωτογραφιών
                </h1>
                <p className="text-gray-600">Αναδιατάξτε τη σειρά των φωτογραφιών ανά κατηγορία</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Selector */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Κατηγορίες</CardTitle>
                <CardDescription>
                  Επιλέξτε κατηγορία για αναδιάταξη
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary-100 text-primary-800 border-2 border-primary-300'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-500">
                        {category.photos.length} φωτογραφίες
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Photo Reorder Interface */}
          <div className="lg:col-span-3">
            {selectedCategoryData ? (
              <PhotoReorder
                photos={selectedCategoryData.photos}
                categoryId={selectedCategoryData.id}
                categoryName={selectedCategoryData.name}
                onReorder={handleReorder}
              />
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <p className="text-gray-500">Επιλέξτε μια κατηγορία για να ξεκινήσετε</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
