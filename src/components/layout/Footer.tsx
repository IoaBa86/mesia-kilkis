// src/components/layout/Footer.tsx
import Link from 'next/link'
import { MapPin, Mail, Calendar, FileText, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  /* ---------- Data ---------- */
  const quickLinks = [
    { href: '/', label: 'Αρχική',       icon: '🏠' },
    { href: '/village',  label: 'Το Χωριό',      icon: '🏘️' },
    { href: '/photos',   label: 'Φωτογραφίες',   icon: '📸' },
    { href: '/area',     label: 'Η Περιοχή',     icon: '🗺️' },
    { href: '/history',  label: 'Ιστορία',       icon: '📚' },
    { href: '/services', label: 'Υπηρεσίες',     icon: '⚙️' },
    { href: '/events',   label: 'Εκδηλώσεις',    icon: '📅' },
  ]

  const legalLinks = [
    { href: '/legal/privacy-policy',  label: 'Πολιτική Απορρήτου' },
    { href: '/legal/terms-of-service',label: 'Όροι Χρήσης'        },
    { href: '/legal/cookie-policy',   label: 'Πολιτική Cookies'   },
    { href: '/legal/legal-notice',    label: 'Νομικές Πληροφορίες'},
  ]

  /* ---------- Render ---------- */
  return (
    <footer className="bg-gradient-to-br from-mesia-darkText via-mesia-wine to-mesia-darkText text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Village Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-mesia-gold to-mesia-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-mesia-wine font-bold text-xl font-greek">Μ</span>
              </div>
              <h3 className="text-2xl font-bold font-greek text-mesia-gold">Μεσιά Κιλκίς</h3>
            </div>
            <p className="text-mesia-cream leading-relaxed">
              Παραδοσιακό χωριό της Κεντρικής Μακεδονίας με πλούσια ιστορία 
              και ζωντανή παράδοση που διατηρείται αιώνες.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-mesia-gold mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Σύνδεσμοι
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center space-x-2 text-mesia-cream hover:text-mesia-gold transition-colors duration-200 group"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-mesia-gold mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Νομικά
            </h4>
            <ul className="space-y-3">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-mesia-cream hover:text-mesia-gold transition-colors duration-200 text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-mesia-gold mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Επικοινωνία
            </h4>
            <div className="space-y-3 text-mesia-cream">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-mesia-gold flex-shrink-0" />
                <span className="text-sm">
                  Μεσιά, Κιλκίς&nbsp;61100<br />
                  Κεντρική Μακεδονία
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-mesia-gold flex-shrink-0" />
                <a
                  href="mailto:info@mesiakilkis.gr"
                  className="text-sm hover:text-mesia-gold transition-colors"
                >
                  info@mesiakilkis.gr
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEWSLETTER SIGN-UP */}
      <div className="bg-mesia-wine/20 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-mesia-gold mb-2">
              Ενημερώσεις Χωριού
            </h3>
            <p className="text-mesia-cream mb-4">
              Λάβετε ενημερώσεις για εκδηλώσεις και νέα του χωριού
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Το email σας..."
                className="w-full sm:flex-1 px-4 py-2 rounded-lg text-mesia-darkText focus:outline-none focus:ring-2 focus:ring-mesia-gold"
              />
              <button className="w-full sm:w-auto px-6 py-2 bg-mesia-gold text-mesia-wine font-semibold rounded-lg hover:bg-mesia-accent transition-colors duration-200">
                Εγγραφή
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="bg-mesia-wine/10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-mesia-cream leading-relaxed text-center">
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
      <div className="bg-mesia-darkText/80 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-mesia-lightCream text-sm mb-4 md:mb-0">
              © {currentYear} Μεσιά Κιλκίς. Όλα τα δικαιώματα διατηρούνται.
            </p>
            <div className="flex items-center text-mesia-lightCream text-sm">
              <span>Φτιαγμένο με</span>
              <Heart className="h-4 w-4 mx-1 text-red-400" />
              <span>για το χωριό μας</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
