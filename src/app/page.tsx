import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Users, Mountain, Compass, ArrowRight, Church, Landmark, Megaphone } from "lucide-react"
import StructuredData from "@/components/StructuredData"
import ResponsiveAdSlot from "@/components/ads/ResponsiveAdSlot"
import CoordinateStamp from "@/components/site/CoordinateStamp"
import SectionHeading from "@/components/site/SectionHeading"
import StatEntry from "@/components/site/StatEntry"
import FeatureCard from "@/components/site/FeatureCard"
import { prisma } from "@/lib/prisma"

// Without this the homepage (and its "latest news" strip) would be frozen
// at build time and only update on the next deploy.
export const revalidate = 300

async function getLatestEvent() {
  try {
    // Prefer a pinned announcement; otherwise the soonest upcoming event.
    const event = await prisma.event.findFirst({
      where: {
        isActive: true,
        OR: [{ isPinned: true }, { eventDate: { gte: new Date() } }],
      },
      orderBy: [{ isPinned: 'desc' }, { eventDate: 'asc' }],
      select: { id: true, title: true, eventDate: true },
    })
    return event
  } catch (error) {
    console.error('Error fetching latest event for homepage strip:', error)
    return null
  }
}

export default async function HomePage() {
  const latestEvent = await getLatestEvent()

  return (
    <>
      <StructuredData type="website" />
      <StructuredData type="organization" data={{ email: 'info@mesia.gr' }} />

      <div className="bg-mesia-cream">
        <main>
          {/* Latest news strip */}
          {latestEvent && (
            <Link
              href={`/events/${latestEvent.id}`}
              className="group flex items-center justify-center gap-3 bg-mesia-darkText text-mesia-cream px-4 py-2.5 text-sm hover:bg-mesia-wine transition-colors"
            >
              <Megaphone className="h-4 w-4 text-mesia-gold flex-shrink-0" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mesia-gold flex-shrink-0">Νέα</span>
              <span className="truncate">{latestEvent.title}</span>
              <span className="hidden sm:inline text-mesia-cream/60 flex-shrink-0">
                {new Date(latestEvent.eventDate).toLocaleDateString('el-GR', { day: 'numeric', month: 'long' })}
              </span>
              <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          )}

          {/* Hero */}
          <section className="relative overflow-hidden bg-mesia-wine pt-24 pb-32 md:pt-32 md:pb-40">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(250,247,240,0.7) 1px, transparent 1.5px)',
                backgroundSize: '26px 26px',
              }}
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 h-px bg-mesia-gold/30" aria-hidden="true" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-mesia-gold mb-6">
                Περιφερειακή Ενότητα Κιλκίς &middot; Κεντρική Μακεδονία
              </p>

              <h1 className="text-6xl md:text-8xl font-bold text-white font-greek leading-[0.95] mb-8">
                Μεσιά Κιλκίς
              </h1>

              <p className="text-lg md:text-2xl text-mesia-cream/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Πεδινό χωριό στη δυτική όχθη του Αξιού, με ρίζες που φτάνουν
                ως την προϊστορική εποχή.
              </p>

              <div className="flex justify-center mb-12">
                <CoordinateStamp tone="light">40°52′57″N &middot; 22°34′35″E</CoordinateStamp>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="bg-mesia-gold text-mesia-wine hover:bg-mesia-cream px-8">
                  <Link href="/photos" className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" aria-hidden="true" />
                    Δείτε Φωτογραφίες
                    <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-mesia-cream/40 text-white hover:bg-white hover:text-mesia-wine px-8">
                  <Link href="#about">Μάθετε Περισσότερα</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Stats ledger */}
          <section className="relative z-20 -mt-14" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Στατιστικά στοιχεία χωριού</h2>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4">
                <StatEntry code="ΠΛΗΘ." icon={Users} value="173" label="κάτοικοι (2021)" />
                <StatEntry code="ΥΨΟΣ" icon={Mountain} value="30 μ." label="υψόμετρο" />
                <StatEntry code="ΑΠΟΣΤ." icon={MapPin} value="17χλμ" label="από Πολύκαστρο" />
                <StatEntry code="ΣΥΝΤ." icon={Compass} value="40°52′N" label="22°34′E" />
              </div>
            </div>
          </section>

          <ResponsiveAdSlot slotKey="home-ad-1" className="mt-16" />

          {/* About */}
          <section id="about" className="py-24 bg-white scroll-mt-20" aria-labelledby="about-heading">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                <article className="lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-mesia-wine/50 mb-4">
                    Πού βρίσκεται
                  </p>
                  <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-mesia-wine font-greek leading-tight mb-8">
                    Ανάμεσα στον Αξιό <br className="hidden sm:block" />και το Παϊκό
                  </h2>

                  <div className="space-y-6 text-lg text-mesia-darkText/90 leading-relaxed">
                    <p>
                      Η <strong className="text-mesia-wine">Μεσιά</strong> είναι ένα χωριό της Κεντρικής Μακεδονίας
                      στην Περιφερειακή Ενότητα Κιλκίς. Με υψόμετρο 30 μέτρα από τη θάλασσα
                      και πληθυσμό 173 κατοίκους, απέχει 17 χιλιόμετρα από το Πολύκαστρο
                      και 19 χιλιόμετρα από τη Γουμένισσα.
                    </p>
                    <p>
                      Βρίσκεται δυτικά του <strong className="text-mesia-wine">Αξιού ποταμού</strong>,
                      σε μια περιοχή πλούσια σε ιστορία και φυσική ομορφιά.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-10">
                    <Button asChild>
                      <Link href="/photos" className="flex items-center">
                        Δείτε τις Φωτογραφίες μας
                        <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/services">Αριθμοί έκτακτης ανάγκης</Link>
                    </Button>
                  </div>
                </article>

                <aside className="lg:col-span-2">
                  <div className="border border-mesia-gold/30 bg-mesia-cream p-8 h-full">
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
                    <p className="text-sm text-mesia-lightText leading-relaxed mt-6 pt-6 border-t border-mesia-gold/30">
                      Τοπική κοινότητα της δημοτικής ενότητας Ευρωπού, Δήμου Παιονίας.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* Quick Access */}
          <section className="py-24 bg-mesia-cream" aria-labelledby="quick-access-heading">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Γρήγορη Πρόσβαση"
                title="Βρείτε αυτό που ψάχνετε"
                description="Χρήσιμοι αριθμοί, εκδηλώσεις και φωτογραφίες της Μεσιάς."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Landmark}
                  title="Έκτακτη ανάγκη"
                  description="Οι πανελλαδικοί αριθμοί έκτακτης ανάγκης."
                  className="bg-mesia-cream"
                >
                  <Link href="/services" className="mt-6 inline-flex items-center text-sm font-medium text-mesia-wine hover:text-mesia-gold transition-colors">
                    Αριθμοί έκτακτης ανάγκης <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                  </Link>
                </FeatureCard>

                <FeatureCard
                  icon={Compass}
                  title="Εκδηλώσεις"
                  description="Μείνετε ενημερωμένοι για εκδηλώσεις και ανακοινώσεις του χωριού."
                  className="bg-mesia-cream"
                >
                  <Link href="/events" className="mt-6 inline-flex items-center text-sm font-medium text-mesia-wine hover:text-mesia-gold transition-colors">
                    Δείτε Εκδηλώσεις <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </FeatureCard>

                <FeatureCard
                  icon={Camera}
                  title="Φωτογραφίες"
                  description="Εξερευνήστε τις ομορφιές του χωριού μας μέσα από τον φακό."
                  className="bg-mesia-cream"
                >
                  <Link href="/photos" className="mt-6 inline-flex items-center text-sm font-medium text-mesia-wine hover:text-mesia-gold transition-colors">
                    Φωτογραφικό αρχείο Μεσιάς <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
                  </Link>
                </FeatureCard>
              </div>
            </div>
          </section>

          <ResponsiveAdSlot slotKey="home-ad-2" className="bg-white" />

          {/* Attractions */}
          <section id="attractions" className="py-24 bg-white" aria-labelledby="attractions-heading">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow="Αξιοθέατα & Ιστορία"
                title="Χιλιάδες χρόνια σε λίγα χιλιόμετρα"
                description="Ανακαλύψτε την πλούσια ιστορία και τα μνημεία του χωριού μας."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard
                  icon={Church}
                  tag="15ος αι. — 1930"
                  title="Εκκλησία Αγ. Κωνσταντίνου & Ελένης"
                  description="Οθωμανικός τουρμπές (μαυσωλείο) του 15ου αιώνα, τμήμα ευρύτερου συγκροτήματος που περιλάμβανε λουτρό και τέμενος. Το 1930 μετατράπηκε σε χριστιανικό ναό. Πηγή: Εφορεία Αρχαιοτήτων Κιλκίς."
                />
                <FeatureCard
                  icon={Landmark}
                  tag="Προϊστορική εποχή"
                  title="Αρχαιολογικός Χώρος"
                  description="Στην τοποθεσία «Τούμπας Παπάκιοϊ» βρίσκεται σημαντικός αρχαιολογικός χώρος που μαρτυρεί την παρουσία αρχαίων πολιτισμών."
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
