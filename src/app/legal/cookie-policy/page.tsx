// src/app/legal/cookie-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Πολιτική Cookies - Μεσιά Κιλκίς',
  description: 'Πληροφορίες για τη χρήση cookies στην ιστοσελίδα Μεσιά Κιλκίς',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Navigation */}


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl rounded-2xl p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τι είναι τα Cookies;</h2>
            <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε μια ιστοσελίδα. Χρησιμοποιούνται για να κάνουν τις ιστοσελίδες να λειτουργούν αποτελεσματικότερα και να παρέχουν πληροφορίες στους ιδιοκτήτες της ιστοσελίδας.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Πώς Χρησιμοποιούμε τα Cookies</h2>
            <p>Στην ιστοσελίδα "Μεσιά Κιλκίς" χρησιμοποιούμε cookies για τους ακόλουθους σκοπούς:</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-mesia-gold/30 rounded-lg overflow-hidden">
                <thead className="bg-mesia-wine text-white">
                  <tr>
                    <th className="border border-mesia-gold/30 p-3 text-left">Τύπος Cookie</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Σκοπός</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Διάρκεια</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Απαραίτητα</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Λειτουργία ιστοσελίδας, ασφάλεια, προτιμήσεις</td>
                    <td className="border border-mesia-gold/30 p-3">Περίοδος λειτουργίας</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3"><strong>Αναλυτικά</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Στατιστικά επισκεψιμότητας, βελτίωση υπηρεσιών</td>
                    <td className="border border-mesia-gold/30 p-3">24 μήνες</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Λειτουργικότητας</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Αποθήκευση προτιμήσεων χρήστη</td>
                    <td className="border border-mesia-gold/30 p-3">12 μήνες</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Συγκατάθεση για Cookies</h2>
            <p>Κατά την πρώτη επίσκεψή σας, θα εμφανιστεί ένα banner που σας ενημερώνει για τη χρήση cookies. Μπορείτε:</p>
            <ul>
              <li>Να αποδεχτείτε όλα τα cookies</li>
              <li>Να επιλέξετε συγκεκριμένες κατηγορίες</li>
              <li>Να απορρίψετε μη απαραίτητα cookies</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Διαχείριση Cookies</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Μπορείτε να διαχειριστείτε τα cookies:</h3>
              <ul className="space-y-2">
                <li><strong>Μέσω φυλλομετρητή:</strong> Ρυθμίσεις → Απόρρητο → Cookies</li>
                <li><strong>Μέσω ιστοσελίδας:</strong> Χρήση του cookie banner</li>
                <li><strong>Τρίτων μερών:</strong> Μέσω των δικών τους ρυθμίσεων</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τρίτα Μέρη</h2>
            <p>Ενδέχεται να χρησιμοποιούμε υπηρεσίες τρίτων που τοποθετούν cookies:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Ανάλυση κίνησης ιστοσελίδας</li>
              <li><strong>Social Media:</strong> Κουμπιά κοινοποίησης</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Περισσότερες Πληροφορίες</h2>
            <p>Για περισσότερες πληροφορίες σχετικά με τα cookies και τα δικαιώματά σας, δείτε την <Link href="/legal/privacy-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Απορρήτου</Link> μας.</p>

            <div className="bg-mesia-wine/10 p-6 rounded-lg border border-mesia-wine/20">
              <p><strong>Επικοινωνία:</strong> info@mesia.gr</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
