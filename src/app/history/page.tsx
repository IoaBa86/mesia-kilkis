// src/app/history/page.tsx - Fixed: Server Component with metadata + Client Component for posts
import { Metadata } from 'next'
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  History, 
  Scroll, 
  Building, 
  Church,
  MapPin,
  Calendar,
  Crown,
  BookOpen,
  User,
  Eye
} from "lucide-react"
import HistoricalPostsSection from '@/components/history/HistoricalPostsSection'

// ✅ Metadata export works in Server Components
export const metadata: Metadata = {
  title: 'Ιστορία - Μεσιά Κιλκίς',
  description: 'Η ιστορία του χωριού Μεσιά Κιλκίς από την Τουρκοκρατία μέχρι σήμερα. Ιστορικά μνημεία, σημαντικές ημερομηνίες και η εξέλιξη της κοινότητας.',
  alternates: {
    canonical: '/history', // ✅ Add this line
  },
  openGraph: {
    title: 'Ιστορία - Μεσιά Κιλκίς',
    description: 'Ανακαλύψτε την πλούσια ιστορία του χωριού Μεσιά Κιλκίς από την Τουρκοκρατία μέχρι σήμερα',
    images: ['/og-image.jpg'],
  },
}

// ✅ Server Component (no "use client")
export default function HistoryPage() {
  // Your existing static data
  const importantDates = [
    {
      year: "1918",
      event: "Προσάρτηση στην κοινότητα Πετρόβου",
      description: "Στο ΦΕΚ 152Α - 09/07/1918 η περιοχή προσαρτάται στην τότε κοινότητα Πετρόβου (Άγιος Πέτρος) με το όνομα Μπαλμπά Κιόϊ."
    },
    {
      year: "1927", 
      event: "Επίσημη μετονομασία σε Μεσιά",
      description: "Με το ΦΕΚ 179Α - 30/08/1927 μετονομάστηκε επίσημα σε Μεσιά."
    },
    {
      year: "1949",
      event: "Ίδρυση της κοινότητας Μεσιάς",
      description: "Με το ΦΕΚ 193Α - 31/08/1949 ορίστηκε έδρα της ομώνυμης νεοϊδρυθείσας κοινότητας."
    }
  ]

  const monuments = [
    {
      title: "Εκκλησία Αγίου Κωνσταντίνου και Ελένης",
      period: "15ος - 16ος αιώνας",
      description: "Η εκκλησία του χωριού έχει κηρυχθεί ιστορικό διατηρητέο μνημείο λόγω του ιδιαίτερου αρχιτεκτονικού και ιστορικού της ενδιαφέροντος. Έχει ενσωματωθεί μουσουλμανικό τέμενος κτισμένο με μαρμάρινους δόμους σε Β' χρήση, που προέρχονται από αρχαίο κτήριο.",
      icon: Church,
      color: "from-mesia-wine to-mesia-wine/80"
    },
    {
      title: "Ταφικός Τύμβος Μεσιάς", 
      period: "4ος - 3ος αι. π.Χ.",
      description: "Σημαντικό μνημείο με διάμετρο 32 μέτρα και ύψος 5 μέτρα, που αποδίδεται στον ύστερο 4ο ή 3ο αιώνα π.Χ. Ανακαλύφθηκε μνημειακός κιβωτιόσχημος τάφος με διακοσμήσεις στο εσωτερικό μετά από σωστικές ανασκαφές το 2020.",
      icon: Building,
      color: "from-mesia-gold to-mesia-accent"
    },
    {
      title: "Αρχαιολογικός Χώρος «Τούμπας Παπάκιοϊ»",
      period: "Προϊστορική εποχή",
      description: "Στην ευρύτερη περιοχή βρίσκεται ομώνυμος αρχαιολογικός χώρος που μαρτυρεί την παρουσία ανθρώπινων δραστηριοτήτων από αρχαιότατους χρόνους.",
      icon: MapPin,
      color: "from-mesia-wine to-mesia-gold"
    }
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
              <History className="h-16 w-16 text-mesia-gold mx-auto mb-6" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
              Ιστορία
            </h2>
            <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
              Ανακαλύψτε την πλούσια ιστορία του χωριού μας από την Τουρκοκρατία μέχρι σήμερα
            </p>
          </div>
        </section>

        {/* Turkish Rule Period */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Crown className="h-8 w-8 text-mesia-gold mr-3" />
                  <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                    Τουρκοκρατία
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-lg text-mesia-darkText leading-relaxed">
                <p>
                  Η παλιά ονομασία του χωριού από την εποχή της τουρκοκρατίας είναι{' '}
                  <strong className="text-mesia-wine text-xl">«Μπαλμπά Κιόϊ»</strong>. 
                  Με αυτό το όνομα αναφέρεται στα επίσημα έγγραφα μετά την απελευθέρωση 
                  της περιοχής από τον οθωμανικό ζυγό.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 20th Century Timeline */}
        <section className="py-16 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Χρονολόγιο</span>
              </div>
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                20ός Αιώνας - Σημαντικές Ημερομηνίες
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Οι σημαντικότερες στιγμές στη σύγχρονη ιστορία του χωριού μας
              </p>
            </header>

            <div className="space-y-8">
              {importantDates.map((date, index) => (
                <Card key={index} className="group hover:scale-102 transition-all duration-300 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="bg-gradient-to-br from-mesia-wine to-mesia-gold p-6 rounded-2xl shadow-lg text-white flex-shrink-0 text-center min-w-[120px]">
                        <div className="text-3xl font-bold font-greek">{date.year}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-mesia-wine font-greek mb-4">
                          {date.event}
                        </h3>
                        <p className="text-lg text-mesia-darkText leading-relaxed">
                          {date.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Monuments - UPDATED SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                <Church className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Πολιτιστική Κληρονομιά</span>
              </div>
              <h2 className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                Ιστορικά Μνημεία
              </h2>
              <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                Αρχιτεκτονικοί θησαυροί και αρχαιολογικά ευρήματα που αφηγούνται την ιστορία μας
              </p>
            </header>

            {/* Your existing monuments */}
            <div className="space-y-8 mb-16">
              {monuments.map((monument, index) => (
                <Card key={index} className="group hover:scale-102 transition-all duration-500 bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${monument.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardContent className="p-8 relative">
                    <div className="flex items-start space-x-6">
                      <div className={`bg-gradient-to-br ${monument.color} p-4 rounded-2xl shadow-lg text-white flex-shrink-0`}>
                        <monument.icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-mesia-wine font-greek">
                            {monument.title}
                          </h3>
                          <span className="px-3 py-1 bg-mesia-gold/20 text-mesia-wine rounded-full text-sm font-medium">
                            {monument.period}
                          </span>
                        </div>
                        <p className="text-lg text-mesia-darkText leading-relaxed">
                          {monument.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* NEW: Client Component for Historical Posts */}
            <HistoricalPostsSection />
          </div>
        </section>

        {/* Modern Era */}
        <section className="py-16 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white/90 backdrop-blur-sm border border-mesia-gold/20 shadow-2xl">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-mesia-gold mr-3" />
                  <CardTitle className="text-3xl font-bold text-mesia-wine font-greek">
                    Σύγχρονη Εποχή
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-lg text-mesia-darkText leading-relaxed space-y-6">
                <p>
                  Σήμερα η <strong className="text-mesia-wine">Μεσιά</strong> αποτελεί μια ζωντανή κοινότητα 
                  που διατηρεί τον παραδοσιακό της χαρακτήρα ενώ παράλληλα προσαρμόζεται στις 
                  σύγχρονες ανάγκες.
                </p>
                <p>
                  Η κοινότητα συμμετέχει ενεργά στις εκδηλώσεις και τις δραστηριότητες του 
                  <strong className="text-mesia-wine"> Δήμου Παιονίας</strong>, διατηρώντας παράλληλα 
                  την ιδιαίτερη πολιτιστική της ταυτότητα και τις παραδόσεις που κληρονόμησε από τους προγόνους της.
                </p>
                <div className="bg-mesia-gold/10 p-6 rounded-lg border border-mesia-gold/30 mt-6">
                  <p className="text-mesia-wine font-medium text-center italic">
                    "Από το Μπαλμπά Κιόϊ στη σύγχρονη Μεσιά - μια διαδρομή αιώνων που συνεχίζεται"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
