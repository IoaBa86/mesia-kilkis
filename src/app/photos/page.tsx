// src/app/photos/page.tsx
import { Metadata } from 'next'
import Link from "next/link"
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Camera, 
  ArrowLeft, 
  Filter,
  Image as ImageIcon,
  Folder
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import PhotosClient from "@/components/PhotosClient"

export const metadata: Metadata = {
  title: 'Φωτογραφίες',
  description: 'Δείτε όλες τις φωτογραφίες του χωριού Μεσιά Κιλκίς. Αξιοθέατα, εκδηλώσεις, φυσικές ομορφιές και καθημερινή ζωή του χωριού μας.',
  openGraph: {
    title: 'Φωτογραφίες - Μεσιά Κιλκίς',
    description: 'Φωτογραφίες από το παραδοσιακό χωριό Μεσιά Κιλκίς της Κεντρικής Μακεδονίας',
    images: ['/og-image.jpg'],
  },
}

interface PhotosPageProps {
  searchParams: Promise<{ 
    category?: string
  }>
}

export default async function PhotosPage({ searchParams }: PhotosPageProps) {
  const params = await searchParams
  const categoryId = params.category

  // Build where clause for filtering
  const where: any = {
    isActive: true
  }

  if (categoryId && categoryId !== 'all') {
    where.categoryId = categoryId
  }

  // Fetch photos from database
  const photos = await prisma.photo.findMany({
    where,
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      },
      uploadedBy: {
        select: { name: true }
      }
    },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  })

  // Get all active categories for filter
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: { photos: true }
      }
    },
    orderBy: { order: 'asc' }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">


      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="mb-6">
              <Camera className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-float" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
              Φωτογραφίες
            </h2>
            <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
              Δείτε τις ομορφιές του παραδοσιακού μας χωριού μέσα από τον φακό
            </p>
            <div className="flex items-center justify-center space-x-4 text-mesia-cream">
              <span className="flex items-center">
                <Folder className="h-5 w-5 mr-2" />
                {categories.length} κατηγορίες
              </span>
              <span className="text-mesia-gold">•</span>
              <span className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                {photos.length} φωτογραφίες
              </span>
            </div>
          </div>
        </section>

         {/* ⭐ Ad */}
        <ResponsiveAdSlot id="photos-ad-1" />


        {/* Photos Client Component with Filtering */}
        <PhotosClient 
          initialPhotos={photos} 
          categories={categories}
          initialCategory={categoryId}
        />
      </main>

    </div>
  )
}
