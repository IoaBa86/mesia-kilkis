// src/app/area/page.tsx
import { Metadata } from 'next'
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Mountain, 
  TreePine,
  Camera,
  Church,
  Tractor,
  Bike,
  Footprints,
  Building,
  Home,
  Globe
} from "lucide-react"

export const metadata: Metadata = {
  title: 'Η Περιοχή - Μεσιά Κιλκίς',
  description: 'Γεωγραφία, γειτονικά χωριά, φυσικό περιβάλλον, ιστορικά μνημεία και δραστηριότητες στην περιοχή της Μεσιάς Κιλκίς.',
  alternates: {
    canonical: '/area', // ✅ Add this line
  },
  openGraph: {
    title: 'Η Περιοχή - Μεσιά Κιλκίς',
    description: 'Ανακαλύψτε την πλούσια γεωγραφία, ιστορία και φυσικές ομορφιές της περιοχής Μεσιά Κιλκίς',
    images: ['/og-image.jpg'],
  },
}


export default function AreaPage() {
  const neighboringVillages = [
    {
      name: "Ευρωπός",
      direction: "Βορειοδυτικά της Μεσιάς",
      description: "Μεγαλύτερο χωριό με διοικητικές υποδομές και ιστορικές αναφορές ως σημαντική μακεδονική πόλη στην αρχαιότητα.",
      icon: Building
    },
    {
      name: "Άγιος Πέτρος", 
      direction: "Νότια της Μεσιάς",
      description: "Παραδοσιακό μακεδονικό χωριό με ιστορική ταυτότητα. Προηγουμένως γνωστό ως Πέτροβο.",
      icon: Church
    },
    {
      name: "Πολύκαστρο",
      direction: "17 χλμ βόρεια", 
      description: "Έδρα του Δήμου Παιονίας. Κεντρικές υπηρεσίες, νοσοκομείο, σχολεία.",
      icon: Home
    },
    {
      name: "Γουμένισσα",
      direction: "19 χλμ ΒΑ",
      description: "Φημισμένη για οινοποιία, φυσικό τοπίο & παραδοσιακά προϊόντα.",
      icon: Globe
    }
  ]

  const naturalEnvironment = [
    {
      title: "Αξιός Ποταμός",
      description: "Ο Αξιός ποταμός, που ρέει ανατολικά της Μεσιάς, αποτελεί σημαντικό υδροβιότοπο και πηγή άρδευσης για την περιοχή. Διαμορφώνει πλούσια οικοσυστήματα και παραποτάμιες εκτάσεις.",
      icon: "🛶"
    },
    {
      title: "Παϊκό Όρος", 
      description: "Το Παϊκό όρος αποτελεί το φυσικό ανατολικό όριο, κατάλληλο για δραστηριότητες στη φύση και πεζοπορία με υπέροχη θέα στη μακεδονική πεδιάδα.",
      icon: "⛰️"
    },
    {
      title: "Γαλάζια Λίμνη Σκρα",
description: "Σε κοντινή απόσταση βρίσκεται η Γαλάζια Λίμνη του Σκρα, ένα φυσικό θαύμα με διάφανα γαλάζια νερά και καταπράσινη βλάστηση.",
icon: "🏞️"
    }
  ]

  const historicalSites = [
    {
      title: "Τοποθεσία «Τούμπας Παπάκιοϊ»",
      description: "Αρχαιολογικός χώρος σημαντικός που δείχνει ανθρώπινη παρουσία από την προϊστορική εποχή.",
      period: "Προϊστορική εποχή"
    },
    {
      title: "Ταφικός τύμβος Μεσιάς", 
      description: "Ένα από τα σημαντικότερα ταφικά μνημεία της υπαίθρου της αρχαίας Ευρωπού με δύο μνημειακούς τάφους.",
      period: "4ος αι. π.Χ."
    },
    {
      title: "Ναός Αγ. Κωνσταντίνου & Ελένης",
      description: "Αναδιασκευασμένος οθωμανικός τουρμπές (15ος αιώνας). Μετατράπηκε σε χριστιανικό ναό το 1930 από Μικρασιάτες πρόσφυγες.",
      period: "15ος αιώνας - 1930"
    }
  ]

  const attractions = [
    "Σπήλαιο Αγίου Γεωργίου Κιλκίς",
    "Αρχαιολογικό Μουσείο Κιλκίς", 
    "Βοτανικός Κήπος Κρουσσίων",
    "Καταρράκτες και Γαλάζια Λίμνη στο Σκρα"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">


      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="mb-6">
              <MapPin className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-float" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
              Η Περιοχή
            </h2>
            <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
              Ανακαλύψτε την πλούσια γεωγραφία, ιστορία και φυσικές ομορφιές της περιοχής μας
            </p>
          </div>
        </section>

        {/* Geography Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-mesia-gold mr-3" />
                  <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                    Γεωγραφία & Διοικητική Υπαγωγή
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-lg text-mesia-darkText leading-relaxed space-y-4">
                <p>
                  Η <strong className="text-mesia-wine">Μεσιά</strong> είναι πεδινό χωριό της Κεντρικής Μακεδονίας, 
                  στην περιφερειακή ενότητα Κιλκίς. Βρίσκεται δυτικά του ποταμού Αξιού, μεταξύ των χωριών 
                  Ευρωπός και Άγιος Πέτρος, και απέχει 17 χλμ. νότια από το Πολύκαστρο – διοικητική έδρα –, 
                  ενώ απέχει περίπου 19 χλμ. από τη Γουμένισσα.
                </p>
                <p>
                  Το υψόμετρο κυμαίνεται στα <span className="text-mesia-wine font-semibold">30-36μ</span>. 
                  Είναι τοπική κοινότητα του <span className="text-mesia-wine font-semibold">Δήμου Παιονίας</span> 
                  και υπάγεται στη δημοτική ενότητα Ευρωπού.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Neighboring Villages */}
        <section className="py-16 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Γειτονικά Χωριά
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Τα χωριά που περιβάλλουν τη Μεσιά και συνθέτουν την ευρύτερη περιοχή
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {neighboringVillages.map((village, index) => (
                <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-br from-mesia-wine to-mesia-gold p-3 rounded-xl mr-4 shadow-lg text-white">
                        <village.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-mesia-wine font-greek">
                          {village.name}
                        </CardTitle>
                        <CardDescription className="text-mesia-gold font-medium">
                          {village.direction}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-mesia-darkText leading-relaxed">
                      {village.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Natural Environment */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                <TreePine className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Φυσικό Περιβάλλον</span>
              </div>
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Φυσικές Ομορφιές
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Η περιοχή μας προσφέρει μοναδικά φυσικά τοπία και οικοσυστήματα
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {naturalEnvironment.map((item, index) => (
                <Card key={index} className="group hover:scale-105 transition-all duration-500 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl text-center">
                  <CardHeader>
                    <div className="text-6xl mb-4">{item.icon}</div>
                    <CardTitle className="text-xl font-bold text-mesia-wine font-greek">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-mesia-darkText leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* History & Monuments */}
        <section className="py-16 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                <Church className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Πολιτιστική Κληρονομιά</span>
              </div>
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Ιστορία & Μνημεία Περιοχής
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Χιλιάδες χρόνια ιστορίας αποτυπωμένα σε αρχαιολογικούς χώρους και μνημεία
              </p>
            </header>

            <div className="space-y-8">
              {historicalSites.map((site, index) => (
                <Card key={index} className="group hover:scale-102 transition-all duration-300 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-mesia-wine to-mesia-gold p-4 rounded-2xl shadow-lg text-white flex-shrink-0">
                        <Church className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-mesia-wine font-greek">
                            {site.title}
                          </h3>
                          <span className="px-3 py-1 bg-mesia-gold/20 text-mesia-wine rounded-full text-sm font-medium">
                            {site.period}
                          </span>
                        </div>
                        <p className="text-lg text-mesia-darkText leading-relaxed">
                          {site.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Δραστηριότητες
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Απολαύστε την περιοχή μας με ποικίλες δραστηριότητες στη φύση
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Πεζοπορία", description: "Πολλές δυνατότητες για πεζοπορία στο Παϊκό και παραποτάμιες διαδρομές.", icon: Footprints },
                { title: "Ποδηλασία", description: "Ήρεμοι δρόμοι και πεδινά τοπία ιδανικά για ποδηλασία.", icon: Bike },
                { title: "Αρχαιολογία", description: "Εξερεύνηση αρχαιολογικών και ιστορικών σημείων στην περιοχή.", icon: Camera }
              ].map((activity, index) => (
                <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl text-center">
                  <CardHeader>
                    <div className="bg-gradient-to-br from-mesia-wine to-mesia-gold p-4 rounded-2xl mx-auto w-fit mb-4 shadow-lg text-white">
                      <activity.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold text-mesia-wine font-greek">
                      {activity.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-mesia-darkText leading-relaxed">
                      {activity.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Local Products */}
        <section className="py-16 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                <Tractor className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Τοπική Παραγωγή</span>
              </div>
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Τοπικά Προϊόντα
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Φρέσκα και παραδοσιακά προϊόντα από τη γη και τη φύση της περιοχής μας
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-mesia-wine font-greek flex items-center">
                    <span className="text-3xl mr-3">🌾</span>
                    Αγροτικά Προϊόντα
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-mesia-darkText">
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Σιτηρά και δημητριακά</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Βαμβάκι</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Κηπευτικά</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Παραδοσιακά λαχανικά</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-mesia-wine font-greek flex items-center">
                    <span className="text-3xl mr-3">🐄</span>
                    Κτηνοτροφία
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-mesia-darkText">
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Τοπικό μέλι</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Παραδοσιακά τυριά</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Αγνό γάλα</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-mesia-gold rounded-full mr-3"></span>Οικόσιτα αυγά</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Regional Attractions */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Αξιοθέατα στην περιοχή Κιλκίς
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Ιδανικά για εκδρομές, φυσιολατρία και περιήγηση σε όλο τον νομό Κιλκίς
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attractions.map((attraction, index) => (
                <Card key={index} className="group hover:scale-102 transition-all duration-300 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-lg hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-mesia-wine to-mesia-gold rounded-full mr-4"></div>
                      <span className="text-lg text-mesia-darkText font-medium">{attraction}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>


    </div>
  )
}
