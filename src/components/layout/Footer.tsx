// src/components/layout/Footer.tsx
import Link from 'next/link'
import { MapPin, Mail, Calendar, FileText } from 'lucide-react'

export default function Footer({
  showVillageVoices = false,
  showDigitalMuseum = false,
}: {
  showVillageVoices?: boolean
  showDigitalMuseum?: boolean
}) {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: 'Αρχική' },
    { href: '/village', label: 'Το Χωριό' },
    { href: '/photos', label: 'Φωτογραφίες' },
    { href: '/area', label: 'Η Περιοχή' },
    { href: '/history', label: 'Ιστορία' },
    ...(showVillageVoices ? [{ href: '/village-voices', label: 'Φωνές του Χωριού' }] : []),
    ...(showDigitalMuseum ? [{ href: '/digital-museum', label: 'Ψηφιακό Μουσείο' }] : []),
    { href: '/events', label: 'Εκδηλώσεις' },
  ]

  const legalLinks = [
    { href: '/legal/privacy-policy', label: 'Πολιτική Απορρήτου' },
    { href: '/legal/terms-of-service', label: 'Όροι Χρήσης' },
    { href: '/legal/cookie-policy', label: 'Πολιτική Cookies' },
    { href: '/legal/legal-notice', label: 'Νομικές Πληροφορίες' },
  ]

  return (
    <footer className="bg-mesia-darkText text-mesia-cream/80">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Village Info */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-mesia-gold bg-mesia-wine text-mesia-gold font-greek font-bold text-lg">
                  Μ
                </div>
                <h3 className="text-xl font-bold font-greek text-white">Μεσιά Κιλκίς</h3>
              </div>
              <p className="leading-relaxed text-sm">
                Παραδοσιακό πεδινό χωριό της Κεντρικής Μακεδονίας, στην Περιφερειακή
                Ενότητα Κιλκίς. Δυτικά του Αξιού, στις συντεταγμένες 40°52′57″N 22°34′35″E.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-[0.14em] text-mesia-gold mb-5 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Σύνδεσμοι
              </h4>
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-mesia-gold transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-[0.14em] text-mesia-gold mb-5 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Νομικά
              </h4>
              <ul className="space-y-2.5 text-sm">
                {legalLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-mesia-gold transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-[0.14em] text-mesia-gold mb-5 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Επικοινωνία
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-mesia-gold flex-shrink-0 mt-0.5" />
                  <span>Μεσιά, Κιλκίς 61007<br />Κεντρική Μακεδονία</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-mesia-gold flex-shrink-0" />
                  <a href="mailto:info@mesia.gr" className="hover:text-mesia-gold transition-colors">
                    info@mesia.gr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs leading-relaxed text-center text-mesia-cream/50">
            Δήλωση Αποποίησης Ευθύνης: Η παρούσα ιστοσελίδα λειτουργεί σε πλήρη
            ανεξαρτησία και δεν διατηρεί καμία σχέση, συνεργασία ή εξάρτηση με
            κρατικές αρχές, δημόσιους φορείς ή άλλες διοικητικές υπηρεσίες.
            Οποιαδήποτε αναφορά σε τέτοιους φορείς γίνεται αποκλειστικά για
            ενημερωτικούς σκοπούς και δεν συνεπάγεται καμία μορφή έγκρισης,
            υποστήριξης ή συνύπαρξης.
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
          <p className="text-xs text-mesia-cream/50">
            © {currentYear} Μεσιά Κιλκίς — Όλα τα δικαιώματα διατηρούνται
          </p>
        </div>
      </div>
    </footer>
  )
}
