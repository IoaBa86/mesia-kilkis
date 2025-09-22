// src/components/PhotoGallery.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

interface Category {
  id: string
  name: string
  nameEn: string | null
  _count: { photos: number }
}

interface Photo {
  id: string
  title: string
  url: string
  thumbnailUrl: string
  alt: string
  category: {
    name: string
    slug: string
  }
}

interface PhotoGalleryProps {
  categories: Category[]
  photos: Photo[]
  selectedCategoryId?: string
}

export function PhotoGallery({ categories, photos, selectedCategoryId }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-mesia-primary mr-2" />
          <h3 className="text-lg font-semibold text-mesia-navy">Κατηγορίες</h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            variant={!selectedCategoryId ? "default" : "outline"}
            className={!selectedCategoryId 
              ? "bg-mesia-primary hover:bg-mesia-primary/90" 
              : "border-mesia-primary/30 text-mesia-primary hover:bg-mesia-primary/10"
            }
            asChild
          >
            <Link href="/photos">
              Όλες ({photos.length})
            </Link>
          </Button>
          
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategoryId === category.id ? "default" : "outline"}
              className={selectedCategoryId === category.id
                ? "bg-mesia-primary hover:bg-mesia-primary/90"
                : "border-mesia-primary/30 text-mesia-primary hover:bg-mesia-primary/10"
              }
              asChild
            >
              <Link href={`/photos?category=${category.id}`}>
                {category.name} ({category._count.photos})
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-2xl font-bold text-mesia-navy mb-2">
            Δεν υπάρχουν φωτογραφίες
          </h3>
          <p className="text-mesia-slate">
            {selectedCategoryId 
              ? "Δεν υπάρχουν φωτογραφίες σε αυτή την κατηγορία."
              : "Δεν έχουν προστεθεί φωτογραφίες ακόμη."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <Card 
              key={photo.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-mesia-primary/20"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square relative">
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mesia-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold truncate">{photo.title}</h3>
                  <p className="text-sm opacity-90">{photo.category.name}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-mesia-secondary transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-xl font-bold mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-mesia-secondary">
                  {selectedPhoto.category.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
