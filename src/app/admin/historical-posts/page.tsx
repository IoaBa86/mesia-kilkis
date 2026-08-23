// src/app/admin/historical-posts/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Plus, Edit, Trash2, Pin } from "lucide-react"

interface HistoricalPost {
  id: string
  title: string
  slug: string
  excerpt: string
  isPinned: boolean
  isActive: boolean
  createdAt: string
  creator: { name: string | null }
}

export default function HistoricalPostsAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<HistoricalPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/historical-posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      }
    } catch (error) {
      console.error('Error fetching historical posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleField = async (post: HistoricalPost, field: 'isPinned' | 'isActive') => {
    const updated = { ...post, [field]: !post[field] }
    setPosts(posts.map(p => p.id === post.id ? updated : p))
    try {
      const response = await fetch(`/api/admin/historical-posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: updated[field] }),
      })
      if (!response.ok) {
        setPosts(posts.map(p => p.id === post.id ? post : p))
      }
    } catch (error) {
      console.error('Error updating post:', error)
      setPosts(posts.map(p => p.id === post.id ? post : p))
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το ιστορικό άρθρο;')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/historical-posts/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id))
      } else {
        const error = await response.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Σφάλμα κατά τη διαγραφή')
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
              <h1 className="text-3xl font-bold text-gray-900">Ιστορικά Άρθρα</h1>
              <p className="text-gray-600">Διαχειριστείτε τα ιστορικά άρθρα της ιστοσελίδας</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={() => router.push("/admin")} variant="outline">
                Επιστροφή
              </Button>
              <Button onClick={() => router.push("/admin/historical-posts/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Νέο Άρθρο
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {posts.length === 0 ? (
          <Card className="text-center py-12">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-gray-900">Δεν υπάρχουν ιστορικά άρθρα</CardTitle>
              <CardDescription>
                Ξεκινήστε δημιουργώντας το πρώτο ιστορικό άρθρο
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => router.push("/admin/historical-posts/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Δημιουργία Άρθρου
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        post.isActive ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <BookOpen className={`h-6 w-6 ${post.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {post.title}
                          {post.isPinned && <Pin className="h-3.5 w-3.5 text-mesia-gold" />}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{post.creator?.name || '—'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/admin/historical-posts/${post.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePost(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Καρφιτσωμένο</span>
                      <Switch checked={post.isPinned} onCheckedChange={() => toggleField(post, 'isPinned')} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Ενεργό</span>
                      <Switch checked={post.isActive} onCheckedChange={() => toggleField(post, 'isActive')} />
                    </div>
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
