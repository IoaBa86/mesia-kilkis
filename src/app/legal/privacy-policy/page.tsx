// src/app/legal/privacy-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield } from 'lucide-react'

const LAST_UPDATED = '20 Σεπτεμβρίου 2026'

export const metadata: Metadata = {
  title: 'Πολιτική Απορρήτου - Μεσιά Κιλκίς',
  description: 'Πώς επεξεργαζόμαστε προσωπικά δεδομένα στην ιστοσελίδα Μεσιά Κιλκίς και ποια δικαιώματα έχετε σύμφωνα με τον GDPR.',
  alternates: {
    canonical: '/legal/privacy-policy',
  },
  openGraph: {
    title: 'Πολιτική Απορρήτου - Μεσιά Κιλκίς',
    description: 'Επεξεργασία προσωπικών δεδομένων και δικαιώματα χρηστών σύμφωνα με τον GDPR',
  },
}

const cell = 'border border-mesia-gold/30 p-3 align-top'
const link = 'text-mesia-wine hover:text-mesia-gold'

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
            <p className="text-sm text-mesia-lightText"><strong>Τελευταία ενημέρωση:</strong> {LAST_UPDATED}</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">1. Υπεύθυνος επεξεργασίας</h2>
            <p>
              Υπεύθυνος επεξεργασίας είναι η ομάδα διαχείρισης της ιστοσελίδας «Μεσιά Κιλκίς» (mesia.gr).
              Επικοινωνία μόνο μέσω email: <a href="mailto:info@mesia.gr" className={link}>info@mesia.gr</a>.
              Η ιστοσελίδα είναι ανεξάρτητη και δεν σχετίζεται με την Τοπική Κοινότητα Μεσιάς, τον Δήμο Παιονίας ή άλλον δημόσιο φορέα.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">2. Δεδομένα, σκοποί και νομική βάση</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-mesia-gold/30">
                <thead className="bg-mesia-wine text-white">
                  <tr>
                    <th className="border border-mesia-gold/30 p-3 text-left">Δεδομένα</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Σκοπός</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Νομική βάση</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={cell}>Όνομα, email και περιεχόμενο του μηνύματος, εφόσον μας γράψετε</td>
                    <td className={cell}>Απάντηση στο αίτημά σας</td>
                    <td className={cell}>Έννομο συμφέρον (άρθρο 6 παρ. 1 στ΄ GDPR)</td>
                  </tr>
                  <tr>
                    <td className={cell}>Δεδομένα που συλλέγουν το Google Analytics και το Google AdSense</td>
                    <td className={cell}>Στατιστικά επισκεψιμότητας και διαφημίσεις</td>
                    <td className={cell}>Συγκατάθεση (άρθρο 6 παρ. 1 α΄ GDPR)</td>
                  </tr>
                  <tr>
                    <td className={cell}>Email και κρυπτογραφημένος κωδικός των διαχειριστών (όχι των επισκεπτών)</td>
                    <td className={cell}>Σύνδεση στο σύστημα διαχείρισης</td>
                    <td className={cell}>Έννομο συμφέρον (άρθρο 6 παρ. 1 στ΄ GDPR)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Δεν υπάρχει εγγραφή επισκεπτών ούτε αυτοματοποιημένη λήψη αποφάσεων ή κατάρτιση προφίλ από εμάς.
              Η παροχή δεδομένων προς εμάς δεν είναι υποχρεωτική· χωρίς email δεν μπορούμε να απαντήσουμε σε αίτημά σας.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">3. Αποδέκτες και τρίτοι</h2>
            <p>Ο διακομιστής της ιστοσελίδας και η βάση δεδομένων διαχειρίζονται από την ομάδα διαχείρισης. Δεδομένα λαμβάνουν επιπλέον οι εξής τρίτοι, ως ανεξάρτητοι υπεύθυνοι επεξεργασίας:</p>
            <ul>
              <li>
                <strong>Google</strong> — Google Analytics και Google AdSense, μόνο αν συναινέσετε. Το μήνυμα συναίνεσης παρέχει η Google (Funding Choices). Επίσης, ο χάρτης της σελίδας «Πώς να Έρθετε» φορτώνεται από τη Google (Google Maps), η οποία λαμβάνει τη διεύθυνση IP σας.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={link}>Πολιτική απορρήτου Google</a>.
              </li>
              <li>
                <strong>Open-Meteo</strong> — παρέχει τα δεδομένα καιρού της κεφαλίδας. Ο φυλλομετρητής σας επικοινωνεί απευθείας με το api.open-meteo.com, το οποίο λαμβάνει τη διεύθυνση IP σας.
              </li>
            </ul>
            <p>Η Google ενδέχεται να μεταφέρει δεδομένα εκτός Ευρωπαϊκού Οικονομικού Χώρου, σύμφωνα με τους μηχανισμούς μεταφοράς που δηλώνει στην πολιτική της.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">4. Διάρκεια διατήρησης</h2>
            <ul>
              <li><strong>Μηνύματα email:</strong> για όσο χρειάζεται για την απάντηση και τη διεκπεραίωση του αιτήματός σας.</li>
              <li><strong>Λογαριασμοί διαχειριστών:</strong> όσο το πρόσωπο συμμετέχει στη διαχείριση.</li>
              <li><strong>Δεδομένα Google:</strong> σύμφωνα με τις πολιτικές της Google.</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">5. Στατιστικά επιλογών cookies</h2>
            <p>
              Η επιλογή σας στο μήνυμα συναίνεσης αποθηκεύεται από τη Google στη συσκευή σας. Εμείς κρατάμε μόνο συνολικούς αριθμούς
              (πόσες φορές έγινε αποδοχή και πόσες απόρριψη). Δεν αποθηκεύουμε IP, στοιχεία φυλλομετρητή ή αναγνωριστικό, επομένως
              οι αριθμοί αυτοί δεν αφορούν συγκεκριμένο πρόσωπο. Μπορείτε να αλλάξετε ή να ανακαλέσετε τη συναίνεσή σας οποιαδήποτε στιγμή.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">6. Τα δικαιώματά σας</h2>
            <p>
              Για δεδομένα που μπορούμε να συνδέσουμε με εσάς (π.χ. τα email σας) έχετε δικαίωμα πρόσβασης, διόρθωσης, διαγραφής, περιορισμού της επεξεργασίας, φορητότητας και εναντίωσης.
              Έχετε επίσης δικαίωμα να ανακαλέσετε τη συγκατάθεσή σας οποιαδήποτε στιγμή, μέσω του κουμπιού ρυθμίσεων cookies (κάτω δεξιά), χωρίς να θίγεται η νομιμότητα της επεξεργασίας πριν την ανάκληση.
              Για να ασκήσετε δικαίωμα, γράψτε στο <a href="mailto:info@mesia.gr" className={link}>info@mesia.gr</a>.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">7. Καταγγελία</h2>
            <p>
              Έχετε δικαίωμα καταγγελίας στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα:{' '}
              <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer" className={link}>www.dpa.gr</a>.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">8. Cookies</h2>
            <p>Δείτε την <Link href="/legal/cookie-policy" className={link}>Πολιτική Cookies</Link>.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
