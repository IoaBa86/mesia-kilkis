// src/app/history/page.tsx - Server Component with metadata + Client Component for posts
import { Metadata } from 'next'
import { History } from "lucide-react"
import HistoricalPostsSection from '@/components/history/HistoricalPostsSection'
import PageHero from '@/components/site/PageHero'
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export const metadata: Metadata = {
  title: 'Ιστορία της Μεσιάς (Mesia) - Κιλκίς',
  description: 'Η ιστορία του χωριού Μεσιά (Mesia) Κιλκίς από την Τουρκοκρατία μέχρι σήμερα. Ιστορικά μνημεία, σημαντικές ημερομηνίες και η εξέλιξη της κοινότητας.',
  keywords: ['Μεσιά', 'Mesia', 'Κιλκίς', 'ιστορία', 'Μπαλμπά Κιόϊ', 'Τουρκοκρατία'],
  alternates: {
    canonical: '/history',
  },
  openGraph: {
    title: 'Ιστορία - Μεσιά Κιλκίς',
    description: 'Ανακαλύψτε την πλούσια ιστορία του χωριού Μεσιά Κιλκίς από την Τουρκοκρατία μέχρι σήμερα',
  },
}

// Server Component (no "use client")
export default function HistoryPage() {
  return (
    <div className="bg-mesia-cream">
      <main>
        <PageHero
          icon={History}
          eyebrow="Από το Μπαλμπά Κιόϊ ως τη Μεσιά"
          title="Ιστορία"
          description="Η ιστορία του χωριού από την Τουρκοκρατία ως σήμερα."
        />

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="max-w-3xl mx-auto text-center text-lg text-mesia-darkText/80 leading-relaxed mb-16">
              Η ιστορία της Μεσιάς καταγράφεται σταδιακά εδώ, άρθρο προς άρθρο —
              από επίσημα ΦΕΚ και ιστορικά μνημεία μέχρι αρχαιολογικά ευρήματα της περιοχής.
            </p>

            <ResponsiveAdSlot slotKey="history-ad-1" />

            <HistoricalPostsSection />
          </div>
        </section>
      </main>
    </div>
  )
}
