// src/app/legal/legal-notice/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Scale } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Νομικές Πληροφορίες - Μεσιά Κιλκίς',
  description: 'Νομικές πληροφορίες και στοιχεία της ιστοσελίδας Μεσιά Κιλκίς',
}

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Navigation */}
      <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-mesia-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Αρχική
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-mesia-wine" />
                <div>
                  <h1 className="text-2xl font-bold text-mesia-wine font-greek">Νομικές Πληροφορίες</h1>
                  <p className="text-sm text-mesia-lightText">Στοιχεία Ιστοσελίδας</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl rounded-2xl p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Στοιχεία Ιστοσελίδας</h2>
            <div className="bg-mesia-lightCream/50 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Υπεύθυνος Ιστοσελίδας</h3>
              <p><strong>Επωνυμία:</strong> Κοινότητα Μεσιάς Κιλκίς</p>
              <p><strong>Έδρα:</strong> Μεσιά, Κιλκίς 61100, Ελλάδα</p>
              <p><strong>ΑΦΜ:</strong> [ΑΦΜ ΚΟΙΝΟΤΗΤΑΣ]</p>
              <p><strong>Τηλέφωνο:</strong> +30 23XX XXXXXX</p>
              <p><strong>Email:</strong> info@mesiakilkis.gr</p>
              <p><strong>Website:</strong> www.mesiakilkis.gr</p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Σκοπός Ιστοσελίδας</h2>
            <p>Η ιστοσελίδα "Μεσιά Κιλκίς" έχει ως σκοπό:</p>
            <ul>
              <li>Την προβολή του χωριού Μεσιά Κιλκίς</li>
              <li>Την ενημέρωση των κατοίκων και επισκεπτών</li>
              <li>Τη διαφύλαξη της πολιτιστικής κληρονομιάς</li>
              <li>Την προώθηση του τοπικού τουρισμού</li>
              <li>Τη διευκόλυνση της επικοινωνίας με τις υπηρεσίες</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τεχνικές Πληροφορίες</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <p><strong>Hosting:</strong> [Πάροχος Hosting]</p>
              <p><strong>Domain:</strong> mesiakilkis.gr</p>
              <p><strong>Τεχνολογίες:</strong> Next.js, React, TypeScript</p>
              <p><strong>SSL:</strong> Ναι (HTTPS)</p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Πνευματικά Δικαιώματα</h2>
            <p>Όλο το περιεχόμενο της ιστοσελίδας (κείμενα, εικόνες, λογότυπα, σχεδιασμός) προστατεύεται από την ελληνική και διεθνή νομοθεσία περί πνευματικής ιδιοκτησίας.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Εφαρμοστέο Δίκαιο</h2>
            <p>Η ιστοσελίδα διέπεται από το ελληνικό δίκαιο και τις διατάξεις της Ευρωπαϊκής Ένωσης.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Επίλυση Διαφορών</h2>
            <p>Για οποιαδήποτε διαφορά αρμόδια είναι τα δικαστήρια της Θεσσαλονίκης.</p>

            <div className="mt-8 p-4 bg-mesia-wine/10 rounded-lg border border-mesia-wine/20">
              <p className="text-center"><strong>Τελευταία ενημέρωση:</strong> {new Date().toLocaleDateString('el-GR')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
