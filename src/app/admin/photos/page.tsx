// src/app/admin/photos/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ArrowLeft, Eye, Edit, Trash2, Filter, Settings } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: string
  title: string
  filename: string
  url: string
  thumbnailUrl: string
  alt: string
  order: number
  isActive: boolean
  createdAt: string
  category: {
    name: string
    slug: string
  }
  uploadedBy: {
    name: string
    email: string
  }
}

interface Category {
  id: string
  name: string
  nameEn: string | null
  _count?: {
    photos: number
  }
}

export default function PhotosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [photos, setPhotos] = useState<Photo[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPhotos()
  }, [selectedCategory, pagination.page])

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

  const fetchPhotos = async () => {
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      
      if (selectedCategory) {
        params.append('categoryId', selectedCategory)
      }

      const response = await fetch(`/api/photos?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPhotos(data.photos)
        setPagination(prev => ({
          ...prev,
          total: data.pagination.total,
          pages: data.pagination.pages
        }))
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePhoto = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη φωτογραφία;')) {
      return
    }

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setPhotos(photos.filter(photo => photo.id !== id))
        // Update pagination total
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1
        }))
      } else {
        alert('Σφάλμα κατά τη διαγραφή της φωτογραφίας')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
      alert('Σφάλμα κατά τη διαγραφή της φωτογραφίας')
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="text-xl text-gray-600">Φόρτωση...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'Όλες οι κατηγορίες'

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-primary-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push("/admin")}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Επιστροφή</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-700 to-primary-900 bg-clip-text text-transparent">
                  Διαχείριση Φωτογραφιών
                </h1>
                <p className="text-gray-600">
                  {selectedCategory ? `Κατηγορία: ${selectedCategoryName}` : 'Όλες οι φωτογραφίες'}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => router.push("/admin/photos/manage")}
                variant="outline"
                className="flex items-center space-x-2 border-accent-300 text-accent-700 hover:bg-accent-50"
              >
                <Settings className="h-4 w-4" />
                <span>Διαχείριση Σειράς</span>
              </Button>
              <Button 
                onClick={() => router.push("/admin/photos/upload")}
                className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900 text-white"
              >
                <Upload className="h-4 w-4 mr-2" />
                Νέες Φωτογραφίες
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-primary-600" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setPagination(prev => ({ ...prev, page: 1 }))
              }}
              className="px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 backdrop-blur-sm"
            >
              <option value="">Όλες οι κατηγορίες</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} {category._count?.photos ? `(${category._count.photos})` : ''}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-600">
              {pagination.total} φωτογραφίες συνολικά
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {photos.length === 0 ? (
          <Card className="text-center py-16 bg-white/80 backdrop-blur-sm border border-primary-200/50 shadow-xl">
            <CardHeader>
              <div className="h-16 w-16 text-gray-400 mx-auto mb-4 text-6xl">📷</div>
              <CardTitle className="text-2xl text-gray-900">Δεν υπάρχουν φωτογραφίες</CardTitle>
              <CardDescription className="text-lg">
                {selectedCategory 
                  ? `Δεν υπάρχουν φωτογραφίες στην κατηγορία "${selectedCategoryName}"`
                  : "Ξεκινήστε ανεβάζοντας τις πρώτες φωτογραφίες"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push("/admin/photos/upload")}
                className="bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-700 hover:to-primary-900"
              >
                <Upload className="h-4 w-4 mr-2" />
                Ανέβασμα Φωτογραφιών
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo) => (
                <Card 
                  key={photo.id} 
                  className="group overflow-hidden bg-white/80 backdrop-blur-sm border border-primary-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={photo.thumbnailUrl}
                      alt={photo.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    
                    {/* Action buttons overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(photo.url, '_blank')
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/admin/photos/${photo.id}/edit`)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-8 w-8 p-0 bg-white/90 hover:bg-red-50 backdrop-blur-sm text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            deletePhoto(photo.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Photo info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-semibold text-lg mb-1 truncate">{photo.title}</h3>
                        <p className="text-sm opacity-90">{photo.category.name}</p>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-75">
                          <span>{new Date(photo.createdAt).toLocaleDateString('el-GR')}</span>
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            photo.isActive
                              ? 'bg-green-500/80 text-white'
                              : 'bg-gray-500/80 text-white'
                          }`}>
                            {photo.isActive ? 'Ενεργή' : 'Ανενεργή'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate mb-1 group-hover:text-primary-700 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {photo.category.name}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{new Date(photo.createdAt).toLocaleDateString('el-GR')}</span>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        photo.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {photo.isActive ? 'Ενεργή' : 'Ανενεργή'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page <= 1}
                  className="border-primary-200 text-primary-700 hover:bg-primary-50"
                >
                  Προηγούμενη
                </Button>
                <span className="text-lg text-gray-600 px-4">
                  Σελίδα {pagination.page} από {pagination.pages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page >= pagination.pages}
                  className="border-primary-200 text-primary-700 hover:bg-primary-50"
                >
                  Επόμενη
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
