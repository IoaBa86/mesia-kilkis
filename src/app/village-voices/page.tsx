// src/app/village-voices/page.tsx
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { MessageCircle, User } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'Φωνές του Χωριού - Μεσιά Κιλκίς',
  description: 'Ιστορίες κατοίκων, φωνές νέων και μαρτυρίες επισκεπτών της Μεσιάς Κιλκίς.',
  alternates: {
    canonical: '/village-voices',
  },
  openGraph: {
    title: 'Φωνές του Χωριού - Μεσιά Κιλκίς',
    description: 'Ιστορίες κατοίκων, φωνές νέων και μαρτυρίες επισκεπτών της Μεσιάς Κιλκίς.',
  },
}

export const revalidate = 300

const TYPE_LABELS: Record<string, string> = {
  RESIDENT_STORY: 'Ιστορία Κατοίκου',
  YOUTH_STORY: 'Φωνή Νέων',
  TESTIMONIAL: 'Μαρτυρία Επισκέπτη',
}

async function getVoices() {
  try {
    return await prisma.villageVoice.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
  } catch (error) {
    console.error('Error fetching village voices:', error)
    return []
  }
}

export default async function VillageVoicesPage() {
  const voices = await getVoices()

  return (
    <div className="bg-mesia-cream">
      <main>
        <PageHero
          icon={MessageCircle}
          eyebrow="Ιστορίες & Μαρτυρίες"
          title="Φωνές του Χωριού"
          description="Ιστορίες κατοίκων, φωνές νέων και μαρτυρίες επισκεπτών της Μεσιάς."
        />

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {voices.length === 0 ? (
              <div className="text-center py-16 border border-mesia-gold/25">
                <MessageCircle className="h-10 w-10 text-mesia-gold mx-auto mb-4" />
                <p className="text-mesia-lightText">Δεν υπάρχουν ακόμα ιστορίες. Σύντομα κοντά σας.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {voices.map((voice) => (
                  <article key={voice.id} className="border border-mesia-gold/25 bg-white overflow-hidden">
                    {voice.imageUrl && (
                      <div className="relative h-56">
                        <Image src={voice.imageUrl} alt={voice.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] border border-mesia-wine/25 text-mesia-wine px-2.5 py-1">
                          {TYPE_LABELS[voice.type] || voice.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-mesia-lightText font-mono">
                          <User className="h-3.5 w-3.5" />
                          {voice.authorName}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">{voice.title}</h2>
                      <div className="prose max-w-none text-mesia-darkText/90 prose-p:leading-relaxed prose-strong:text-mesia-wine">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{voice.content}</ReactMarkdown>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
