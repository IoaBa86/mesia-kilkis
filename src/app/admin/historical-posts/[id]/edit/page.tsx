// src/app/admin/historical-posts/[id]/edit/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import MarkdownEditor from "@/components/admin/MarkdownEditor"

export default function EditHistoricalPostPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    images: [] as string[],
    isPinned: false,
    isActive: true,
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    fetch(`/api/admin/historical-posts/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.post) {
          setFormData({
            title: data.post.title,
            slug: data.post.slug,
            excerpt: data.post.excerpt,
            content: data.post.content,
            images: Array.isArray(data.post.images) ? data.post.images : [],
            isPinned: data.post.isPinned,
            isActive: data.post.isActive,
          })
        } else {
          setError('Το άρθρο δεν βρέθηκε')
        }
      })
      .catch(() => setError('Σφάλμα κατά τη φόρτωση'))
      .finally(() => setFetching(false))
  }, [id])

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl.trim()] }))
      setImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      alert("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/historical-posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/historical-posts')
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Σφάλμα κατά την ενημέρωση του άρθρου')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      setError('Σφάλμα κατά την ενημέρωση του άρθρου')
    } finally {
      setLoading(false)
    }
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
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/admin/historical-posts")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Επεξεργασία Άρθρου</h1>
                <p className="text-gray-600 text-sm">{formData.title}</p>
              </div>
            </div>
            <Button type="submit" form="post-form" disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Αποθήκευση...' : 'Αποθήκευση'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-mesia-wine font-greek">Βασικές Πληροφορίες</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">Τίτλος *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">URL Slug *</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
                <p className="text-xs text-mesia-lightText mt-1">URL: /history/{formData.slug}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">Περίληψη *</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isPinned}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPinned: checked }))}
                  />
                  <label className="text-sm font-medium text-mesia-darkText">
                    Καρφιτσωμένο άρθρο (εμφανίζεται πρώτο)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <label className="text-sm font-medium text-mesia-darkText">Ενεργό</label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-mesia-wine font-greek">Φωτογραφίες</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL εικόνας..."
                  className="flex-1 border-mesia-gold/30 focus:border-mesia-wine"
                />
                <Button type="button" onClick={addImage} variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Προσθήκη
                </Button>
              </div>

              {formData.images.length > 0 && (
                <div className="space-y-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-mesia-lightCream/30 rounded border">
                      <span className="text-sm text-mesia-darkText truncate flex-1 mr-2">{img}</span>
                      <Button type="button" onClick={() => removeImage(index)} variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-mesia-wine font-greek">Περιεχόμενο *</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              />
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
