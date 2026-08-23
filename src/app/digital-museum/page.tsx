// src/app/digital-museum/page.tsx
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { Landmark, Headphones, Box, Gem } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Ψηφιακό Μουσείο Μεσιάς (Mesia) - Κιλκίς',
  description: 'Εικονικά εκθέματα, ηχητικοί οδηγοί, περιηγήσεις και αντικείμενα από την ιστορία της Μεσιάς (Mesia) Κιλκίς.',
  keywords: ['Μεσιά', 'Mesia', 'Κιλκίς', 'ψηφιακό μουσείο', 'εκθέματα'],
  alternates: {
    canonical: '/digital-museum',
  },
  openGraph: {
    title: 'Ψηφιακό Μουσείο - Μεσιά Κιλκίς',
    description: 'Εικονικά εκθέματα, ηχητικοί οδηγοί, περιηγήσεις και αντικείμενα από την ιστορία της Μεσιάς Κιλκίς.',
  },
}

export const revalidate = 300

const TYPE_LABELS: Record<string, string> = {
  EXHIBIT: 'Έκθεμα',
  AUDIO_GUIDE: 'Ηχητικός Οδηγός',
  VIRTUAL_TOUR: 'Εικονική Περιήγηση',
  ARTIFACT: 'Αντικείμενο',
}

const TYPE_ICONS: Record<string, typeof Landmark> = {
  EXHIBIT: Landmark,
  AUDIO_GUIDE: Headphones,
  VIRTUAL_TOUR: Box,
  ARTIFACT: Gem,
}

async function getExhibits() {
  try {
    return await prisma.museumExhibit.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
  } catch (error) {
    console.error('Error fetching museum exhibits:', error)
    return []
  }
}

export default async function DigitalMuseumPage() {
  const exhibits = await getExhibits()

  return (
    <div className="bg-mesia-cream">
      <main>
        <PageHero
          icon={Landmark}
          eyebrow="Πολιτιστική Κληρονομιά"
          title="Ψηφιακό Μουσείο"
          description="Εικονικά εκθέματα, ηχητικοί οδηγοί, περιηγήσεις και αντικείμενα από την ιστορία μας."
        />

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {exhibits.length === 0 ? (
              <div className="text-center py-16 border border-mesia-gold/25">
                <Landmark className="h-10 w-10 text-mesia-gold mx-auto mb-4" />
                <p className="text-mesia-lightText">Το ψηφιακό μουσείο εμπλουτίζεται σύντομα.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {exhibits.map((exhibit) => {
                  const Icon = TYPE_ICONS[exhibit.type] || Landmark
                  return (
                    <article key={exhibit.id} className="border border-mesia-gold/25 bg-white overflow-hidden">
                      {exhibit.imageUrl && (
                        <div className="relative h-56">
                          <Image src={exhibit.imageUrl} alt={exhibit.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <Icon className="h-4 w-4 text-mesia-gold" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mesia-wine/60">
                            {TYPE_LABELS[exhibit.type] || exhibit.type}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">{exhibit.title}</h2>
                        <div className="prose max-w-none text-mesia-darkText/90 prose-p:leading-relaxed prose-strong:text-mesia-wine mb-5">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{exhibit.description}</ReactMarkdown>
                        </div>

                        {exhibit.mediaUrl && exhibit.type === 'AUDIO_GUIDE' && (
                          <audio controls className="w-full" src={exhibit.mediaUrl}>
                            Ο φυλλομετρητής σας δεν υποστηρίζει αναπαραγωγή ήχου.
                          </audio>
                        )}

                        {exhibit.mediaUrl && exhibit.type === 'VIRTUAL_TOUR' && (
                          <div className="relative w-full aspect-video border border-mesia-gold/25">
                            <iframe
                              src={exhibit.mediaUrl}
                              className="absolute inset-0 w-full h-full"
                              loading="lazy"
                              sandbox="allow-scripts allow-same-origin allow-popups"
                              allowFullScreen
                              title={exhibit.title}
                            />
                          </div>
                        )}

                        {exhibit.mediaUrl && (exhibit.type === 'EXHIBIT' || exhibit.type === 'ARTIFACT') && (
                          <a
                            href={exhibit.mediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-mesia-wine hover:text-mesia-gold transition-colors"
                          >
                            Περισσότερα υλικό →
                          </a>
                        )}
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
