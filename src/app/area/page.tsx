// src/app/area/page.tsx
import { Metadata } from 'next'
import {
  MapPin,
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
import PageHero from '@/components/site/PageHero'
import SectionHeading from '@/components/site/SectionHeading'
import FeatureCard from '@/components/site/FeatureCard'
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export const metadata: Metadata = {
  title: 'Η Περιοχή γύρω από τη Μεσιά - Ευρωπός, Κιλκίς',
  description: 'Η Μεσιά (Mesia) γειτονεύει με τον Ευρωπό και τον Άγιο Πέτρο, στην Περιφερειακή Ενότητα Κιλκίς. Γεωγραφία, γειτονικά χωριά, φυσικό περιβάλλον, ιστορικά μνημεία και δραστηριότητες.',
  keywords: ['Μεσιά', 'Mesia', 'Κιλκίς', 'Ευρωπός', 'Άγιος Πέτρος', 'Πολύκαστρο', 'Γουμένισσα', 'Παιονία'],
  alternates: {
    canonical: '/area',
  },
  openGraph: {
    title: 'Η Περιοχή γύρω από τη Μεσιά - Ευρωπός, Κιλκίς',
    description: 'Ανακαλύψτε τη γεωγραφία, τα γειτονικά χωριά (Ευρωπός, Άγιος Πέτρος) και τις φυσικές ομορφιές γύρω από τη Μεσιά Κιλκίς',
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
    <div className="min-h-screen bg-mesia-cream">
      <main>
        <PageHero
          icon={MapPin}
          eyebrow="Ανάμεσα στον Ευρωπό και τον Άγιο Πέτρο"
          title="Η Περιοχή"
          description="Ανακαλύψτε την πλούσια γεωγραφία, ιστορία και φυσικές ομορφιές γύρω από τη Μεσιά"
        />

        {/* Geography Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-mesia-gold/30 bg-mesia-cream p-8 md:p-10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-mesia-gold mr-3" />
                <h2 className="text-2xl font-bold text-mesia-wine font-greek">
                  Γεωγραφία & Διοικητική Υπαγωγή
                </h2>
              </div>
              <div className="text-lg text-mesia-darkText/90 leading-relaxed space-y-4">
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
              </div>
            </div>
          </div>
        </section>

        {/* Neighboring Villages */}
        <section className="py-24 bg-mesia-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Γειτονικά Χωριά"
              description="Τα χωριά που περιβάλλουν τη Μεσιά και συνθέτουν την ευρύτερη περιοχή"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {neighboringVillages.map((village, index) => (
                <FeatureCard
                  key={index}
                  icon={village.icon}
                  title={village.name}
                  tag={village.direction}
                  description={village.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Natural Environment */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Φυσικό Περιβάλλον"
              title="Φυσικές Ομορφιές"
              description="Η περιοχή μας προσφέρει μοναδικά φυσικά τοπία και οικοσυστήματα"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {naturalEnvironment.map((item, index) => (
                <div key={index} className="border border-mesia-gold/25 bg-mesia-cream p-8 text-center hover:border-mesia-wine/40 transition-colors duration-300">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-mesia-wine font-greek mb-3">
                    {item.title}
                  </h3>
                  <p className="text-mesia-darkText/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* History & Monuments */}
        <section className="py-24 bg-mesia-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Πολιτιστική Κληρονομιά"
              title="Ιστορία & Μνημεία Περιοχής"
              description="Χιλιάδες χρόνια ιστορίας αποτυπωμένα σε αρχαιολογικούς χώρους και μνημεία"
            />

            <div className="space-y-4">
              {historicalSites.map((site, index) => (
                <div key={index} className="border border-mesia-gold/25 bg-white p-8 hover:border-mesia-wine/40 transition-colors duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center border border-mesia-wine/20 bg-mesia-cream text-mesia-wine">
                      <Church className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <h3 className="text-xl font-bold text-mesia-wine font-greek">
                          {site.title}
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-[0.1em] text-mesia-wine/60 border border-mesia-gold/30 px-3 py-1">
                          {site.period}
                        </span>
                      </div>
                      <p className="text-mesia-darkText/80 leading-relaxed">
                        {site.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ResponsiveAdSlot slotKey="area-ad-1" />

        {/* Activities */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Δραστηριότητες"
              description="Απολαύστε την περιοχή μας με ποικίλες δραστηριότητες στη φύση"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Πεζοπορία", description: "Πολλές δυνατότητες για πεζοπορία στο Παϊκό και παραποτάμιες διαδρομές.", icon: Footprints },
                { title: "Ποδηλασία", description: "Ήρεμοι δρόμοι και πεδινά τοπία ιδανικά για ποδηλασία.", icon: Bike },
                { title: "Αρχαιολογία", description: "Εξερεύνηση αρχαιολογικών και ιστορικών σημείων στην περιοχή.", icon: Camera }
              ].map((activity, index) => (
                <FeatureCard
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  description={activity.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Local Products */}
        <section className="py-24 bg-mesia-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Τοπική Παραγωγή"
              title="Τοπικά Προϊόντα"
              description="Φρέσκα και παραδοσιακά προϊόντα από τη γη και τη φύση της περιοχής μας"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-mesia-gold/25 bg-white p-8">
                <h3 className="text-xl font-bold text-mesia-wine font-greek mb-5 flex items-center">
                  <span className="text-2xl mr-3">🌾</span>
                  Αγροτικά Προϊόντα
                </h3>
                <ul className="space-y-2.5 text-mesia-darkText/90">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Σιτηρά και δημητριακά</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Βαμβάκι</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Κηπευτικά</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Παραδοσιακά λαχανικά</li>
                </ul>
              </div>

              <div className="border border-mesia-gold/25 bg-white p-8">
                <h3 className="text-xl font-bold text-mesia-wine font-greek mb-5 flex items-center">
                  <span className="text-2xl mr-3">🐄</span>
                  Κτηνοτροφία
                </h3>
                <ul className="space-y-2.5 text-mesia-darkText/90">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Τοπικό μέλι</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Παραδοσιακά τυριά</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Αγνό γάλα</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 bg-mesia-gold mr-3"></span>Οικόσιτα αυγά</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Attractions */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Αξιοθέατα στην περιοχή Κιλκίς"
              description="Ιδανικά για εκδρομές, φυσιολατρία και περιήγηση σε όλο τον νομό Κιλκίς"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {attractions.map((attraction, index) => (
                <div key={index} className="flex items-center border border-mesia-gold/25 bg-mesia-cream px-6 py-4 hover:border-mesia-wine/40 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-mesia-gold mr-4 flex-shrink-0"></div>
                  <span className="text-mesia-darkText font-medium">{attraction}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
