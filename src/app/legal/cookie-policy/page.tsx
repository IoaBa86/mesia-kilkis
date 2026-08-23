// src/app/legal/cookie-policy/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Cookie } from 'lucide-react'

const LAST_UPDATED = '23 Αυγούστου 2026'

export const metadata: Metadata = {
  title: 'Πολιτική Cookies - Μεσιά Κιλκίς',
  description: 'Πληροφορίες για τη χρήση cookies στην ιστοσελίδα Μεσιά Κιλκίς. Τύποι cookies, διαχείριση και προσωπικά δεδομένα.',
  alternates: {
    canonical: '/legal/cookie-policy',
  },
  openGraph: {
    title: 'Πολιτική Cookies - Μεσιά Κιλκίς',
    description: 'Αναλυτικές πληροφορίες για τη χρήση cookies στην ιστοσελίδα Μεσιά Κιλκίς',
    images: ['/og-image.jpg'],
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

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τι είναι τα Cookies</h2>
            <p>Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας όταν επισκέπτεστε μια ιστοσελίδα, ώστε αυτή να λειτουργεί σωστά και να θυμάται τις προτιμήσεις σας.</p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Διαχείριση Συναίνεσης</h2>
            <p>
              Κατά την πρώτη επίσκεψή σας εμφανίζεται ένα banner συναίνεσης cookies, μέσω της πλατφόρμας{' '}
              <strong>Usercentrics</strong>, όπου μπορείτε να επιλέξετε ποιες κατηγορίες cookies επιτρέπετε.
              Μπορείτε να αλλάξετε την επιλογή σας ανά πάσα στιγμή μέσω του σχετικού συνδέσμου ρυθμίσεων cookies
              στο υποσέλιδο της ιστοσελίδας.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Κατηγορίες Cookies που Χρησιμοποιούμε</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-mesia-gold/30 rounded-lg overflow-hidden">
                <thead className="bg-mesia-wine text-white">
                  <tr>
                    <th className="border border-mesia-gold/30 p-3 text-left">Κατηγορία</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Σκοπός</th>
                    <th className="border border-mesia-gold/30 p-3 text-left">Απαιτεί Συναίνεση;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Απαραίτητα</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Βασική λειτουργία ιστοσελίδας, ασφάλεια, καταγραφή της επιλογής σας για cookies</td>
                    <td className="border border-mesia-gold/30 p-3">Όχι</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3"><strong>Λειτουργικότητας</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Απομνημόνευση προτιμήσεων εμφάνισης/πλοήγησης</td>
                    <td className="border border-mesia-gold/30 p-3">Ναι</td>
                  </tr>
                  <tr>
                    <td className="border border-mesia-gold/30 p-3"><strong>Ανάλυσης</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Στατιστικά επισκεψιμότητας μέσω Google Analytics</td>
                    <td className="border border-mesia-gold/30 p-3">Ναι</td>
                  </tr>
                  <tr className="bg-mesia-lightCream/30">
                    <td className="border border-mesia-gold/30 p-3"><strong>Διαφήμισης</strong></td>
                    <td className="border border-mesia-gold/30 p-3">Εμφάνιση και εξατομίκευση διαφημίσεων μέσω Google AdSense</td>
                    <td className="border border-mesia-gold/30 p-3">Ναι</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Τρίτα Μέρη</h2>
            <p>Οι ακόλουθοι τρίτοι πάροχοι ενδέχεται να τοποθετούν cookies στη συσκευή σας, εφόσον έχετε δώσει τη σχετική συγκατάθεση:</p>
            <ul>
              <li>
                <strong>Google Analytics</strong> — ανάλυση επισκεψιμότητας και συμπεριφοράς χρηστών.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-mesia-wine hover:text-mesia-gold">
                  Πολιτική απορρήτου Google
                </a>
              </li>
              <li>
                <strong>Google AdSense</strong> — εμφάνιση διαφημίσεων, ενδεχομένως εξατομικευμένων βάσει του ιστορικού περιήγησής σας.{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-mesia-wine hover:text-mesia-gold">
                  Πώς η Google χρησιμοποιεί cookies για διαφημίσεις
                </a>
              </li>
              <li>
                <strong>Usercentrics</strong> — αποθηκεύει την επιλογή συναίνεσής σας ώστε να μη σας ζητείται ξανά σε κάθε επίσκεψη.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Καταγραφή Συναίνεσης</h2>
            <p>
              Για συμμόρφωση με τον GDPR, καταγράφουμε την επιλογή σας σχετικά με τα cookies
              (αποδοχή/απόρριψη ανά κατηγορία), την ημερομηνία της επιλογής και βασικά τεχνικά στοιχεία
              (ανωνυμοποιημένη IP, τύπος φυλλομετρητή) ως απόδειξη ότι λήφθηκε νόμιμα η συναίνεσή σας.
              Αυτά τα αρχεία διατηρούνται έως 2 έτη.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Διαχείριση Cookies από Εσάς</h2>
            <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
              <ul className="space-y-2 mb-0">
                <li><strong>Μέσω του banner συναίνεσης:</strong> κατά την πρώτη επίσκεψη ή μέσω του συνδέσμου ρυθμίσεων στο υποσέλιδο</li>
                <li><strong>Μέσω του φυλλομετρητή σας:</strong> Ρυθμίσεις → Απόρρητο → Cookies, όπου μπορείτε να διαγράψετε ή να μπλοκάρετε cookies</li>
                <li><strong>Για τη Google:</strong> μέσω των <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer" className="text-mesia-wine hover:text-mesia-gold">ρυθμίσεων διαφημίσεων Google</a></li>
              </ul>
            </div>
            <p className="text-sm text-mesia-lightText">
              Ο αποκλεισμός των απαραίτητων cookies μπορεί να επηρεάσει τη σωστή λειτουργία της ιστοσελίδας.
            </p>

            <h2 className="text-2xl font-bold text-mesia-wine font-greek mb-4">Περισσότερες Πληροφορίες</h2>
            <p>Για περισσότερες πληροφορίες σχετικά με τα δεδομένα που επεξεργαζόμαστε, δείτε την <Link href="/legal/privacy-policy" className="text-mesia-wine hover:text-mesia-gold">Πολιτική Απορρήτου</Link> μας.</p>

            <div className="bg-mesia-wine/10 p-6 rounded-lg border border-mesia-wine/20">
              <p className="mb-0"><strong>Επικοινωνία:</strong> info@mesia.gr</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
