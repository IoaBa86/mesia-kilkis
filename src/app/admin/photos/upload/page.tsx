// src/app/admin/photos/upload/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Upload, ArrowLeft, X, Image as ImageIcon, FolderOpen } from "lucide-react"

interface Category {
  id: string
  name: string
  nameEn: string | null
}

export default function PhotoUploadPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState("")
  const [dragActive, setDragActive] = useState(false)

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
        setCategories(data.filter((cat: any) => cat.isActive))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    )
    setSelectedFiles(prev => [...prev, ...files])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        file => file.type.startsWith('image/')
      )
      setSelectedFiles(prev => [...prev, ...files])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!selectedCategory || selectedFiles.length === 0) {
      alert('Παρακαλώ επιλέξτε κατηγορία και φωτογραφίες')
      return
    }

    setUploading(true)
    setUploadProgress("Προετοιμασία μεταφόρτωσης...")

    try {
      const formData = new FormData()
      formData.append('categoryId', selectedCategory)
      
      selectedFiles.forEach(file => {
        formData.append('files', file)
      })

      setUploadProgress(`Μεταφόρτωση ${selectedFiles.length} φωτογραφιών...`)

      const response = await fetch('/api/photos/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setUploadProgress("Μεταφόρτωση ολοκληρώθηκε!")
        setTimeout(() => {
          router.push(`/admin/photos?category=${selectedCategory}`)
        }, 1500)
      } else {
        const error = await response.json()
        alert(`Σφάλμα: ${error.error}`)
        setUploadProgress("")
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Σφάλμα κατά τη μεταφόρτωση')
      setUploadProgress("")
    } finally {
      setUploading(false)
    }
  }

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Φόρτωση...</div>
  }

  if (status === "unauthenticated") {
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
                onClick={() => router.push("/admin/photos")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Μεταφόρτωση Φωτογραφιών</h1>
                <p className="text-gray-600">Ανεβάστε φωτογραφίες για τη γκαλερί του χωριού</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FolderOpen className="h-5 w-5 mr-2" />
                  Ρυθμίσεις
                </CardTitle>
                <CardDescription>
                  Επιλέξτε κατηγορία και φωτογραφίες
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Κατηγορία *</Label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Επιλέξτε κατηγορία</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Φωτογραφίες</Label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={uploading || !selectedCategory || selectedFiles.length === 0}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? "Μεταφόρτωση..." : `Ανέβασμα (${selectedFiles.length})`}
                </Button>

                {uploadProgress && (
                  <div className="text-sm text-blue-600 text-center">
                    {uploadProgress}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Drag & Drop Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Περιοχή Μεταφόρτωσης</CardTitle>
                <CardDescription>
                  Σύρετε και αφήστε φωτογραφίες εδώ ή κάντε κλικ για επιλογή
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input')?.click()}
                >
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Σύρετε φωτογραφίες εδώ
                      </p>
                      <p className="text-sm text-gray-500">
                        ή κάντε κλικ για επιλογή αρχείων
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      Υποστηρίζονται: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                </div>

                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Επιλεγμένες Φωτογραφίες ({selectedFiles.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
