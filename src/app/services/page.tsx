// src/app/services/page.tsx
import { Metadata } from 'next'
import {
  MapPin,
  Phone,
  Clock,
  Building,
  Heart,
  Package,
  GraduationCap,
  Shield,
} from "lucide-react"
import StructuredData from "@/components/StructuredData"
import PageHero from '@/components/site/PageHero'
import SectionHeading from '@/components/site/SectionHeading'
import FeatureCard from '@/components/site/FeatureCard'

export const metadata: Metadata = {
  title: 'Υπηρεσίες & Δημοτικό Συμβούλιο',
  description: 'Βρείτε όλες τις υπηρεσίες του χωριού Μεσιά (Mesia) Κιλκίς και τα στοιχεία επικοινωνίας του Δημοτικού Συμβουλίου.',
  keywords: ['Μεσιά', 'Mesia', 'Κιλκίς', 'υπηρεσίες', 'δημοτικό συμβούλιο'],
  openGraph: {
    title: 'Υπηρεσίες & Δημοτικό Συμβούλιο - Μεσιά Κιλκίς',
    description: 'Όλες οι υπηρεσίες και επικοινωνία με το Δημοτικό Συμβούλιο του χωριού Μεσιά Κιλκίς',
  },
}

export default function ServicesPage() {
  const villageServices = [
    {
      title: "Ταχυδρομείο",
      description: "Ταχυδρομικές υπηρεσίες και αποστολή δεμάτων",
      icon: Package,
      contact: "Τηλ: 23430 41234",
      hours: "Δευ-Παρ: 08:00-14:00",
      location: "Κεντρική Πλατεία",
    },
    {
      title: "Ιατρείο",
      description: "Πρωτοβάθμια φροντίδα υγείας για τους κατοίκους",
      icon: Heart,
      contact: "Τηλ: 23430 41567 (Επείγον: 166)",
      hours: "Δευ-Τετ-Παρ: 09:00-13:00",
      location: "Οδός Κιλκίς 15",
    },
    {
      title: "Δημοτικό Σχολείο",
      description: "Εκπαίδευση παιδιών ηλικίας 6-12 ετών",
      icon: GraduationCap,
      contact: "Τηλ: 23430 41890",
      hours: "Δευ-Παρ: 08:15-14:00",
      location: "Οδός Μακεδονίας 8",
    },
    {
      title: "Αστυνομικό Τμήμα",
      description: "Ασφάλεια και τάξη στο χωριό",
      icon: Shield,
      contact: "Τηλ: 23430 41100 (Επείγον: 100)",
      hours: "24ωρη εξυπηρέτηση",
      location: "Κεντρικός Δρόμος 22",
    }
  ]

  // NOTE: villageServices contact/hours/location above and the emergency
  // numbers below are placeholder data carried over from the original
  // build — see project to-do notes about replacing them with real details.

  return (
    <>
      <StructuredData type="place" />

      <div className="min-h-screen bg-mesia-cream">
        <main>
          <PageHero
            icon={Building}
            eyebrow="Δημοτικό Συμβούλιο"
            title="Υπηρεσίες & Συμβούλιο"
            description="Όλες οι υπηρεσίες του χωριού και η επικοινωνία με το Δημοτικό Συμβούλιο"
          />

          {/* Village Services */}
          <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                title="Υπηρεσίες Χωριού"
                description="Βρείτε όλες τις απαραίτητες υπηρεσίες για την καθημερινή σας εξυπηρέτηση"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {villageServices.map((service, index) => (
                  <FeatureCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                  >
                    <div className="space-y-2.5 mt-5 pt-5 border-t border-mesia-gold/20 text-sm">
                      <div className="flex items-center text-mesia-darkText/80">
                        <Phone className="h-4 w-4 mr-3 text-mesia-gold flex-shrink-0" />
                        <span>{service.contact}</span>
                      </div>
                      <div className="flex items-center text-mesia-darkText/80">
                        <Clock className="h-4 w-4 mr-3 text-mesia-gold flex-shrink-0" />
                        <span>{service.hours}</span>
                      </div>
                      <div className="flex items-center text-mesia-darkText/80">
                        <MapPin className="h-4 w-4 mr-3 text-mesia-gold flex-shrink-0" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </FeatureCard>
                ))}
              </div>
            </div>
          </section>

          {/* Emergency Contacts */}
          <section className="py-24 bg-mesia-cream">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="border-2 border-red-700/30 bg-red-50 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-red-800 font-greek text-center mb-8 flex items-center justify-center">
                  <Shield className="h-7 w-7 mr-3" />
                  Αριθμοί Έκτακτης Ανάγκης
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold font-mono text-red-800 mb-1">100</div>
                    <div className="text-sm text-red-800/80">Αστυνομία</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-mono text-red-800 mb-1">199</div>
                    <div className="text-sm text-red-800/80">Πυροσβεστική</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-mono text-red-800 mb-1">166</div>
                    <div className="text-sm text-red-800/80">Ιατρική Βοήθεια</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-mono text-red-800 mb-1">112</div>
                    <div className="text-sm text-red-800/80">Ευρωπαϊκός Αριθμός</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
