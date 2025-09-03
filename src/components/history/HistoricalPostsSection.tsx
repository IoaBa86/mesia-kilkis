// src/components/history/HistoricalPostsSection.tsx - Client Component for posts
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, Eye } from 'lucide-react'

interface HistoricalPost {
  id: string
  title: string
  slug: string
  excerpt: string
  images: string[]
  createdAt: string
  creator: {
    name: string
  }
}

export default function HistoricalPostsSection() {
  const [posts, setPosts] = useState<HistoricalPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchHistoricalPosts() {
      try {
        const response = await fetch('/api/historical-posts')
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

    fetchHistoricalPosts()
  }, [])

  return (
    <div className="border-t border-mesia-gold/30 pt-16">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-4">
          📚 Περισσότερα Ιστορικά Άρθρα
        </h3>
        <p className="text-mesia-lightText">
          Εξερευνήστε τα ιστορικά μνημεία και την κληρονομιά μας σε λεπτομέρεια
        </p>
      </div>

      {/* Posts Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mesia-wine mx-auto mb-4"></div>
          <p className="text-mesia-lightText">Φόρτωση άρθρων...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📖</div>
          <h4 className="text-xl font-semibold text-mesia-wine mb-2">
            Σύντομα περισσότερα άρθρα
          </h4>
          <p className="text-mesia-lightText">
            Εργαζόμαστε για να παρουσιάσουμε λεπτομερή άρθρα για κάθε ιστορικό μνημείο.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/history/${post.slug}`}>
              <article className="bg-mesia-lightCream/30 border border-mesia-gold/30 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
                {/* Post Image */}
                {Array.isArray(post.images) && post.images.length > 0 && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Image count badge */}
                    {post.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-mesia-wine/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                        +{post.images.length}
                      </div>
                    )}
                  </div>
                )}

                {/* Post Content */}
                <div className="p-4">
                  <h4 className="font-bold text-mesia-wine font-greek mb-2 group-hover:text-mesia-gold transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  
                  <p className="text-sm text-mesia-darkText leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta information */}
                  <div className="flex items-center justify-between text-xs text-mesia-lightText">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.creator.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.createdAt).toLocaleDateString('el-GR')}</span>
                    </div>
                  </div>

                  {/* Read more indicator */}
                  <div className="mt-3 flex items-center text-mesia-wine text-xs font-medium group-hover:text-mesia-gold transition-colors">
                    <span>Διαβάστε περισσότερα</span>
                    <Eye className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Show total count */}
      {posts.length > 0 && (
        <div className="text-center mt-8 text-sm text-mesia-lightText">
          📖 {posts.length} λεπτομερή άρθρα διαθέσιμα
        </div>
      )}
    </div>
  )
}
