import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  MapPin, Users, Building, Home, Mail, Camera,
  Church, Mountain, Globe
} from 'lucide-react'
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'
import PageHero from '@/components/site/PageHero'
import SectionHeading from '@/components/site/SectionHeading'
import StatEntry from '@/components/site/StatEntry'
import FeatureCard from '@/components/site/FeatureCard'

export const metadata: Metadata = {
  title: 'Το Χωριό Μεσιά (Mesia) - Κιλκίς',
  description: 'Η Μεσιά (Mesia) είναι τοπική κοινότητα της δημοτικής ενότητας Ευρωπού, Δήμου Παιονίας, στην Περιφερειακή Ενότητα Κιλκίς. Γεωγραφική θέση, πληθυσμός, διοικητική υπαγωγή και αξιοθέατα.',
  keywords: ['Μεσιά', 'Mesia', 'Κιλκίς', 'Ευρωπός', 'Ευρωπού', 'Δήμος Παιονίας', 'τοπική κοινότητα'],
  alternates: {
    canonical: '/village',
  },
  openGraph: {
    title: 'Το Χωριό Μεσιά (Mesia) - Κιλκίς',
    description: 'Πλήρεις πληροφορίες για το παραδοσιακό χωριό Μεσιά Κιλκίς, δημοτική ενότητα Ευρωπού',
  },
}

export default function VillagePage() {
  const villageStats = [
    { icon: Users, code: 'ΠΛΗΘ.', value: '173', label: 'κάτοικοι (2021)' },
    { icon: Mountain, code: 'ΥΨΟΣ', value: '30μ', label: 'από τη θάλασσα' },
    { icon: Mail, code: 'Τ.Κ.', value: '61007', label: 'ταχυδρομικός κώδικας' },
    { icon: Globe, code: 'ΣΥΝΤ.', value: '40°52′57″N', label: '22°34′35″E' },
  ]

  const attractions = [
    {
      title: 'Εκκλησία Αγ. Κωνσταντίνου & Ελένης',
      description: 'Ιστορικό διατηρητέο μνημείο με ιδιαίτερο ενδιαφέρον.',
      icon: Church,
    },
    {
      title: 'Αρχαιολογικός Χώρος «Τούμπας Παπάκιοϊ»',
      description: 'Σημαντικός αρχαιολογικός χώρος στην ευρύτερη περιοχή.',
      icon: Building,
    },
    {
      title: 'Παραδοσιακή Αρχιτεκτονική',
      description: 'Παλιά σπίτια και δρόμοι με μακεδονικό χαρακτήρα.',
      icon: Home,
    },
  ]

  return (
    <div className="min-h-screen bg-mesia-cream">
      <main>
        <PageHero
          icon={Home}
          eyebrow="Πεδινό Χωριό"
          title="Το Χωριό"
          description="Ένα παραδοσιακό πεδινό χωριό της Κεντρικής Μακεδονίας με πλούσια ιστορία."
        />

        <ResponsiveAdSlot slotKey="village-ad-1" />

        {/* Statistics */}
        <section className="relative z-20 -mt-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {villageStats.map((stat, i) => (
                <StatEntry key={i} code={stat.code} icon={stat.icon} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        <ResponsiveAdSlot slotKey="village-ad-2" className="bg-white" />

        {/* Geographic Position */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-mesia-gold/30 bg-mesia-cream p-8 md:p-10">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-mesia-gold mr-3" />
                <h2 className="text-2xl font-bold text-mesia-wine font-greek">
                  Γεωγραφική Θέση
                </h2>
              </div>
              <div className="text-lg text-mesia-darkText/90 leading-relaxed space-y-4">
                <p>
                  Η <strong className="text-mesia-wine">Μεσιά</strong> είναι πεδινό χωριό της Κεντρικής Μακεδονίας
                  στην Περιφερειακή Ενότητα Κιλκίς με υψόμετρο <span className="text-mesia-wine font-semibold">30 μέτρα</span>.
                  Βρίσκεται δυτικά του Αξιού ποταμού, σε απόσταση <span className="text-mesia-wine font-semibold">17 χλμ.</span> νότια
                  από το Πολύκαστρο (έδρα του Δήμου) και <span className="text-mesia-wine font-semibold">19 χλμ.</span> νοτιοδυτικά
                  από τη Γουμένισσα.
                </p>
                <p>
                  Το χωριό βρίσκεται ανάμεσα στα χωριά <strong className="text-mesia-wine">Ευρωπό</strong> (βορειοδυτικά)
                  και τον <strong className="text-mesia-wine">Άγιο Πέτρο</strong> (νότια), σε στρατηγική θέση που το καθιστά
                  σημαντικό κόμβο της περιοχής.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Administrative Affiliation */}
        <section className="py-16 bg-mesia-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3 border border-mesia-gold/30 bg-white p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <Building className="h-6 w-6 text-mesia-gold mr-3" />
                  <h2 className="text-2xl font-bold text-mesia-wine font-greek">
                    Διοικητική Υπαγωγή
                  </h2>
                </div>
                <p className="text-lg text-mesia-darkText/90 leading-relaxed">
                  Σύμφωνα με το σχέδιο <strong className="text-mesia-wine">Καλλικράτης</strong>, η Μεσιά αποτελεί
                  την τοπική κοινότητα Μεσιάς που ανήκει στη δημοτική ενότητα Ευρωπού του
                  <strong className="text-mesia-wine"> Δήμου Παιονίας</strong>.
                </p>
              </div>

              <aside className="lg:col-span-2 border border-mesia-gold/30 bg-white p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-mesia-wine/50 mb-6">
                  Απογραφή Πληθυσμού
                </p>
                <div className="flex items-end justify-between border-b border-mesia-gold/30 pb-4 mb-4">
                  <span className="font-mono text-sm text-mesia-lightText">2011</span>
                  <span className="text-3xl font-bold text-mesia-wine font-mono">226</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="font-mono text-sm text-mesia-lightText">2021</span>
                  <span className="text-3xl font-bold text-mesia-wine font-mono">173</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Village Attractions */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Τοπικά Αξιοθέατα"
              title="Αξιοθέατα"
              description="Ανακαλύψτε τα σημαντικότερα αξιοθέατα και τα ιστορικά μνημεία του χωριού μας"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => (
                <FeatureCard
                  key={index}
                  icon={attraction.icon}
                  title={attraction.title}
                  description={attraction.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative overflow-hidden bg-mesia-wine py-20">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(250,247,240,0.7) 1px, transparent 1.5px)',
              backgroundSize: '22px 22px',
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Camera className="h-10 w-10 text-mesia-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white font-greek mb-6">
              Εξερευνήστε το Χωριό μας
            </h2>
            <p className="text-lg text-mesia-cream/90 mb-10 max-w-xl mx-auto">
              Δείτε φωτογραφίες, μάθετε για την ιστορία μας και ανακαλύψτε την ομορφιά της Μεσιάς
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="bg-mesia-gold text-mesia-wine hover:bg-mesia-cream px-8">
                <Link href="/photos" className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Δείτε Φωτογραφίες
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-mesia-cream/40 text-white hover:bg-white hover:text-mesia-wine px-8">
                <Link href="/history">Μάθετε την Ιστορία μας</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
