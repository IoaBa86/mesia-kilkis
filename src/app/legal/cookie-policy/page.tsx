// src/app/legal/cookie-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cookie } from 'lucide-react'
import CookieSettingsLink from '@/components/CookieSettingsLink'

const LAST_UPDATED = '20 Σεπτεμβρίου 2026'

export const metadata: Metadata = {
  title: 'Πολιτική Cookies - Μεσιά Κιλκίς',
  description: 'Πληροφορίες για τη χρήση cookies στην ιστοσελίδα Μεσιά Κιλκίς. Τύποι cookies, διαχείριση και προσωπικά δεδομένα.',
  alternates: {
    canonical: '/legal/cookie-policy',
  },
  openGraph: {
    title: 'Πολιτική Cookies - Μεσιά Κιλκίς',
    description: 'Αναλυτικές πληροφορίες για τη χρήση cookies στην ιστοσελίδα Μεσιά Κιλκίς',
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-mesia-cream">
      <div className="bg-mesia-wine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-mesia-cream/70 hover:text-mesia-gold text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Αρχική
          </Link>
          <div className="flex items-center gap-3">
            <Cookie className="h-6 w-6 text-mesia-gold" />
            <h1 className="text-2xl md:text-3xl font-bold text-white font-greek">Πολιτική Cookies</h1>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border border-mesia-gold/25 bg-white p-8 md:p-10">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-4 bg-mesia-wine/10 rounded-lg border border-mesia-wine/20">
              <p className="text-mesia-darkText mb-0">
                <strong>Ημερομηνία τελευταίας ενημέρωσης:</strong> {LAST_UPDATED}
              </p>
            </div>


            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τι είναι τα cookies</h2>
            <p>Τα cookies είναι μικρά αρχεία που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε μια ιστοσελίδα.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Συναίνεση</h2>
            <p>
              Κατά την πρώτη επίσκεψη εμφανίζεται μήνυμα συναίνεσης που παρέχει η Google (Funding Choices, πλαίσιο IAB TCF).
              Cookies ανάλυσης και διαφήμισης χρησιμοποιούνται μόνο αν τα αποδεχτείτε. Μπορείτε να αλλάξετε ή να ανακαλέσετε την επιλογή σας οποιαδήποτε στιγμή από τον σύνδεσμο «Ρυθμίσεις απορρήτου και cookie» στο κάτω μέρος κάθε σελίδας.
            </p>
            <p><CookieSettingsLink className="text-mesia-wine underline hover:text-mesia-gold" /></p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Κατηγορίες</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-mesia-gold/30">
                <thead className="bg-mesia-wine text-white">
                  <tr>
                    <th className="border border-mesia-gold/30 p-3 text-left">Κατηγορία</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Σκοπός</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Συναίνεση</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Απαραίτητα</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Αποθήκευση της επιλογής σας για cookies και σύνδεση των διαχειριστών (οι επισκέπτες δεν συνδέονται)</td>
                    <td className="border border-mesia-gold/30 p-3">Δεν απαιτείται</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Ανάλυσης</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Στατιστικά επισκεψιμότητας (Google Analytics)</td>
                    <td className="border border-mesia-gold/30 p-3">Απαιτείται</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Διαφήμισης</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Εμφάνιση διαφημίσεων (Google AdSense)</td>
                    <td className="border border-mesia-gold/30 p-3">Απαιτείται</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τρίτοι</h2>
            <ul>
              <li>
                <strong>Google Analytics και Google AdSense:</strong>{' '}
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-mesia-wine hover:text-mesia-gold">
                  πώς η Google χρησιμοποιεί cookies
                </a>
              </li>
              <li>
                <strong>Google Maps</strong> (σελίδα «Πώς να Έρθετε»): φορτώνεται από τη Google και ισχύει η{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-mesia-wine hover:text-mesia-gold">
                  πολιτική απορρήτου της
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Στατιστικά επιλογών</h2>
            <p>
              Κρατάμε μόνο συνολικούς αριθμούς αποδοχών και απορρίψεων, χωρίς IP ή άλλα στοιχεία επισκέπτη.
              Περισσότερα στην <Link href="/legal/privacy-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Απορρήτου</Link>.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Διαγραφή cookies</h2>
            <p>Μπορείτε να διαγράψετε ή να μπλοκάρετε cookies από τις ρυθμίσεις του φυλλομετρητή σας. Ο αποκλεισμός των απαραίτητων cookies μπορεί να επηρεάσει τη λειτουργία της ιστοσελίδας.</p>

            <p className="mb-0"><strong>Επικοινωνία:</strong> <a href="mailto:info@mesia.gr" className="text-mesia-wine hover:text-mesia-gold">info@mesia.gr</a></p>
          </div>
        </div>
      </main>
    </div>
  )
}
