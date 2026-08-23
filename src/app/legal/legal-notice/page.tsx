// src/app/legal/legal-notice/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Scale } from 'lucide-react'

const LAST_UPDATED = '23 Αυγούστου 2026'

export const metadata: Metadata = {
  title: 'Νομικές Πληροφορίες - Μεσιά Κιλκίς',
  description: 'Νομικές πληροφορίες και στοιχεία της ιστοσελίδας Μεσιά Κιλκίς. Πνευματικά δικαιώματα, εφαρμοστέο δίκαιο και όροι χρήσης.',
  alternates: {
    canonical: '/legal/legal-notice',
  },
  openGraph: {
    title: 'Νομικές Πληροφορίες - Μεσιά Κιλκίς',
    description: 'Στοιχεία ιστοσελίδας, πνευματικά δικαιώματα και νομικό πλαίσιο',
    images: ['/og-image.jpg'],
  },
}

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-mesia-cream">
      <div className="bg-mesia-wine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-mesia-cream/70 hover:text-mesia-gold text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Αρχική
          </Link>
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-mesia-gold" />
            <h1 className="text-2xl md:text-3xl font-bold text-white font-greek">Νομικές Πληροφορίες</h1>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border border-mesia-gold/25 bg-white p-8 md:p-10">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Στοιχεία Ιστοσελίδας</h2>
            <div className="bg-mesia-lightCream/50 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Υπεύθυνος Ιστοσελίδας</h3>
              <p><strong>Email:</strong> info@mesia.gr</p>
              <p><strong>Website:</strong> www.mesia.gr</p>
              <p className="text-sm text-mesia-lightText mb-0">
                Η ιστοσελίδα λειτουργεί ανεξάρτητα από δημόσιους ή δημοτικούς φορείς (βλ. Δήλωση Αποποίησης
                Ευθύνης στο υποσέλιδο). Πλήρες όνομα/επωνυμία υπευθύνου προς συμπλήρωση πριν την πλήρη κυκλοφορία.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Σκοπός Ιστοσελίδας</h2>
            <p>Η ιστοσελίδα «Μεσιά Κιλκίς» έχει ως σκοπό:</p>
            <ul>
              <li>Την προβολή του χωριού Μεσιά Κιλκίς</li>
              <li>Την ενημέρωση κατοίκων και επισκεπτών για εκδηλώσεις και νέα</li>
              <li>Τη διαφύλαξη και ανάδειξη της τοπικής ιστορίας και πολιτιστικής κληρονομιάς</li>
              <li>Την προβολή φωτογραφικού υλικού του χωριού και της περιοχής</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τεχνικές Πληροφορίες</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <p><strong>Φιλοξενία (hosting):</strong> Vercel Inc.</p>
              <p><strong>Βάση δεδομένων:</strong> Neon (PostgreSQL), φιλοξενούμενη ξεχωριστά από τον πάροχο hosting</p>
              <p><strong>Domain:</strong> mesia.gr</p>
              <p><strong>Τεχνολογίες:</strong> Next.js, React, TypeScript, Prisma ORM</p>
              <p className="mb-0"><strong>Ασφάλεια σύνδεσης:</strong> Ναι (HTTPS/TLS)</p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Διαφημίσεις</h2>
            <p>Η ιστοσελίδα συμμετέχει στο πρόγραμμα Google AdSense για την εμφάνιση διαφημίσεων τρίτων. Δείτε την <Link href="/legal/cookie-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Cookies</Link> για λεπτομέρειες.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Πνευματικά Δικαιώματα</h2>
            <p>Το περιεχόμενο της ιστοσελίδας (κείμενα, φωτογραφίες, λογότυπο, σχεδιασμός) προστατεύεται από την ελληνική και διεθνή νομοθεσία περί πνευματικής ιδιοκτησίας. Δείτε τους <Link href="/legal/terms-of-service" className="text-mesia-wine hover:text-mesia-gold">Όρους Χρήσης</Link> για λεπτομέρειες.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Εφαρμοστέο Δίκαιο</h2>
            <p>Η ιστοσελίδα διέπεται από το ελληνικό δίκαιο και τις διατάξεις της Ευρωπαϊκής Ένωσης, συμπεριλαμβανομένου του Γενικού Κανονισμού Προστασίας Δεδομένων (GDPR).</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Επίλυση Διαφορών</h2>
            <p>Για οποιαδήποτε διαφορά προκύψει σε σχέση με την ιστοσελίδα, αρμόδια είναι τα δικαστήρια της Θεσσαλονίκης.</p>

            <div className="mt-8 p-4 bg-mesia-wine/10 rounded-lg border border-mesia-wine/20">
              <p className="text-center mb-0"><strong>Τελευταία ενημέρωση:</strong> {LAST_UPDATED}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
