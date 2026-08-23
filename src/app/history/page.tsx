// src/app/history/page.tsx - Server Component with metadata + Client Component for posts
import { Metadata } from 'next'
import {
  History,
  Building,
  Church,
  MapPin,
  Crown,
  BookOpen,
} from "lucide-react"
import HistoricalPostsSection from '@/components/history/HistoricalPostsSection'
import PageHero from '@/components/site/PageHero'
import SectionHeading from '@/components/site/SectionHeading'
import FeatureCard from '@/components/site/FeatureCard'

export const metadata: Metadata = {
  title: 'Ιστορία - Μεσιά Κιλκίς',
  description: 'Η ιστορία του χωριού Μεσιά Κιλκίς από την Τουρκοκρατία μέχρι σήμερα. Ιστορικά μνημεία, σημαντικές ημερομηνίες και η εξέλιξη της κοινότητας.',
  alternates: {
    canonical: '/history',
  },
  openGraph: {
    title: 'Ιστορία - Μεσιά Κιλκίς',
    description: 'Ανακαλύψτε την πλούσια ιστορία του χωριού Μεσιά Κιλκίς από την Τουρκοκρατία μέχρι σήμερα',
  },
}

// Server Component (no "use client")
export default function HistoryPage() {
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
    },
    {
      title: "Ταφικός Τύμβος Μεσιάς",
      period: "4ος - 3ος αι. π.Χ.",
      description: "Σημαντικό μνημείο με διάμετρο 32 μέτρα και ύψος 5 μέτρα, που αποδίδεται στον ύστερο 4ο ή 3ο αιώνα π.Χ. Ανακαλύφθηκε μνημειακός κιβωτιόσχημος τάφος με διακοσμήσεις στο εσωτερικό μετά από σωστικές ανασκαφές το 2020.",
      icon: Building,
    },
    {
      title: "Αρχαιολογικός Χώρος «Τούμπας Παπάκιοϊ»",
      period: "Προϊστορική εποχή",
      description: "Στην ευρύτερη περιοχή βρίσκεται ομώνυμος αρχαιολογικός χώρος που μαρτυρεί την παρουσία ανθρώπινων δραστηριοτήτων από αρχαιότατους χρόνους.",
      icon: MapPin,
    }
  ]

  return (
    <div className="bg-mesia-cream">
      <main>
        <PageHero
          icon={History}
          eyebrow="Από το Μπαλμπά Κιόϊ ως τη Μεσιά"
          title="Ιστορία"
          description="Ανακαλύψτε την πλούσια ιστορία του χωριού μας από την Τουρκοκρατία μέχρι σήμερα."
        />

        {/* Turkish Rule Period */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-mesia-gold/25 p-8 md:p-10">
              <div className="flex items-center mb-4">
                <Crown className="h-6 w-6 text-mesia-gold mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-mesia-wine font-greek">
                  Τουρκοκρατία
                </h2>
              </div>
              <p className="text-lg text-mesia-darkText/90 leading-relaxed">
                Η παλιά ονομασία του χωριού από την εποχή της τουρκοκρατίας είναι{' '}
                <strong className="text-mesia-wine">«Μπαλμπά Κιόϊ»</strong>.
                Με αυτό το όνομα αναφέρεται στα επίσημα έγγραφα μετά την απελευθέρωση
                της περιοχής από τον οθωμανικό ζυγό.
              </p>
            </div>
          </div>
        </section>

        {/* 20th Century Timeline */}
        <section className="py-20 bg-mesia-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Χρονολόγιο"
              title="20ός Αιώνας — Σημαντικές Ημερομηνίες"
              description="Οι σημαντικότερες στιγμές στη σύγχρονη ιστορία του χωριού μας."
            />

            <div className="divide-y divide-mesia-gold/25 border-t border-b border-mesia-gold/25">
              {importantDates.map((date, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-6 py-8">
                  <div className="font-mono text-3xl font-bold text-mesia-wine sm:w-32 flex-shrink-0">
                    {date.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-mesia-wine font-greek mb-2">
                      {date.event}
                    </h3>
                    <p className="text-mesia-darkText/90 leading-relaxed">
                      {date.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical Monuments */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Πολιτιστική Κληρονομιά"
              title="Ιστορικά Μνημεία"
              description="Αρχιτεκτονικοί θησαυροί και αρχαιολογικά ευρήματα που αφηγούνται την ιστορία μας."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {monuments.map((monument, index) => (
                <FeatureCard
                  key={index}
                  icon={monument.icon}
                  tag={monument.period}
                  title={monument.title}
                  description={monument.description}
                />
              ))}
            </div>

            <HistoricalPostsSection />
          </div>
        </section>

        {/* Modern Era */}
        <section className="py-20 bg-mesia-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-mesia-gold/25 bg-white p-8 md:p-10">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-mesia-gold mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-mesia-wine font-greek">
                  Σύγχρονη Εποχή
                </h2>
              </div>
              <div className="text-lg text-mesia-darkText/90 leading-relaxed space-y-5">
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
                <p className="font-mono text-sm uppercase tracking-[0.1em] text-mesia-wine border-t border-mesia-gold/25 pt-6 mt-6 text-center">
                  «Από το Μπαλμπά Κιόϊ στη σύγχρονη Μεσιά — μια διαδρομή αιώνων που συνεχίζεται»
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
