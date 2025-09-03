// src/components/PhotosClient.tsx
"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List } from "lucide-react"
import Image from "next/image"

interface Photo {
  id: string
  title: string
  alt: string
  url: string
  thumbnailUrl: string
  category: {
    id: string
    name: string
    slug: string
  }
  uploadedBy: {
    name: string
  }
  createdAt: string
}

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    photos: number
  }
}

interface PhotosClientProps {
  initialPhotos: Photo[]
  categories: Category[]
  initialCategory?: string
}

export default function PhotosClient({ 
  initialPhotos, 
  categories, 
  initialCategory 
}: PhotosClientProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')

  // Filter photos based on selected category
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') {
      return initialPhotos
    }
    return initialPhotos.filter(photo => photo.category.id === selectedCategory)
  }, [initialPhotos, selectedCategory])

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const newURL = categoryId === 'all' ? '/photos' : `/photos?category=${categoryId}`
    router.push(newURL, { scroll: false })
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="mb-12">
          <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Filter className="h-5 w-5 text-mesia-wine" />
                  <h3 className="text-xl font-bold text-mesia-wine font-greek">Κατηγορίες</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' 
                      ? 'bg-mesia-wine text-white' 
                      : 'border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white'
                    }
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'masonry' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('masonry')}
                    className={viewMode === 'masonry' 
                      ? 'bg-mesia-wine text-white' 
                      : 'border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white'
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => handleCategoryChange('all')}
                  className={selectedCategory === 'all' 
                    ? 'bg-mesia-wine text-white' 
                    : 'border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white'
                  }
                >
                  Όλες ({initialPhotos.length})
                </Button>
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => handleCategoryChange(category.id)}
                    className={selectedCategory === category.id 
                      ? 'bg-mesia-wine text-white' 
                      : 'border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white'
                    }
                  >
                    {category.name} ({category._count.photos})
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <p className="text-mesia-lightText text-lg">
            {filteredPhotos.length === 0 
              ? 'Δεν βρέθηκαν φωτογραφίες'
              : `Προβολή ${filteredPhotos.length} φωτογραφιών`
            }
            {selectedCategory !== 'all' && (
              <span className="text-mesia-wine font-medium">
                {` στην κατηγορία "${categories.find(c => c.id === selectedCategory)?.name}"`}
              </span>
            )}
          </p>
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <Card className="text-center py-16 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
            <CardContent>
              <div className="h-16 w-16 text-mesia-lightText mx-auto mb-4 text-6xl">📷</div>
              <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-4">
                Δεν υπάρχουν φωτογραφίες
              </h3>
              <p className="text-mesia-lightText mb-6">
                {selectedCategory !== 'all' 
                  ? 'Δεν υπάρχουν φωτογραφίες σε αυτή την κατηγορία.'
                  : 'Δεν έχουν ανέβει φωτογραφίες ακόμα.'
                }
              </p>
              {selectedCategory !== 'all' && (
                <Button onClick={() => handleCategoryChange('all')} className="bg-mesia-wine text-white">
                  Προβολή όλων των φωτογραφιών
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
            : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
          }>
            {filteredPhotos.map((photo) => (
              <Card 
                key={photo.id} 
                className="group overflow-hidden bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-[1.02]"
                onClick={() => window.open(photo.url, '_blank')}
              >
                <div className={viewMode === 'grid' ? "aspect-square relative" : "relative"}>
                  <Image
                    src={photo.thumbnailUrl}
                    alt={photo.alt}
                    fill={viewMode === 'grid'}
                    width={viewMode === 'masonry' ? 400 : undefined}
                    height={viewMode === 'masonry' ? 300 : undefined}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Overlay with photo info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mesia-wine/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{photo.title}</h3>
                      <p className="text-sm opacity-90">{photo.category.name}</p>
                      <p className="text-xs opacity-75 mt-2">
                        Φωτογράφος: {photo.uploadedBy.name} • {new Date(photo.createdAt).toLocaleDateString('el-GR')}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
