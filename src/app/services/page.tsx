// src/app/services/page.tsx
import { Metadata } from 'next'
import { Building, Shield } from 'lucide-react'
import PageHero from '@/components/site/PageHero'
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export const metadata: Metadata = {
  title: 'Αριθμοί Έκτακτης Ανάγκης',
  description: 'Οι πανελλαδικοί αριθμοί έκτακτης ανάγκης (100, 199, 166, 112) που ισχύουν και για την περιοχή της Μεσιάς Κιλκίς.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Αριθμοί Έκτακτης Ανάγκης - Μεσιά Κιλκίς',
    description: 'Οι πανελλαδικοί αριθμοί έκτακτης ανάγκης που ισχύουν και για την περιοχή της Μεσιάς Κιλκίς.',
  },
}

const emergencyNumbers = [
  { number: '100', label: 'Αστυνομία' },
  { number: '199', label: 'Πυροσβεστική' },
  { number: '166', label: 'Ιατρική Βοήθεια (ΕΚΑΒ)' },
  { number: '112', label: 'Ευρωπαϊκός Αριθμός Έκτακτης Ανάγκης' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-mesia-cream">
      <main>
        <PageHero
          icon={Building}
          eyebrow="Χρήσιμες Πληροφορίες"
          title="Αριθμοί Έκτακτης Ανάγκης"
          description="Οι πανελλαδικοί αριθμοί που ισχύουν και για τη Μεσιά."
        />

        <section className="py-24 bg-mesia-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-2 border-red-700/30 bg-red-50 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-red-800 font-greek text-center mb-8 flex items-center justify-center">
                <Shield className="h-7 w-7 mr-3" aria-hidden="true" />
                Σε περίπτωση έκτακτης ανάγκης
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {emergencyNumbers.map(({ number, label }) => (
                  <li key={number}>
                    <a href={`tel:${number}`} className="block text-3xl font-bold font-mono text-red-800 mb-1">
                      {number}
                    </a>
                    <div className="text-sm text-red-800/80">{label}</div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-sm text-mesia-lightText leading-relaxed text-center">
              Η ιστοσελίδα είναι ανεξάρτητη και δεν αποτελεί επίσημη υπηρεσία της Κοινότητας ή του Δήμου.
              Για διοικητικά θέματα απευθυνθείτε στις αρμόδιες υπηρεσίες του Δήμου Παιονίας.
            </p>
          </div>
        </section>

        <ResponsiveAdSlot slotKey="services-ad-1" />
      </main>
    </div>
  )
}
