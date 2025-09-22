// src/app/photos/page.tsx
import { Metadata } from 'next'
import Link from "next/link"
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ShareButton from '@/components/ShareButton'
import { 
  Camera, 
  ArrowLeft, 
  Filter,
  Image as ImageIcon,
  Folder,
  Share2
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import PhotosClient from "@/components/PhotosClient"
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Φωτογραφίες',
  description: 'Περιηγηθείτε στις φωτογραφίες από το χωριό Μεσιά Κιλκίς. Δείτε εικόνες από εκδηλώσεις, παραδοσιακές γιορτές και την καθημερινή ζωή του χωριού.',
  keywords: ['φωτογραφίες', 'Μεσιά Κιλκίς', 'εκδηλώσεις', 'παραδοσιακές γιορτές', 'χωριό', 'Μακεδονία', 'γκαλερί'],
  
  // Enhanced Open Graph - 🚀 FIXED: Use www version
  openGraph: {
    title: 'Φωτογραφίες - Μεσιά Κιλκίς',
    description: 'Ανακαλύψτε το παραδοσιακό χωριό Μεσιά Κιλκίς μέσα από τις φωτογραφίες μας. Εκδηλώσεις, παραδόσεις και καθημερινή ζωή.',
    url: 'https://www.mesia.gr/photos', // ✅ Changed to www
    siteName: 'Μεσιά Κιλκίς',
    images: [
      {
        url: 'https://www.mesia.gr/images/photos-og.jpg', // ✅ Changed to www
        width: 1200,
        height: 630,
        alt: 'Συλλογή φωτογραφιών από το χωριό Μεσιά Κιλκίς',
      }
    ],
    type: 'website',
    locale: 'el_GR',
  },
  
  // Twitter Card - 🚀 FIXED: Use www version
  twitter: {
    card: 'summary_large_image',
    title: 'Φωτογραφίες - Μεσιά Κιλκίς',
    description: 'Περιηγηθείτε στη φωτογραφική συλλογή του παραδοσιακού χωριού Μεσιά Κιλκίς',
    images: ['https://www.mesia.gr/images/photos-twitter.jpg'], // ✅ Changed to www
  },
  
  // 🚀 FIXED: Canonical URL points to www (or use relative)
  alternates: {
    canonical: '/photos', // ✅ Use relative - will use metadataBase (www.mesia.gr)
  },
  
  // Additional SEO
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

interface PhotosPageProps {
  searchParams: Promise<{ 
    category?: string
    page?: string
  }>
}

export default async function PhotosPage({ searchParams }: PhotosPageProps) {
  const params = await searchParams
  const categoryId = params.category
  const currentPage = parseInt(params.page || '1')
  const photosPerPage = 24 // Pagination support

  // Build where clause for filtering
  const where: any = {
    isActive: true
  }

  if (categoryId && categoryId !== 'all') {
    where.categoryId = categoryId
  }

  try {
    // Fetch photos with pagination
    const [photos, totalPhotos] = await Promise.all([
      prisma.photo.findMany({
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
        ],
        skip: (currentPage - 1) * photosPerPage,
        take: photosPerPage,
      }),
      prisma.photo.count({ where })
    ])

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

    // 🚀 FIXED: Prepare structured data with www URLs
    const breadcrumbData = {
      items: [
        { name: 'Αρχική', url: 'https://www.mesia.gr' }, // ✅ Changed to www
        { name: 'Φωτογραφίες', url: 'https://www.mesia.gr/photos' } // ✅ Changed to www
      ]
    }

    const galleryData = {
      name: categoryId && categoryId !== 'all' 
        ? `Φωτογραφίες - ${categories.find(c => c.id === categoryId)?.name || 'Κατηγορία'}`
        : 'Φωτογραφίες Μεσιάς Κιλκίς',
      description: categoryId && categoryId !== 'all'
        ? `Φωτογραφίες από την κατηγορία ${categories.find(c => c.id === categoryId)?.name} του χωριού Μεσιά Κιλκίς`
        : 'Συλλογή φωτογραφιών από εκδηλώσεις, παραδόσεις και καθημερινή ζωή του χωριού Μεσιά Κιλκίς',
      images: photos.map(photo => photo.url).slice(0, 10), // First 10 images for schema
      media: photos.map(photo => ({
        '@type': 'ImageObject',
        url: photo.url,
        caption: photo.title || photo.description || 'Φωτογραφία από Μεσιά Κιλκίς',
        contentUrl: photo.url,
        thumbnailUrl: photo.thumbnailUrl || photo.url
      }))
    }

    const totalPages = Math.ceil(totalPhotos / photosPerPage)

    return (
      <>
        {/* Structured Data for SEO */}
        <StructuredData type="breadcrumb" data={breadcrumbData} />
        <StructuredData type="imageGallery" data={galleryData} />
        
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
                <header className="mb-6">
                  <Camera className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-float" />
                </header>
                <h1 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
                  Φωτογραφίες
                </h1>
                <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
                  Δείτε τις ομορφιές του παραδοσιακού μας χωριού μέσα από τον φακό
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-center space-x-4 text-mesia-cream mb-6">
                  <span className="flex items-center">
                    <Folder className="h-5 w-5 mr-2" />
                    {categories.length} κατηγορίες
                  </span>
                  <span className="text-mesia-gold">•</span>
                  <span className="flex items-center">
                    <ImageIcon className="h-5 w-5 mr-2" />
                    {totalPhotos} φωτογραφίες
                  </span>
                  {totalPages > 1 && (
                    <>
                      <span className="text-mesia-gold">•</span>
                      <span>Σελίδα {currentPage} από {totalPages}</span>
                    </>
                  )}
                </div>

                {/* Social Sharing */}
                <div className="flex justify-center space-x-4">
                  <ShareButton
                    title="Φωτογραφίες - Μεσιά Κιλκίς"
                    text="Δείτε φωτογραφίες από το παραδοσιακό χωριό Μεσιά Κιλκίς"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  />
                </div>
              </div>
            </section>

            {/* Ad */}
            <ResponsiveAdSlot id="photos-ad-1" />

            {/* Photos Client Component with Enhanced Props */}
            <PhotosClient 
              initialPhotos={photos} 
              categories={categories}
              initialCategory={categoryId}
              pagination={{
                currentPage,
                totalPages,
                totalPhotos,
                photosPerPage
              }}
            />

            {/* Additional SEO Content */}
            <section className="py-16 bg-white/50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <article className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-mesia-wine mb-6 font-greek">
                    Φωτογραφική Συλλογή Μεσιάς Κιλκίς
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Η φωτογραφική συλλογή μας καταγράφει τη ζωή, τις παραδόσεις και τις εκδηλώσεις 
                    του παραδοσιακού χωριού Μεσιά Κιλκίς. Μέσα από αυτές τις εικόνες μπορείτε να 
                    γνωρίσετε την πλούσια πολιτιστική κληρονομιά και την καθημερινή ζωή των κατοίκων.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Κάθε φωτογραφία αποτελεί μια μοναδική στιγμή που απαθανατίζει την ομορφιά 
                    του τοπίου, τις παραδοσιακές γιορτές και τη ζεστασιά της κοινότητάς μας.
                  </p>
                </article>
              </div>
            </section>
          </main>
        </div>
      </>
    )

  } catch (error) {
    console.error('Error loading photos page:', error)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <main>
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Camera className="h-24 w-24 text-red-300 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-red-600 mb-4">
                Σφάλμα φόρτωσης φωτογραφιών
              </h1>
              <p className="text-gray-600 mb-8">
                Παρουσιάστηκε πρόβλημα κατά τη φόρτωση των φωτογραφιών. Παρακαλούμε δοκιμάστε ξανά.
              </p>
              <Button asChild>
                <Link href="/">
                  Επιστροφή στην Αρχική
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    )
  }
}
