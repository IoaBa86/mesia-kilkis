// src/app/legal/terms-of-service/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

const LAST_UPDATED = '23 Αυγούστου 2026'

export const metadata: Metadata = {
  title: 'Όροι Χρήσης - Μεσιά Κιλκίς',
  description: 'Όροι και προϋποθέσεις χρήσης της ιστοσελίδας Μεσιά Κιλκίς. Αποδεκτή χρήση, πνευματικά δικαιώματα και υποχρεώσεις χρηστών.',
  alternates: {
    canonical: '/legal/terms-of-service',
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border border-mesia-gold/25 bg-white p-8 md:p-10">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-4 bg-mesia-wine/10 rounded-lg border border-mesia-wine/20">
              <p className="text-mesia-darkText mb-0">
                <strong>Ημερομηνία ισχύος:</strong> {LAST_UPDATED}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">1. Αποδοχή Όρων</h2>
            <p>Με την πρόσβαση και τη χρήση της ιστοσελίδας «Μεσιά Κιλκίς» (mesia.gr), αποδέχεστε πλήρως τους παρόντες όρους χρήσης. Εάν δεν συμφωνείτε με οποιονδήποτε από αυτούς τους όρους, παρακαλούμε μην χρησιμοποιείτε την ιστοσελίδα.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">2. Περιγραφή Υπηρεσιών</h2>
            <p>Η ιστοσελίδα «Μεσιά Κιλκίς» είναι ανεξάρτητη, μη κερδοσκοπική ενημερωτική ιστοσελίδα και παρέχει:</p>
            <ul>
              <li>Πληροφορίες για το χωριό και την ευρύτερη περιοχή</li>
              <li>Ενημέρωση για εκδηλώσεις και ανακοινώσεις</li>
              <li>Φωτογραφικό υλικό του χωριού</li>
              <li>Ιστορικές και πολιτιστικές πληροφορίες</li>
              <li>Γενικά στοιχεία επικοινωνίας και υπηρεσιών της περιοχής</li>
            </ul>
            <p>Η ιστοσελίδα δεν αποτελεί επίσημο κανάλι δήμου, δημοτικής ενότητας ή άλλου κρατικού φορέα.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">3. Αποδεκτή Χρήση</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Επιτρέπεται:</h3>
              <ul className="space-y-1">
                <li>✅ Προβολή και ανάγνωση περιεχομένου</li>
                <li>✅ Κοινοποίηση συνδέσμων στα social media</li>
                <li>✅ Επικοινωνία μέσω των παρεχόμενων στοιχείων επικοινωνίας</li>
                <li>✅ Εκτύπωση ή αποθήκευση για προσωπική, μη εμπορική χρήση</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200 mt-4">
              <h3 className="text-lg font-semibold text-red-700 mb-3">Απαγορεύεται:</h3>
              <ul className="space-y-1 text-red-700">
                <li>❌ Αναπαραγωγή ή εμπορική εκμετάλλευση περιεχομένου χωρίς άδεια</li>
                <li>❌ Προσπάθειες μη εξουσιοδοτημένης πρόσβασης στο σύστημα διαχείρισης (admin panel)</li>
                <li>❌ Αυτοματοποιημένη συλλογή περιεχομένου (scraping) σε εμπορική κλίμακα</li>
                <li>❌ Δημοσίευση ή αποστολή παράνομου, προσβλητικού ή παραπλανητικού περιεχομένου μέσω των φορμών επικοινωνίας</li>
                <li>❌ Οποιαδήποτε ενέργεια που θέτει σε κίνδυνο την ασφάλεια ή διαθεσιμότητα της ιστοσελίδας</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">4. Πνευματικά Δικαιώματα</h2>
            <p>Το περιεχόμενο της ιστοσελίδας (κείμενα, φωτογραφίες, λογότυπο, σχεδιασμός) προστατεύεται από δικαιώματα πνευματικής ιδιοκτησίας και ανήκει στην ομάδα διαχείρισης της ιστοσελίδας «Μεσιά Κιλκίς» ή σε τρίτους που έχουν παραχωρήσει νόμιμα δικαίωμα χρήσης (π.χ. κάτοικοι που έχουν προσφέρει φωτογραφικό υλικό). Η αναπαραγωγή χωρίς άδεια απαγορεύεται.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">5. Διαφημίσεις</h2>
            <p>Η ιστοσελίδα εμφανίζει διαφημίσεις μέσω του δικτύου Google AdSense για την κάλυψη του κόστους λειτουργίας/φιλοξενίας. Η επιλογή και το περιεχόμενο των διαφημίσεων καθορίζεται από τη Google και ενδέχεται να βασίζεται στη συγκατάθεσή σας για εξατομικευμένη διαφήμιση (βλ. <Link href="/legal/cookie-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Cookies</Link>). Δεν φέρουμε ευθύνη για το περιεχόμενο τρίτων διαφημίσεων.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">6. Υποβολή Περιεχομένου</h2>
            <p>Εάν μας αποστείλετε περιεχόμενο (π.χ. φωτογραφίες ή πληροφορίες προς δημοσίευση) μέσω email ή φόρμας επικοινωνίας:</p>
            <ul>
              <li>Παραμένετε κάτοχος των πνευματικών σας δικαιωμάτων επί του υλικού</li>
              <li>Μας παραχωρείτε άδεια δημοσίευσής του στην ιστοσελίδα</li>
              <li>Εγγυάστε ότι έχετε το δικαίωμα να μας το παραχωρήσετε και ότι δεν παραβιάζει δικαιώματα τρίτων</li>
              <li>Αποδέχεστε ότι μπορεί να επεξεργαστεί, περικοπεί ή να μη δημοσιευτεί, κατά την κρίση της ομάδας διαχείρισης</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">7. Αποποίηση Ευθυνών</h2>
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <p><strong>Η ιστοσελίδα παρέχεται «ως έχει», χωρίς εγγυήσεις πληρότητας ή ακρίβειας.</strong></p>
              <p>Δεν φέρουμε ευθύνη για:</p>
              <ul>
                <li>Ακρίβεια ή επικαιρότητα πληροφοριών (ωράρια υπηρεσιών, στοιχεία επικοινωνίας τρίτων κ.λπ.)</li>
                <li>Τεχνικά προβλήματα, διακοπές λειτουργίας ή απώλεια δεδομένων</li>
                <li>Ζημίες που προκύπτουν από τη χρήση ή αδυναμία χρήσης της ιστοσελίδας</li>
                <li>Περιεχόμενο εξωτερικών συνδέσμων ή διαφημίσεων τρίτων</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">8. Περιορισμός Ευθύνης</h2>
            <p>Στον μέγιστο βαθμό που επιτρέπει ο νόμος, η ομάδα διαχείρισης της ιστοσελίδας δεν φέρει ευθύνη για άμεσες, έμμεσες, συνεπακόλουθες ή τυχαίες ζημίες που προκύπτουν από τη χρήση της ιστοσελίδας.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">9. Τροποποιήσεις</h2>
            <p>Διατηρούμε το δικαίωμα να τροποποιούμε οποιαδήποτε στιγμή τους παρόντες όρους, το περιεχόμενο ή τις λειτουργίες της ιστοσελίδας. Οι τροποποιήσεις ισχύουν από τη δημοσίευσή τους.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">10. Εφαρμοστέο Δίκαιο</h2>
            <p>Οι παρόντες όροι διέπονται από το ελληνικό δίκαιο. Αρμόδια για κάθε διαφορά είναι τα δικαστήρια της Θεσσαλονίκης.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">11. Επικοινωνία</h2>
            <div className="bg-mesia-wine/10 p-6 rounded-lg border border-mesia-wine/20">
              <p>Για ερωτήσεις σχετικά με τους όρους χρήσης:</p>
              <p><strong>Email:</strong> info@mesia.gr</p>
              <p><strong>Περιοχή αναφοράς:</strong> Μεσιά, Κιλκίς 61100, Ελλάδα</p>
            </div>

            <div className="mt-8 p-4 bg-mesia-gold/10 rounded-lg border border-mesia-gold/30 text-center">
              <p className="text-sm text-mesia-darkText mb-0">
                Με τη συνέχιση της χρήσης της ιστοσελίδας, αποδέχεστε τους παραπάνω όρους.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
