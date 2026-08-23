// src/app/history/[slug]/page.tsx - Fixed for Next.js 15 with React.use()
'use client'

import { use, useState, useEffect } from 'react'
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
  const { slug } = use(params)

  const [post, setPost] = useState<HistoricalPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

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
  }, [slug])

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
      <div className="min-h-screen bg-mesia-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-mesia-gold border-t-mesia-wine"></div>
      </div>
    )
  }

  if (notFoundState || !post) {
    return (
      <div className="min-h-screen bg-mesia-cream flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-mesia-wine font-greek mb-4">Δεν βρέθηκε</h1>
          <p className="text-mesia-lightText mb-8">Το ιστορικό μνημείο που ψάχνετε δεν υπάρχει.</p>
          <Button asChild>
            <Link href="/history">Επιστροφή στην Ιστορία</Link>
          </Button>
        </div>
      </div>
    )
  }

  const images = Array.isArray(post.images) ? post.images : []

  return (
    <div className="bg-mesia-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/history" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Επιστροφή στην Ιστορία
          </Link>
        </Button>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <header className="border border-mesia-gold/25 bg-white overflow-hidden mb-8">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-mesia-wine text-white px-3 py-1.5 font-mono text-xs uppercase tracking-wide flex items-center gap-2">
                  <Images className="h-3.5 w-3.5" />
                  <span>{images.length} φωτογραφίες</span>
                </div>
              )}
            </div>
          )}

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-mesia-wine font-greek mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-mesia-lightText mb-6 pb-6 border-b border-mesia-gold/25 font-mono">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{post.creator.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString('el-GR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-mesia-wine hover:text-mesia-gold transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Κοινοποίηση
              </button>
            </div>

            <p className="text-lg text-mesia-darkText/90 leading-relaxed font-medium">
              {post.excerpt}
            </p>
          </div>
        </header>

        {images.length > 1 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-6">Φωτογραφίες</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden border border-mesia-gold/25">
                  <Image
                    src={image}
                    alt={`${post.title} - Φωτογραφία ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="border border-mesia-gold/25 bg-white p-8">
          <div
            className="prose prose-lg max-w-none text-mesia-darkText prose-headings:text-mesia-wine prose-headings:font-greek prose-p:leading-relaxed prose-strong:text-mesia-wine"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {new Date(post.updatedAt) > new Date(post.createdAt) && (
            <div className="mt-8 pt-6 border-t border-mesia-gold/25 text-sm font-mono text-mesia-lightText">
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
