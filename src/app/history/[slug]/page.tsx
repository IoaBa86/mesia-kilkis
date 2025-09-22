// src/app/history/[slug]/page.tsx - Fixed for Next.js 15 with React.use()
'use client'

import { use, useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, Share2, Images } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HistoricalPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  images: string[]
  createdAt: string
  updatedAt: string
  creator: {
    name: string
  }
}

export default function HistoricalPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ✅ Use React.use() to unwrap the params Promise
  const { slug } = use(params)
  
  const [post, setPost] = useState<HistoricalPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  // ✅ Now use the unwrapped slug directly
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/historical-posts/${slug}`)
        
        if (!res.ok) {
          setNotFoundState(true)
          return
        }
        
        const data = await res.json()
        setPost(data.post)
      } catch (error) {
        console.error('Error fetching historical post:', error)
        setNotFoundState(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug]) // ✅ Use unwrapped slug in dependency array

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'Ιστορικό Μνημείο',
        text: post?.excerpt || '',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Ο σύνδεσμος αντιγράφηκε στο πρόχειρο!'))
        .catch(() => console.error('Failed to copy link'))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mesia-wine"></div>
      </div>
    )
  }

  if (notFoundState || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mesia-wine mb-4">Δεν βρέθηκε</h1>
          <p className="text-mesia-lightText mb-6">Το ιστορικό μνημείο που ψάχνετε δεν υπάρχει.</p>
          <Link href="/history">
            <Button className="bg-mesia-wine hover:bg-mesia-wine/90 text-white">
              Επιστροφή στην Ιστορία
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const images = Array.isArray(post.images) ? post.images : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/history">
          <Button variant="outline" className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Επιστροφή στην Ιστορία
          </Button>
        </Link>
      </div>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Article Header */}
        <header className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl rounded-2xl overflow-hidden mb-8">
          {/* Hero Image */}
          {images.length > 0 && (
            <div className="relative h-64 md:h-80 lg:h-96">
              <Image
                src={images[0]}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Image count badge */}
              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-mesia-wine/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Images className="h-4 w-4" />
                  <span>{images.length} φωτογραφίες</span>
                </div>
              )}
            </div>
          )}

          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-mesia-wine font-greek mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between text-sm text-mesia-lightText mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Δημοσιεύτηκε από {post.creator.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString('el-GR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Κοινοποίηση
              </Button>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-mesia-darkText leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Image Gallery */}
        {images.length > 1 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-6">Φωτογραφίες</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={image}
                    alt={`${post.title} - Φωτογραφία ${index + 2}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Article Content */}
        <div className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl rounded-2xl p-8">
          <div 
            className="prose prose-lg max-w-none text-mesia-darkText prose-headings:text-mesia-wine prose-headings:font-greek prose-p:leading-relaxed prose-strong:text-mesia-wine"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Last Updated */}
          {new Date(post.updatedAt) > new Date(post.createdAt) && (
            <div className="mt-8 pt-6 border-t border-mesia-gold/20 text-sm text-mesia-lightText">
              Τελευταία ενημέρωση: {new Date(post.updatedAt).toLocaleDateString('el-GR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
