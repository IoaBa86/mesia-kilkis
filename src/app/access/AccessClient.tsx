// src/app/access/AccessClient.tsx - Client Component
'use client'
import {
  Car,
  Bus,
  Plane,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Lightbulb,
  Route
} from "lucide-react"
import MapComponent from '@/components/maps/GoogleMap'
import PageHero from '@/components/site/PageHero'
import SectionHeading from '@/components/site/SectionHeading'
import CoordinateStamp from '@/components/site/CoordinateStamp'
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export default function AccessClient() {
  const accessMethods = [
    {
      icon: Car,
      title: "Με Αυτοκίνητο",
      routes: [
        {
          from: "Από Θεσσαλονίκη",
          description: "Ακολουθήστε την Εθνική Οδό Θεσσαλονίκης-Ευζώνων (Ε75/Α1) προς βορρά. Πάρτε την έξοδο για Πολύκαστρο και συνεχίστε νότια για 17 χλμ.",
          distance: "~95 χλμ",
          time: "~1 ώρα 20 λεπτά"
        },
        {
          from: "Από Πολύκαστρο",
          description: "17 χλμ νότια του Πολυκάστρου μέσω της επαρχιακής οδού. Ακολουθήστε τις πινακίδες προς Ευρωπό-Μεσιά.",
          distance: "17 χλμ",
          time: "~20 λεπτά"
        },
        {
          from: "Από Γουμένισσα",
          description: "19 χλμ νοτιοδυτικά μέσω Στάθη. Διέλευση από γραφικά χωριά της περιοχής.",
          distance: "19 χλμ",
          time: "~25 λεπτά"
        }
      ]
    },
    {
      icon: Bus,
      title: "Με Λεωφορείο",
      info: {
        provider: "ΚΤΕΛ Κιλκίς",
        description: "Δρομολόγια από Θεσσαλονίκη προς Πολύκαστρο και στη συνέχεια τοπικό δρομολόγιο προς Μεσιά.",
        phones: ["23430-22315", "2310-595433"],
        schedule: "Καθημερινά δρομολόγια (ελέγξτε τα ωράρια)"
      }
    },
    {
      icon: Plane,
      title: "Από Αεροδρόμια",
      airports: [
        {
          name: "\"Μακεδονία\" (SKG)",
          distance: "~90 χλμ",
          time: "~1 ώρα 15 λεπτά",
          method: "Ενοικίαση αυτοκινήτου ή ταξί"
        },
        {
          name: "Σκόπια (SKP)",
          distance: "~85 χλμ",
          time: "~1 ώρα 30 λεπτά",
          method: "Μέσω Ευζώνων-Πολυκάστρου"
        }
      ]
    }
  ]

  const tips = [
    "Η κίνηση είναι μειωμένη, ιδανικό για ήρεμη οδήγηση",
    "Υπάρχουν χώροι στάθμευσης στο κέντρο του χωριού",
    "Για ενημέρωση δρομολογίων ΚΤΕΛ καλέστε πριν την αναχώρηση",
    "Το χωριό είναι κατάλληλο για ποδηλασία και πεζοπορία"
  ]

  return (
    <div className="bg-mesia-cream min-h-screen">
      <PageHero
        icon={Navigation}
        title="Πώς να Έρθετε"
        description="Αναλυτικές οδηγίες για την πρόσβαση στο παραδοσιακό χωριό Μεσιά Κιλκίς."
        stamp="40.88250 · 22.57639"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Access Methods */}
        <div className="space-y-16">
          {accessMethods.map((method, index) => (
            <section key={index}>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-mesia-wine/20 bg-white text-mesia-wine">
                  <method.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-mesia-wine font-greek">
                  {method.title}
                </h2>
              </div>

              {/* Car Routes */}
              {method.routes && (
                <div className="divide-y divide-mesia-gold/25 border-t border-b border-mesia-gold/25">
                  {method.routes.map((route, routeIndex) => (
                    <div key={routeIndex} className="py-6">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h3 className="text-lg font-bold text-mesia-wine font-greek">
                          {route.from}
                        </h3>
                        <div className="flex gap-4 font-mono text-xs uppercase tracking-wide text-mesia-lightText">
                          <div className="flex items-center gap-1.5">
                            <Route className="h-3.5 w-3.5" />
                            <span>{route.distance}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{route.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-mesia-darkText/90 leading-relaxed">
                        {route.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bus Info */}
              {method.info && (
                <div className="border border-mesia-gold/25 bg-white p-6">
                  <h3 className="text-lg font-bold text-mesia-wine font-greek mb-3">
                    {method.info.provider}
                  </h3>
                  <p className="text-mesia-darkText/90 leading-relaxed mb-5">
                    {method.info.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-mesia-gold" />
                      <span className="font-medium text-mesia-wine">Τηλ. Πληροφοριών:</span>
                    </div>
                    <div className="space-y-1 font-mono">
                      {method.info.phones.map((phone, phoneIndex) => (
                        <a key={phoneIndex} href={`tel:${phone}`} className="block text-mesia-wine hover:text-mesia-gold transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-mesia-gold/25">
                    <p className="text-mesia-wine text-sm">
                      <strong>Συχνότητα:</strong> {method.info.schedule}
                    </p>
                  </div>
                </div>
              )}

              {/* Airport Info */}
              {method.airports && (
                <div className="divide-y divide-mesia-gold/25 border-t border-b border-mesia-gold/25">
                  {method.airports.map((airport, airportIndex) => (
                    <div key={airportIndex} className="py-6">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <h3 className="text-lg font-bold text-mesia-wine font-greek">
                          {airport.name}
                        </h3>
                        <div className="flex gap-4 font-mono text-xs uppercase tracking-wide text-mesia-lightText">
                          <div className="flex items-center gap-1.5">
                            <Route className="h-3.5 w-3.5" />
                            <span>{airport.distance}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{airport.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-mesia-darkText/90">
                        {airport.method}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* GPS Coordinates with Interactive Map */}
        <section className="mt-20">
          <SectionHeading eyebrow="Χάρτης" title="Χάρτης Πρόσβασης" align="left" />

          <div className="mb-6 border border-mesia-gold/25">
            <MapComponent lat={40.88250} lng={22.57639} zoom={15} />
          </div>

          <div className="border border-mesia-gold/25 bg-white p-8 text-center mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-mesia-wine/50 mb-4">
              GPS Συντεταγμένες
            </p>
            <div className="flex justify-center mb-4">
              <CoordinateStamp tone="dark">40.88250, 22.57639</CoordinateStamp>
            </div>
            <p className="text-mesia-lightText text-sm">
              Αντιγράψτε τις συντεταγμένες στην εφαρμογή χαρτών σας
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=40.88250,22.57639`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 bg-mesia-wine text-white hover:bg-mesia-wine/90 transition-colors"
            >
              <Navigation className="h-5 w-5" />
              <span>Οδηγίες στο Google Maps</span>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('40.88250, 22.57639')
                  .then(() => alert('Οι συντεταγμένες αντιγράφηκαν!'))
                  .catch(() => alert('Σφάλμα αντιγραφής'))
              }}
              className="flex items-center justify-center gap-2 p-4 border-2 border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white transition-colors"
            >
              <MapPin className="h-5 w-5" />
              <span>Αντιγραφή Συντεταγμένων</span>
            </button>
          </div>
        </section>

        <ResponsiveAdSlot slotKey="access-ad-1" />

        {/* Tips Section */}
        <section className="mt-20">
          <SectionHeading eyebrow="Καλή διαδρομή" title="Χρήσιμες Συμβουλές" align="left" />
          <div className="grid md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-4 border border-mesia-gold/25 bg-white p-5">
                <Lightbulb className="h-5 w-5 text-mesia-gold flex-shrink-0 mt-0.5" />
                <p className="text-mesia-darkText/90 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
