// src/app/legal/privacy-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Shield, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Πολιτική Απορρήτου - Μεσιά Κιλκίς',
  description: 'Πολιτική προστασίας προσωπικών δεδομένων σύμφωνα με τον GDPR και την ελληνική νομοθεσία',
}

export default function PrivacyPolicyPage() {
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
                <Shield className="h-8 w-8 text-mesia-wine" />
                <div>
                  <h1 className="text-2xl font-bold text-mesia-wine font-greek">Πολιτική Απορρήτου</h1>
                  <p className="text-sm text-mesia-lightText">Προστασία Προσωπικών Δεδομένων</p>
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
            <div className="mb-8 p-4 bg-mesia-wine/10 rounded-lg border border-mesia-wine/20">
              <p className="text-mesia-darkText mb-0">
                <strong>Ημερομηνία τελευταίας ενημέρωσης:</strong> {new Date().toLocaleDateString('el-GR')}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">1. Υπεύθυνος Επεξεργασίας Δεδομένων</h2>
            <div className="bg-mesia-lightCream/50 p-4 rounded-lg mb-6">
              <p><strong>Οργανισμός:</strong> Κοινότητα Μεσιάς Κιλκίς</p>
              <p><strong>Διεύθυνση:</strong> Μεσιά, Κιλκίς 61100, Ελλάδα</p>
              <p><strong>Email:</strong> info@mesiakilkis.gr</p>
              <p><strong>Τηλέφωνο:</strong> +30 23XX XXXXXX</p>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">2. Τύποι Προσωπικών Δεδομένων που Συλλέγουμε</h2>
            <p>Συλλέγουμε τα ακόλουθα προσωπικά δεδομένα:</p>
            <ul className="space-y-2">
              <li><strong>Στοιχεία ταυτότητας:</strong> Όνομα, επώνυμο, διεύθυνση email</li>
              <li><strong>Τεχνικά στοιχεία:</strong> Διεύθυνση IP, τύπος φυλλομετρητή, συσκευή</li>
              <li><strong>Στοιχεία χρήσης:</strong> Σελίδες που επισκέπτεστε, χρόνος παραμονής</li>
              <li><strong>Στοιχεία επικοινωνίας:</strong> Μηνύματα μέσω φορμών επικοινωνίας</li>
            </ul>

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
                    <td className="border border-mesia-gold/30 p-3">Παροχή υπηρεσιών ιστοσελίδας</td>
                    <td className="border border-mesia-gold/30 p-3">Νόμιμο συμφέρον</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3">Ενημέρωση για εκδηλώσεις</td>
                    <td className="border border-mesia-gold/30 p-3">Συγκατάθεση</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3">Βελτίωση υπηρεσιών</td>
                    <td className="border border-mesia-gold/30 p-3">Νόμιμο συμφέρον</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3">Συμμόρφωση με νομικές υποχρεώσεις</td>
                    <td className="border border-mesia-gold/30 p-3">Νομική υποχρέωση</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">4. Κοινοποίηση Δεδομένων σε Τρίτους</h2>
            <p>Τα προσωπικά σας δεδομένα μπορεί να κοινοποιηθούν σε:</p>
            <ul>
              <li><strong>Παρόχους υπηρεσιών hosting:</strong> Για τη λειτουργία της ιστοσελίδας</li>
              <li><strong>Παρόχους email:</strong> Για την αποστολή ενημερώσεων</li>
              <li><strong>Αρχές:</strong> Όταν απαιτείται από το νόμο</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">5. Περίοδος Αποθήκευσης</h2>
            <p>Τα προσωπικά δεδομένα αποθηκεύονται για:</p>
            <ul>
              <li><strong>Στοιχεία χρήστη:</strong> Μέχρι την ανάκληση της συγκατάθεσης</li>
              <li><strong>Logs ιστοσελίδας:</strong> 12 μήνες για λόγους ασφαλείας</li>
              <li><strong>Στοιχεία επικοινωνίας:</strong> 24 μήνες από την τελευταία επικοινωνία</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">6. Τα Δικαιώματά σας (GDPR)</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <h3 className="text-lg font-semibold text-mesia-wine mb-3">Έχετε δικαίωμα:</h3>
              <ul className="space-y-2">
                <li>✅ <strong>Πρόσβασης:</strong> Να ζητήσετε αντίγραφο των δεδομένων σας</li>
                <li>✅ <strong>Διόρθωσης:</strong> Να διορθώσετε ανακριβή δεδομένα</li>
                <li>✅ <strong>Διαγραφής:</strong> Να ζητήσετε διαγραφή των δεδομένων σας</li>
                <li>✅ <strong>Περιορισμού:</strong> Να περιορίσετε την επεξεργασία</li>
                <li>✅ <strong>Φορητότητας:</strong> Να λάβετε τα δεδομένα σας σε δομημένη μορφή</li>
                <li>✅ <strong>Εναντίωσης:</strong> Να αντιταχθείτε στην επεξεργασία</li>
                <li>✅ <strong>Ανάκλησης συγκατάθεσης:</strong> Οποιαδήποτε στιγμή</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">7. Ασφάλεια Δεδομένων</h2>
            <p>Εφαρμόζουμε κατάλληλα τεχνικά και οργανωτικά μέτρα:</p>
            <ul>
              <li>🔒 Κρυπτογράφηση δεδομένων (SSL/TLS)</li>
              <li>🔒 Περιορισμένη πρόσβαση στα δεδομένα</li>
              <li>🔒 Τακτικά αντίγραφα ασφαλείας</li>
              <li>🔒 Παρακολούθηση για ανωμαλίες</li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">8. Διεθνείς Μεταφορές</h2>
            <p>Τα δεδομένα σας μπορεί να επεξεργάζονται σε χώρες εκτός της ΕΕ που παρέχουν επαρκές επίπεδο προστασίας ή με κατάλληλες εγγυήσεις.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">9. Cookies και Τεχνολογίες Παρακολούθησης</h2>
            <p>Χρησιμοποιούμε cookies για:</p>
            <ul>
              <li>Βελτίωση της εμπειρίας χρήστη</li>
              <li>Ανάλυση κίνησης ιστοσελίδας</li>
              <li>Προσωποποίηση περιεχομένου</li>
            </ul>
            <p>Δείτε την <Link href="/legal/cookie-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Cookies</Link> για περισσότερες πληροφορίες.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">10. Ενημερώσεις Πολιτικής</h2>
            <p>Αυτή η πολιτική μπορεί να ενημερωθεί περιοδικά. Θα σας ενημερώσουμε για σημαντικές αλλαγές μέσω της ιστοσελίδας ή email.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">11. Επικοινωνία - Άσκηση Δικαιωμάτων</h2>
            <div className="bg-mesia-wine/10 p-6 rounded-lg border border-mesia-wine/20">
              <p className="mb-4">Για την άσκηση των δικαιωμάτων σας ή οποιαδήποτε ερώτηση σχετικά με την επεξεργασία των προσωπικών σας δεδομένων:</p>
              <div className="space-y-2">
                <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-mesia-wine" /><strong>Email:</strong> privacy@mesiakilkis.gr</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-mesia-wine" /><strong>Τηλέφωνο:</strong> +30 23XX XXXXXX</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">12. Καταγγελία στην Αρχή Προστασίας Δεδομένων</h2>
            <p>Έχετε δικαίωμα να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα:</p>
            <div className="bg-mesia-lightCream/50 p-4 rounded-lg">
              <p><strong>Αρχή Προστασίας Δεδομένων Προσωπικού Χαρακτήρα</strong></p>
              <p>Κηφισίας 1-3, 11523 Αθήνα</p>
              <p>Τηλ.: 210 6475600</p>
              <p>Email: contact@dpa.gr</p>
              <p>Website: <a href="https://www.dpa.gr" target="_blank" rel="noopener" className="text-mesia-wine hover:text-mesia-gold">www.dpa.gr</a></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
