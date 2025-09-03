// src/app/admin/historical-posts/new/page.tsx - Create new historical post
"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Eye, Upload, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function NewHistoricalPostPage() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    images: [] as string[],
    isPinned: false
  })
  
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[άαάά]/g, 'a')
      .replace(/[έεέέ]/g, 'e')
      .replace(/[ήηήή]/g, 'i')
      .replace(/[ίιίί]/g, 'i')
      .replace(/[όοόό]/g, 'o')
      .replace(/[ύυύύ]/g, 'u')
      .replace(/[ώωώώ]/g, 'o')
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const addImage = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }))
      setImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      alert("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία")
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/admin/historical-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const { post } = await response.json()
        alert("Το ιστορικό άρθρο δημιουργήθηκε επιτυχώς!")
        router.push('/admin/historical-posts')
      } else {
        const error = await response.json()
        alert(`Σφάλμα: ${error.error}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert("Σφάλμα κατά τη δημιουργία του άρθρου")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/historical-posts")}
                className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Επιστροφή
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-mesia-wine font-greek">
                  Νέο Ιστορικό Άρθρο
                </h1>
                <p className="text-mesia-lightText text-sm">
                  Δημιουργήστε ένα νέο άρθρο για τα ιστορικά μνημεία
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="submit"
                form="post-form"
                disabled={loading}
                className="bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Αποθήκευση...' : 'Δημοσίευση'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-mesia-wine font-greek">Βασικές Πληροφορίες</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">
                  Τίτλος *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="π.χ. Εκκλησία Αγίου Κωνσταντίνου και Ελένης"
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">
                  URL Slug *
                </label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="ekklisia-agiou-konstantinou"
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
                <p className="text-xs text-mesia-lightText mt-1">
                  URL: /history/{formData.slug}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-mesia-darkText mb-2">
                  Περίληψη *
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Σύντομη περιγραφή του μνημείου..."
                  rows={3}
                  className="border-mesia-gold/30 focus:border-mesia-wine"
                />
              </div>

              {/* Pinned */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.isPinned}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPinned: checked }))}
                />
                <label className="text-sm font-medium text-mesia-darkText">
                  Καρφιτσωμένο άρθρο (εμφανίζεται πρώτο)
                </label>
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
                <Button
                  type="button"
                  onClick={addImage}
                  variant="outline"
                  className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Προσθήκη
                </Button>
              </div>

              {/* Image List */}
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-mesia-darkText">Φωτογραφίες ({formData.images.length})</h4>
                  <div className="space-y-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-mesia-lightCream/30 rounded border">
                        <span className="text-sm text-mesia-darkText truncate flex-1 mr-2">{img}</span>
                        <Button
                          type="button"
                          onClick={() => removeImage(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
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
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Αναλυτική περιγραφή του ιστορικού μνημείου..."
                rows={15}
                className="border-mesia-gold/30 focus:border-mesia-wine"
              />
              <p className="text-xs text-mesia-lightText mt-2">
                Υποστηρίζεται HTML για μορφοποίηση κειμένου
              </p>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}
