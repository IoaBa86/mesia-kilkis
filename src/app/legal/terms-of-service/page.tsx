// src/app/legal/terms-of-service/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Όροι Χρήσης - Μεσιά Κιλκίς',
  description: 'Όροι και προϋποθέσεις χρήσης της ιστοσελίδας Μεσιά Κιλκίς. Αποδεκτή χρήση, πνευματικά δικαιώματα και υποχρεώσεις χρηστών.',
  alternates: {
    canonical: '/legal/terms-of-service', // ✅ Add this line
  },
  openGraph: {
    title: 'Όροι Χρήσης - Μεσιά Κιλκίς',
    description: 'Όροι και προϋποθέσεις χρήσης της ιστοσελίδας Μεσιά Κιλκίς',
    images: ['/og-image.jpg'],
  },
}


export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-mesia-cream">
      <div className="bg-mesia-wine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-mesia-cream/70 hover:text-mesia-gold text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Αρχική
          </Link>
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-mesia-gold" />
            <h1 className="text-2xl md:text-3xl font-bold text-white font-greek">Όροι Χρήσης</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border border-mesia-gold/25 bg-white p-8 md:p-10">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-4 bg-mesia-wine/10 rounded-lg border border-mesia-wine/20">
              <p className="text-mesia-darkText mb-0">
                <strong>Ημερομηνία ισχύος:</strong> {new Date().toLocaleDateString('el-GR')}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">1. Αποδοχή Όρων</h2>
            <p>Με την πρόσβαση και τη χρήση της ιστοσελίδας "Μεσιά Κιλκίς" (mesia.gr), αποδέχεστε πλήρως και αποδίδετε τους παρόντες όρους χρήσης. Εάν δεν συμφωνείτε με οποιονδήποτε από αυτούς τους όρους, παρακαλούμε μην χρησιμοποιείτε την ιστοσελίδα μας.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">2. Περιγραφή Υπηρεσιών</h2>
            <p>Η ιστοσελίδα "Μεσιά Κιλκίς" παρέχει:</p>
            <ul>
              <li>Πληροφορίες για το χωριό και την κοινότητα</li>
              <li>Ενημέρωση για εκδηλώσεις και δραστηριότητες</li>
              <li>Φωτογραφικό υλικό του χωριού</li>
              <li>Στοιχεία επικοινωνίας και υπηρεσίες</li>
              <li>Ιστορικές και πολιτιστικές πληροφορίες</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">3. Αποδεκτή Χρήση</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Επιτρέπεται:</h3>
              <ul className="space-y-1">
                <li>✅ Προβολή και ανάγνωση περιεχομένου</li>
                <li>✅ Κοινοποίηση συνδέσμων στα social media</li>
                <li>✅ Επικοινωνία μέσω των παρεχόμενων φορμών</li>
                <li>✅ Εκτύπωση για προσωπική χρήση</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mt-4">
              <h3 className="text-lg font-semibold text-red-700 mb-3">Απαγορεύεται:</h3>
              <ul className="space-y-1 text-red-700">
                <li>❌ Αναπαραγωγή περιεχομένου χωρίς άδεια</li>
                <li>❌ Χρήση για εμπορικούς σκοπούς</li>
                <li>❌ Παρενόχληση άλλων χρηστών</li>
                <li>❌ Δημοσίευση παράνομου περιεχομένου</li>
                <li>❌ Προσπάθειες παραβίασης ασφάλειας</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">4. Πνευματικά Δικαιώματα</h2>
            <p>Όλο το περιεχόμενο της ιστοσελίδας (κείμενα, εικόνες, λογότυπα, γραφικά) προστατεύεται από δικαιώματα πνευματικής ιδιοκτησίας και ανήκει στην Κοινότητα Μεσιάς Κιλκίς ή έχει παραχωρηθεί νόμιμα προς χρήση.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">5. Υποβολή Περιεχομένου</h2>
            <p>Εάν υποβάλλετε περιεχόμενο (σχόλια, φωτογραφίες, προτάσεις) μέσω της ιστοσελίδας:</p>
            <ul>
              <li>Παραμένετε κάτοχος των δικαιωμάτων σας</li>
              <li>Μας παραχωρείτε άδεια χρήσης για τους σκοπούς της ιστοσελίδας</li>
              <li>Εγγυάστε ότι δεν παραβιάζετε δικαιώματα τρίτων</li>
              <li>Αποδέχεστε ότι το περιεχόμενο μπορεί να επεξεργαστεί ή αφαιρεθεί</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">6. Αποποίηση Ευθυνών</h2>
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p><strong>Η ιστοσελίδα παρέχεται "ως έχει" χωρίς εγγυήσεις.</strong></p>
              <p>Δεν φέρουμε ευθύνη για:</p>
              <ul>
                <li>Ακρίβεια ή πληρότητα πληροφοριών</li>
                <li>Τεχνικά προβλήματα ή διακοπές λειτουργίας</li>
                <li>Ζημίες από χρήση της ιστοσελίδας</li>
                <li>Περιεχόμενο εξωτερικών συνδέσμων</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">7. Περιορισμός Ευθύνης</h2>
            <p>Σε καμία περίπτωση η Κοινότητα Μεσιάς Κιλκίς δεν θα είναι υπεύθυνη για οποιεσδήποτε άμεσες, έμμεσες, συνεπακόλουθες ή τυχαίες ζημίες που προκύπτουν από τη χρήση ή την αδυναμία χρήσης της ιστοσελίδας.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">8. Εξωτερικοί Σύνδεσμοι</h2>
            <p>Η ιστοσελίδα μπορεί να περιέχει συνδέσμους προς εξωτερικές ιστοσελίδες. Δεν φέρουμε ευθύνη για το περιεχόμενο ή τις πρακτικές αυτών των ιστοσελίδων.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">9. Τροποποιήσεις</h2>
            <p>Διατηρούμε το δικαίωμα να τροποποιούμε οποιαδήποτε στιγμή:</p>
            <ul>
              <li>Τους παρόντες όρους χρήσης</li>
              <li>Το περιεχόμενο της ιστοσελίδας</li>
              <li>Τις υπηρεσίες που παρέχονται</li>
            </ul>
            <p>Οι τροποποιήσεις τίθενται σε ισχύ από τη δημοσίευσή τους στην ιστοσελίδα.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">10. Εφαρμοστέο Δίκαιο</h2>
            <p>Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Για οποιαδήποτε διαφορά αρμόδια είναι τα δικαστήρια της Θεσσαλονίκης.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">11. Επικοινωνία</h2>
            <div className="bg-mesia-wine/10 p-6 rounded-lg border border-mesia-wine/20">
              <p>Για ερωτήσεις σχετικά με τους όρους χρήσης:</p>
              <p><strong>Email:</strong> info@mesia.gr</p>
              <p><strong>Διεύθυνση:</strong> Μεσιά, Κιλκίς 61100, Ελλάδα</p>
            </div>

            <div className="mt-8 p-4 bg-mesia-gold/10 rounded-lg border border-mesia-gold/30 text-center">
              <p className="text-sm text-mesia-darkText">
                Με τη συνέχιση της χρήσης της ιστοσελίδας, αποδέχεστε τους παραπάνω όρους.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
