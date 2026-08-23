// src/app/legal/privacy-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Mail } from 'lucide-react'

const LAST_UPDATED = '23 Αυγούστου 2026'

export const metadata: Metadata = {
  title: 'Πολιτική Απορρήτου - Μεσιά Κιλκίς',
  description: 'Πολιτική προστασίας προσωπικών δεδομένων σύμφωνα με τον GDPR και την ελληνική νομοθεσία. Δικαιώματα χρηστών και ασφάλεια δεδομένων.',
  alternates: {
    canonical: '/legal/privacy-policy',
  },
  openGraph: {
    title: 'Πολιτική Απορρήτου - Μεσιά Κιλκίς',
    description: 'Πολιτική προστασίας προσωπικών δεδομένων σύμφωνα με GDPR',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-mesia-cream">
      <div className="bg-mesia-wine">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-mesia-cream/70 hover:text-mesia-gold text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Αρχική
          </Link>
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-mesia-gold" />
            <h1 className="text-2xl md:text-3xl font-bold text-white font-greek">Πολιτική Απορρήτου</h1>
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

            <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-900 mb-0">
                Η παρούσα ιστοσελίδα λειτουργεί ανεξάρτητα, χωρίς σχέση με δημόσιους ή δημοτικούς φορείς
                (βλ. Δήλωση Αποποίησης Ευθύνης στο υποσέλιδο). Το κείμενο που ακολουθεί περιγράφει με ειλικρίνεια
                πώς λειτουργεί η ιστοσελίδα σήμερα, αλλά δεν αποτελεί νομική συμβουλή — πριν τεθεί σε πλήρη
                παραγωγική χρήση συνιστάται έλεγχος από δικηγόρο εξειδικευμένο στο GDPR και το ελληνικό δίκαιο.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">1. Υπεύθυνος Επεξεργασίας Δεδομένων</h2>
            <div className="bg-mesia-lightCream/50 p-4 rounded-lg mb-6">
              <p><strong>Ιστοσελίδα:</strong> mesia.gr — ανεξάρτητη, μη κερδοσκοπική ενημερωτική ιστοσελίδα για το χωριό Μεσιά Κιλκίς</p>
              <p><strong>Έδρα/Περιοχή αναφοράς:</strong> Μεσιά, Κιλκίς 61100, Ελλάδα</p>
              <p><strong>Email επικοινωνίας για θέματα προστασίας δεδομένων:</strong> info@mesia.gr</p>
              <p className="text-sm text-mesia-lightText mb-0">
                (Πλήρες όνομα/επωνυμία υπευθύνου επεξεργασίας προς συμπλήρωση πριν την πλήρη κυκλοφορία της ιστοσελίδας.)
              </p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">2. Δεδομένα που Συλλέγουμε</h2>
            <p>Ανάλογα με τον τρόπο που χρησιμοποιείτε την ιστοσελίδα, ενδέχεται να συλλέξουμε:</p>
            <ul className="space-y-2">
              <li><strong>Στοιχεία επικοινωνίας:</strong> όνομα και email, εφόσον επικοινωνήσετε μαζί μας μέσω email</li>
              <li><strong>Τεχνικά στοιχεία:</strong> διεύθυνση IP (ανωνυμοποιημένη όπου καταγράφεται — βλ. ενότητα 9), τύπος φυλλομετρητή/συσκευής</li>
              <li><strong>Προτιμήσεις cookies:</strong> οι επιλογές σας σχετικά με τα cookies, μέσω του banner συναίνεσης της ιστοσελίδας</li>
              <li><strong>Στοιχεία διαχειριστών:</strong> για τους λογαριασμούς διαχείρισης περιεχομένου (email, κρυπτογραφημένος κωδικός) — αφορά μόνο τους εθελοντές/συντάκτες της ιστοσελίδας, όχι τους επισκέπτες</li>
            </ul>
            <p>
              Δεν λειτουργούμε φόρμα εγγραφής, newsletter, ή λογαριασμό επισκέπτη — η ιστοσελίδα είναι κατά βάση
              ενημερωτική.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">3. Σκοπός και Νομική Βάση Επεξεργασίας</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-mesia-gold/30 rounded-lg overflow-hidden">
                <thead className="bg-mesia-wine text-white">
                  <tr>
                    <th className="border border-mesia-gold/30 p-3 text-left">Σκοπός</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Νομική Βάση</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3">Λειτουργία και ασφάλεια της ιστοσελίδας</td>
                    <td className="border border-mesia-gold/30 p-3">Έννομο συμφέρον</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3">Απάντηση σε email επικοινωνίας</td>
                    <td className="border border-mesia-gold/30 p-3">Έννομο συμφέρον / εκτέλεση αιτήματός σας</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3">Ανάλυση επισκεψιμότητας (Google Analytics)</td>
                    <td className="border border-mesia-gold/30 p-3">Συγκατάθεση</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3">Εμφάνιση διαφημίσεων (Google AdSense)</td>
                    <td className="border border-mesia-gold/30 p-3">Συγκατάθεση</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3">Καταγραφή επιλογών cookies</td>
                    <td className="border border-mesia-gold/30 p-3">Νομική υποχρέωση (απόδειξη συναίνεσης)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">4. Πάροχοι και Τρίτα Μέρη</h2>
            <p>Για τη λειτουργία της ιστοσελίδας χρησιμοποιούμε τους ακόλουθους παρόχους, οι οποίοι ενδέχεται να επεξεργάζονται δεδομένα ως εκτελούντες την επεξεργασία ή ως ανεξάρτητοι υπεύθυνοι επεξεργασίας:</p>
            <ul>
              <li><strong>Vercel Inc.</strong> — φιλοξενία (hosting) της ιστοσελίδας</li>
              <li><strong>Neon (Neon Inc.)</strong> — φιλοξενία της βάσης δεδομένων (PostgreSQL)</li>
              <li><strong>Google LLC</strong> — Google Analytics (στατιστικά επισκεψιμότητας) και Google AdSense (διαφημίσεις), εφόσον έχετε δώσει τη σχετική συγκατάθεση</li>
            </ul>
            <p>
              Ορισμένοι από τους παραπάνω παρόχους (Vercel, Neon, Google) εδρεύουν ή διατηρούν υποδομές εκτός
              Ευρωπαϊκού Οικονομικού Χώρου (κυρίως ΗΠΑ). Η μεταφορά δεδομένων προς αυτούς στηρίζεται σε
              Τυποποιημένες Συμβατικές Ρήτρες (Standard Contractual Clauses) και, όπου εφαρμόζεται, στο πλαίσιο
              EU-U.S. Data Privacy Framework.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">5. Περίοδος Αποθήκευσης</h2>
            <ul>
              <li><strong>Στοιχεία επικοινωνίας μέσω email:</strong> έως 24 μήνες από την τελευταία επικοινωνία</li>
              <li><strong>Καταγραφές συναίνεσης cookies:</strong> έως 2 έτη, ως απόδειξη τήρησης του GDPR</li>
              <li><strong>Λογαριασμοί διαχειριστών:</strong> για όσο διάστημα το πρόσωπο εξακολουθεί να συμμετέχει στη διαχείριση της ιστοσελίδας</li>
              <li><strong>Δεδομένα Google Analytics / AdSense:</strong> σύμφωνα με τις δικές τους πολιτικές διατήρησης (βλ. πολιτικές απορρήτου Google)</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">6. Τα Δικαιώματά σας (GDPR)</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Έχετε δικαίωμα:</h3>
              <ul className="space-y-2">
                <li>✅ <strong>Πρόσβασης:</strong> να ζητήσετε αντίγραφο των δεδομένων σας</li>
                <li>✅ <strong>Διόρθωσης:</strong> να διορθώσετε ανακριβή δεδομένα</li>
                <li>✅ <strong>Διαγραφής:</strong> να ζητήσετε διαγραφή των δεδομένων σας</li>
                <li>✅ <strong>Περιορισμού:</strong> να περιορίσετε την επεξεργασία</li>
                <li>✅ <strong>Φορητότητας:</strong> να λάβετε τα δεδομένα σας σε δομημένη μορφή</li>
                <li>✅ <strong>Εναντίωσης:</strong> να αντιταχθείτε στην επεξεργασία</li>
                <li>✅ <strong>Ανάκλησης συγκατάθεσης:</strong> οποιαδήποτε στιγμή, μέσω των ρυθμίσεων cookies</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">7. Ασφάλεια Δεδομένων</h2>
            <ul>
              <li>🔒 Κρυπτογρημένη σύνδεση (HTTPS/TLS) σε όλη την ιστοσελίδα</li>
              <li>🔒 Κρυπτογράφηση κωδικών πρόσβασης διαχειριστών</li>
              <li>🔒 Περιορισμένη πρόσβαση στα δεδομένα, μόνο σε εξουσιοδοτημένους διαχειριστές</li>
              <li>🔒 Τακτικά αντίγραφα ασφαλείας μέσω του παρόχου βάσης δεδομένων</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">8. Cookies</h2>
            <p>
              Χρησιμοποιούμε cookies απαραίτητα για τη λειτουργία της ιστοσελίδας, καθώς και — μόνο κατόπιν
              συγκατάθεσής σας — cookies ανάλυσης (Google Analytics) και διαφήμισης (Google AdSense).
              Δείτε αναλυτικά την <Link href="/legal/cookie-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Cookies</Link>.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">9. Ενημερώσεις Πολιτικής</h2>
            <p>Η παρούσα πολιτική ενδέχεται να ενημερώνεται περιοδικά. Η ημερομηνία στην κορυφή της σελίδας δείχνει πάντα την τελευταία ουσιαστική ενημέρωση.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">10. Επικοινωνία - Άσκηση Δικαιωμάτων</h2>
            <div className="bg-mesia-wine/10 p-6 rounded-lg border border-mesia-wine/20">
              <p className="mb-4">Για την άσκηση των δικαιωμάτων σας ή οποιαδήποτε ερώτηση σχετικά με την επεξεργασία των προσωπικών σας δεδομένων:</p>
              <div className="space-y-2">
                <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-mesia-wine" /><strong>Email:</strong> info@mesia.gr</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">11. Καταγγελία στην Αρχή Προστασίας Δεδομένων</h2>
            <p>Έχετε δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα:</p>
            <div className="bg-mesia-lightCream/50 p-4 rounded-lg">
              <p><strong>Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα</strong></p>
              <p>Κηφισίας 1-3, 11523 Αθήνα</p>
              <p>Τηλ.: 210 6475600</p>
              <p>Email: complaints@dpa.gr</p>
              <p>Website: <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer" className="text-mesia-wine hover:text-mesia-gold">www.dpa.gr</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
