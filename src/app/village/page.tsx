import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin, Users, Building, Home, Mail, Camera,
  Church, Mountain, Globe
} from 'lucide-react'
import ResponsiveAdSlot from '@/components/ads/ResponsiveAdSlot'

export const metadata: Metadata = {
  title: 'Το Χωριό - Μεσιά Κιλκίς',
  description: 'Γεωγραφική θέση, πληθυσμός, διοικητική υπαγωγή και αξιοθέατα.',
  alternates: {
    canonical: '/village', // ✅ Add this line
  },
  openGraph: {
    title: 'Το Χωριό - Μεσιά Κιλκίς',
    description: 'Πλήρεις πληροφορίες για το παραδοσιακό χωριό Μεσιά Κιλκίς',
    images: ['/og-image.jpg'],
  },
}


export default function VillagePage() {
  const villageStats = [
    { icon: Users,    label: 'Πληθυσμός', value: '173', subtitle: 'κάτοικοι (2021)', color: 'wine' },
    { icon: Mountain, label: 'Υψόμετρο',  value: '30μ', subtitle: 'από τη θάλασσα',  color: 'gold' },
    { icon: Mail,     label: 'Τ.Κ.',      value: '61200', subtitle: 'ταχυδρομικός κώδικας', color: 'wine' },
    { icon: Globe,    label: 'Συντεταγμένες', value: '40°52′57″N', subtitle: '22°34′35″E',  color: 'gold' },
  ]

  const attractions = [
    {
      title: 'Εκκλησία Αγ. Κωνσταντίνου & Ελένης',
      description: 'Ιστορικό διατηρητέο μνημείο με ιδιαίτερο ενδιαφέρον.',
      icon: Church,
      color: 'from-mesia-wine to-mesia-wine/80',
    },
    {
      title: 'Αρχαιολογικός Χώρος “Τούμπας Παπάκιοϊ”',
      description: 'Σημαντικός αρχαιολογικός χώρος στην ευρύτερη περιοχή.',
      icon: Building,
      color: 'from-mesia-gold to-mesia-accent',
    },
    {
      title: 'Παραδοσιακή Αρχιτεκτονική',
      description: 'Παλιά σπίτια και δρόμοι με μακεδονικό χαρακτήρα.',
      icon: Home,
      color: 'from-mesia-wine to-mesia-gold',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      <main>
        {/* ─── Hero ────────────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <Home className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-float" />
            <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">Το Χωριό</h2>
            <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
              Ένα παραδοσιακό πεδινό χωριό της Κεντρικής Μακεδονίας με πλούσια ιστορία.
            </p>
          </div>
        </section>

        {/* ⭐ Ad #1 */}
        <ResponsiveAdSlot id="village-ad-1" />

        {/* ─── Statistics ─────────────────────────────────────────────── */}
        <section className="py-20 -mt-16 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {villageStats.map(({ icon: Icon, label, value, subtitle, color }, i) => (
                <Card key={i} className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                    color === 'wine' ? 'from-mesia-wine to-mesia-wine/80' : 'from-mesia-gold to-mesia-accent'
                  }`} />
                  <CardContent className="pt-8 text-center relative">
                    <Icon className={`h-8 w-8 mx-auto mb-4 ${color === 'wine' ? 'text-mesia-wine' : 'text-mesia-gold'}`} />
                    <div className={`text-3xl font-bold mb-2 ${color === 'wine' ? 'text-mesia-wine' : 'text-mesia-gold'}`}>{value}</div>
                    <p className="text-sm font-medium text-mesia-darkText mb-1">{label}</p>
                    <p className="text-xs text-mesia-lightText">{subtitle}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ⭐ Ad #2 */}
        <ResponsiveAdSlot id="village-ad-2" className="bg-white" />

        {/* Geographic Position */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <MapPin className="h-8 w-8 text-mesia-gold mr-3" />
                  <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                    Γεωγραφική Θέση
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-lg text-mesia-darkText leading-relaxed space-y-4">
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
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Administrative Affiliation */}
        <section className="py-16 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 text-mesia-gold mr-3" />
                  <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                    Διοικητική Υπαγωγή
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-lg text-mesia-darkText leading-relaxed space-y-4">
                <p>
                  Σύμφωνα με το σχέδιο <strong className="text-mesia-wine">Καλλικράτης</strong>, η Μεσιά αποτελεί 
                  την τοπική κοινότητα Μεσιάς που ανήκει στη δημοτική ενότητα Ευρωπού του 
                  <strong className="text-mesia-wine"> Δήμου Παιονίας</strong>.
                </p>
                <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-mesia-wine mb-2">Απογραφή 2011:</h4>
                      <p className="text-2xl font-bold text-mesia-wine">226 κάτοικοι</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-mesia-wine mb-2">Απογραφή 2021:</h4>
                      <p className="text-2xl font-bold text-mesia-wine">173 κάτοικοι</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Village Attractions */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                <Camera className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Τοπικά Αξιοθέατα</span>
              </div>
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Αξιοθέατα
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Ανακαλύψτε τα σημαντικότερα αξιοθέατα και τα ιστορικά μνημεία του χωριού μας
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {attractions.map((attraction, index) => (
                <Card key={index} className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                  <div className={`absolute inset-0 bg-gradient-to-br ${attraction.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardHeader className="text-center relative">
                    <div className={`bg-gradient-to-br ${attraction.color} p-4 rounded-2xl mx-auto w-fit mb-4 shadow-lg text-white`}>
                      <attraction.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl font-bold text-mesia-wine font-greek leading-tight">
                      {attraction.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-mesia-darkText leading-relaxed text-center">
                      {attraction.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-mesia-cream rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="mb-8">
              <Camera className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-float" />
            </div>
            <h2 className="text-4xl font-bold text-white font-greek mb-6">
              Εξερευνήστε το Χωριό μας
            </h2>
            <p className="text-xl text-mesia-cream mb-8 max-w-2xl mx-auto">
              Δείτε φωτογραφίες, μάθετε για την ιστορία μας και ανακαλύψτε την ομορφιά της Μεσιάς
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-mesia-gold to-mesia-accent text-mesia-wine hover:from-mesia-accent hover:to-mesia-gold transform hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-4"
                asChild
              >
                <Link href="/photos" className="flex items-center">
                  <Camera className="h-5 w-5 mr-2" />
                  Δείτε Φωτογραφίες
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-mesia-wine transform hover:scale-105 transition-all duration-300 backdrop-blur-sm px-8 py-4"
                asChild
              >
                <Link href="/history">
                  Μάθετε την Ιστορία μας
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

  
    </div>
  )
}
