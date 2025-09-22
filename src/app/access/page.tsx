// src/app/village/access/page.tsx - Fixed and complete
'use client'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import MapComponent from '@/components/maps/GoogleMap' // ADD THIS IMPORT



export default function VillageAccessPage() {
  const accessMethods = [
    {
      icon: Car,
      title: "Με Αυτοκίνητο",
      color: "from-mesia-wine to-mesia-wine/80",
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
      color: "from-mesia-gold to-mesia-accent",
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
      color: "from-mesia-wine to-mesia-gold",
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
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mb-6">
            <Navigation className="h-16 w-16 text-mesia-gold mx-auto mb-6" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
            Πώς να Έρθετε
          </h1>
          <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
            Αναλυτικές οδηγίες για την πρόσβαση στο παραδοσιακό χωριό Μεσιά Κιλκίς
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Access Methods */}
        <div className="space-y-12">
          {accessMethods.map((method, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl overflow-hidden">
              <CardHeader className="relative">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${method.color} text-white shadow-lg`}>
                    <method.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                    {method.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Car Routes */}
                {method.routes && (
                  <div className="space-y-4">
                    {method.routes.map((route, routeIndex) => (
                      <div key={routeIndex} className="bg-mesia-lightCream/30 rounded-xl p-6 border border-mesia-gold/20">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-mesia-wine font-greek">
                            {route.from}
                          </h3>
                          <div className="flex space-x-4 text-sm text-mesia-lightText">
                            <div className="flex items-center space-x-1">
                              <Route className="h-4 w-4" />
                              <span>{route.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{route.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-mesia-darkText leading-relaxed">
                          {route.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bus Info */}
                {method.info && (
                  <div className="bg-mesia-lightCream/30 rounded-xl p-6 border border-mesia-gold/20">
                    <h3 className="text-xl font-bold text-mesia-wine font-greek mb-4">
                      {method.info.provider}
                    </h3>
                    <p className="text-mesia-darkText leading-relaxed mb-4">
                      {method.info.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-mesia-wine" />
                        <span className="font-medium text-mesia-wine">Τηλ. Πληροφοριών:</span>
                      </div>
                      <div className="space-y-1">
                        {method.info.phones.map((phone, phoneIndex) => (
                          <a key={phoneIndex} href={`tel:${phone}`} className="block text-mesia-wine hover:text-mesia-gold transition-colors">
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-mesia-gold/10 rounded-lg">
                      <p className="text-mesia-wine font-medium">
                        <strong>Συχνότητα:</strong> {method.info.schedule}
                      </p>
                    </div>
                  </div>
                )}

                {/* Airport Info */}
                {method.airports && (
                  <div className="space-y-4">
                    {method.airports.map((airport, airportIndex) => (
                      <div key={airportIndex} className="bg-mesia-lightCream/30 rounded-xl p-6 border border-mesia-gold/20">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-mesia-wine font-greek">
                            {airport.name}
                          </h3>
                          <div className="flex space-x-4 text-sm text-mesia-lightText">
                            <div className="flex items-center space-x-1">
                              <Route className="h-4 w-4" />
                              <span>{airport.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{airport.time}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-mesia-darkText">
                          {airport.method}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GPS Coordinates with Interactive Map */}
        <Card className="mt-16 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-mesia-wine to-mesia-gold text-white shadow-lg">
                <MapPin className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                Χάρτης Πρόσβασης
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Interactive Google Map */}
            <div className="mb-6">
              <MapComponent lat={40.88250} lng={22.57639} zoom={15} />
            </div>
            
            {/* GPS Coordinates */}
            <div className="bg-mesia-lightCream/30 rounded-xl p-8 border border-mesia-gold/20 text-center">
              <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-4">
                GPS Συντεταγμένες
              </h3>
              <div className="text-3xl font-mono font-bold text-mesia-wine mb-2">
                40.88250, 22.57639
              </div>
              <p className="text-mesia-lightText">
                Αντιγράψτε τις συντεταγμένες στην εφαρμογή χαρτών σας
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=40.88250,22.57639`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 p-4 bg-mesia-wine text-white rounded-lg hover:bg-mesia-wine/90 transition-colors"
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
                className="flex items-center justify-center space-x-2 p-4 border-2 border-mesia-wine text-mesia-wine rounded-lg hover:bg-mesia-wine hover:text-white transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span>Αντιγραφή Συντεταγμένων</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-16 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
          <CardHeader>
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-mesia-gold to-mesia-accent text-white shadow-lg">
                <Lightbulb className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                Χρήσιμες Συμβουλές
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-mesia-lightCream/30 rounded-lg border border-mesia-gold/20">
                  <div className="w-6 h-6 bg-mesia-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-mesia-darkText leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      
      </main>
    </div>
  )
}
