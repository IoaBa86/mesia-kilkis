// src/app/page.tsx - Updated with responsive ad spaces
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Clock, Users, ArrowRight, Sparkles, Mountain, Church } from "lucide-react"
import StructuredData from "@/components/StructuredData"

// NEW: Responsive Ad Component
function ResponsiveAdSlot({ id, className = "" }: { id: string; className?: string }) {
  return (
    <div className={`w-full flex justify-center py-6 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          id={id}
          className="
            min-h-[50px] sm:min-h-[90px] lg:min-h-[250px]
            w-full max-w-[320px] sm:max-w-[728px] lg:max-w-[970px]
            mx-auto
            bg-gradient-to-r from-mesia-lightCream/20 to-mesia-beige/20
            border border-mesia-gold/20 rounded-lg
            flex items-center justify-center
            text-mesia-lightText text-sm
            hover:from-mesia-lightCream/30 hover:to-mesia-beige/30
            transition-all duration-300
          "
        >
          {/* Placeholder - Replace with actual Google AdSense code */}
          <div className="text-center opacity-50">
            <div className="text-xs sm:text-sm">Διαφήμιση</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <StructuredData type="website" />
      <StructuredData type="place" />
      
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        {/* Main content */}
        <main>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-mesia-wine via-mesia-wine/90 to-mesia-gold/80">
              <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
              <div className="absolute top-20 left-20 w-72 h-72 bg-mesia-gold/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-mesia-cream/30 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} aria-hidden="true"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
              <div className="mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white mb-8 animate-pulse-slow border border-mesia-gold/30">
                  <Sparkles className="h-5 w-5 mr-3 text-mesia-gold" aria-hidden="true" />
                  <span className="text-sm font-medium font-greek">Καλώς ήρθατε στην Ελλάδα</span>
                </div>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-greek leading-tight">
                <span className="block animate-bounce-slow">Μεσιά</span>
                <span className="block bg-gradient-to-r from-mesia-gold to-mesia-cream bg-clip-text text-transparent">
                  Κιλκίς
                </span>
              </h2>
              
              <p className="text-xl md:text-3xl text-mesia-cream mb-12 max-w-4xl mx-auto leading-relaxed">
                Πεδινό χωριό της <span className="text-mesia-gold font-semibold">Κεντρικής Μακεδονίας</span> 
                <br />στην Περιφερειακή Ενότητα Κιλκίς
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-mesia-gold to-mesia-accent text-mesia-wine hover:from-mesia-accent hover:to-mesia-gold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-mesia-gold/25 px-8 py-4 text-lg font-semibold animate-glow border border-mesia-gold/50"
                  asChild
                >
                  <Link href="/photos" className="flex items-center">
                    <Camera className="h-6 w-6 mr-3" aria-hidden="true" />
                    Δείτε Φωτογραφίες
                    <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-mesia-wine transform hover:scale-105 transition-all duration-300 backdrop-blur-sm px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="#about">
                    Μάθετε Περισσότερα
                  </Link>
                </Button>
              </div>
            </div>

            {/* Elegant scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
              <div className="w-6 h-10 border-2 border-mesia-gold/70 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-mesia-gold/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="py-20 -mt-16 relative z-20" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Στατιστικά στοιχεία χωριού</h2>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { icon: Users, value: "173", label: "κάτοικοι (2021)", color: "wine", emoji: "👥" },
                  { icon: Mountain, value: "30μ", label: "από τη θάλασσα", color: "gold", emoji: "⛰️" },
                  { icon: MapPin, value: "17χλμ", label: "από Πολύκαστρο", color: "wine", emoji: "📍" },
                  { icon: Clock, value: "40°52′57″N", label: "22°34′35″E", color: "gold", emoji: "🗺️" },
                ].map((stat, index) => (
                  <Card key={index} className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl bg-white/95 backdrop-blur-sm hover:bg-white overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                      stat.color === 'wine' ? 'from-mesia-wine to-mesia-wine/80' : 'from-mesia-gold to-mesia-accent'
                    }`} aria-hidden="true"></div>
                    <CardContent className="pt-8 text-center relative">
                      <div className="text-4xl mb-4 animate-float" style={{animationDelay: `${index * 0.5}s`}} aria-hidden="true">
                        {stat.emoji}
                      </div>
                      <div className={`text-4xl font-bold mb-2 ${
                        stat.color === 'wine' ? 'text-mesia-wine' : 'text-mesia-gold'
                      }`}>
                        {stat.value}
                      </div>
                      <p className="text-mesia-lightText font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 🎯 AD SLOT 1 - After Stats Cards (High Engagement Point) */}
          <ResponsiveAdSlot 
            id="homepage-ad-1" 
            className="bg-gradient-to-r from-mesia-cream/10 to-mesia-beige/10" 
          />

          {/* About Section */}
          <section id="about" className="py-24 bg-gradient-to-br from-white via-mesia-cream/50 to-mesia-beige/50 relative overflow-hidden" aria-labelledby="about-heading">
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              <div className="absolute top-20 left-10 w-64 h-64 bg-mesia-gold rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-mesia-wine rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <article>
                  <div className="inline-flex items-center px-4 py-2 bg-mesia-gold/20 rounded-full text-mesia-wine mb-6 border border-mesia-gold/30">
                    <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span className="text-sm font-medium">Κεντρική Μακεδονία</span>
                  </div>
                  
                  <h2 id="about-heading" className="text-5xl font-bold text-mesia-wine font-greek leading-tight mb-8">
                    Πού βρισκόμαστε
                  </h2>
                  
                  <div className="space-y-6 text-lg text-mesia-darkText leading-relaxed">
                    <p>
                      Η <strong className="text-mesia-wine">Μεσιά</strong> είναι ένα παραδοσιακό χωριό της Κεντρικής Μακεδονίας, 
                      που βρίσκεται στην Περιφερειακή Ενότητα Κιλκίς. Με υψόμετρο 30 μέτρα 
                      από τη θάλασσα και πληθυσμό 173 κατοίκους, το χωριό μας απέχει 17 χιλιόμετρα 
                      νότια από το Πολύκαστρο και 19 χιλιόμετρα από τη Γουμένισσα.
                    </p>
                    <p>
                      Βρισκόμαστε δυτικά του <strong className="text-mesia-wine">Αξιού ποταμού</strong>, 
                      στις συντεταγμένες 40°52′57″N 22°34′35″E, σε μια περιοχή πλούσια σε ιστορία 
                      και φυσική ομορφιά.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button className="bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-mesia-wine/25 px-8 py-4 border border-mesia-wine/20" asChild>
                      <Link href="/photos">
                        Δείτε τις Φωτογραφίες μας
                        <ArrowRight className="h-5 w-5 ml-2" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white px-8 py-4" asChild>
                      <Link href="/services">
                        Υπηρεσίες Χωριού
                      </Link>
                    </Button>
                  </div>
                </article>
                
                <aside className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-mesia-wine/40 to-mesia-gold/40 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" aria-hidden="true"></div>
                  <div className="relative bg-gradient-to-br from-mesia-wine via-mesia-wine to-mesia-wine/90 rounded-2xl p-8 text-white shadow-2xl transform group-hover:scale-105 transition-all duration-500 border border-mesia-gold/30">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-mesia-gold/10 rounded-full blur-2xl" aria-hidden="true"></div>
                    <h3 className="text-3xl font-bold mb-6 font-greek text-mesia-gold">Στοιχεία Επικοινωνίας</h3>
                    <address className="space-y-4 not-italic">
                      <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-mesia-gold/20">
                        <MapPin className="h-6 w-6 mr-4 text-mesia-gold" aria-hidden="true" />
                        <span className="text-lg">Μεσιά Κιλκίς, 61100</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-mesia-gold/20">
                        <Clock className="h-6 w-6 mr-4 text-mesia-gold" aria-hidden="true" />
                        <span className="text-lg">Κεντρική Μακεδονία</span>
                      </div>
                    </address>
                    <div className="mt-6">
                      <Button variant="outline" className="border-mesia-gold text-mesia-gold hover:bg-mesia-gold hover:text-mesia-wine w-full" asChild>
                        <Link href="/services">
                          Δείτε όλες τις Υπηρεσίες
                        </Link>
                      </Button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* Quick Access Section */}
          <section className="py-24 bg-white" aria-labelledby="quick-access-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-16">
                <h2 id="quick-access-heading" className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                  Γρήγορη Πρόσβαση
                </h2>
                <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                  Βρείτε γρήγορα αυτό που ψάχνετε για το χωριό μας
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-mesia-wine to-mesia-wine/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl text-white">📋</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-mesia-wine font-greek mb-2">
                      Υπηρεσίες
                    </CardTitle>
                    <CardDescription className="text-mesia-lightText">
                      Βρείτε όλες τις υπηρεσίες και την επικοινωνία με το Δημοτικό Συμβούλιο
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-mesia-wine to-mesia-wine/90 hover:from-mesia-wine/90 hover:to-mesia-wine text-white" asChild>
                      <Link href="/services">
                        Δείτε Υπηρεσίες
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-mesia-gold to-mesia-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-3xl text-mesia-wine">📅</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-mesia-wine font-greek mb-2">
                      Εκδηλώσεις
                    </CardTitle>
                    <CardDescription className="text-mesia-lightText">
                      Μείνετε ενημερωμένοι για όλες τις εκδηλώσεις και ανακοινώσεις του χωριού
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-mesia-gold to-mesia-accent text-mesia-wine hover:from-mesia-accent hover:to-mesia-gold" asChild>
                      <Link href="/events">
                        Δείτε Εκδηλώσεις
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-mesia-wine to-mesia-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-mesia-wine font-greek mb-2">
                      Φωτογραφίες
                    </CardTitle>
                    <CardDescription className="text-mesia-lightText">
                      Εξερευνήστε τις ομορφιές του χωριού μας μέσα από τον φακό
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-mesia-wine text-mesia-wine hover:bg-mesia-wine hover:text-white" asChild>
                      <Link href="/photos">
                        Δείτε Φωτογραφίες
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* 🎯 AD SLOT 2 - After Quick Access (Pre-Final Content) */}
          <ResponsiveAdSlot 
            id="homepage-ad-2" 
            className="bg-white" 
          />

          {/* Attractions Section */}
          <section id="attractions" className="py-24 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30" aria-labelledby="attractions-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                  <Church className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span className="text-sm font-medium">Ιστορικά Μνημεία</span>
                </div>
                <h2 id="attractions-heading" className="text-5xl font-bold text-mesia-wine font-greek mb-6">
                  Αξιοθέατα & Ιστορία
                </h2>
                <p className="text-2xl text-mesia-lightText max-w-3xl mx-auto">
                  Ανακαλύψτε την πλούσια ιστορία και τα μνημεία του χωριού μας
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Εκκλησία Αγ. Κωνσταντίνου & Ελένης",
                    description: "Ιστορικό διατηρητέο μνημείο με ενσωματωμένο μουσουλμανικό τέμενος του 15ου-16ου αιώνα, κτισμένο με μαρμάρινους δόμους από αρχαίο κτήριο.",
                    emoji: "⛪",
                    gradient: "from-mesia-wine to-mesia-wine/80"
                  },
                  {
                    title: "Αρχαιολογικός Χώρος",
                    description: "Στην τοποθεσία 'Τούμπας Παπάκιοϊ' βρίσκεται σημαντικός αρχαιολογικός χώρος που μαρτυρεί την παρουσία αρχαίων πολιτισμών.",
                    emoji: "🏛️",
                    gradient: "from-mesia-gold to-mesia-accent"
                  }
                ].map((attraction, index) => (
                  <Card key={index} className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-br ${attraction.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} aria-hidden="true"></div>
                    <CardHeader className="relative">
                      <div className="flex items-center mb-6">
                        <div className={`bg-gradient-to-br ${attraction.gradient} p-4 rounded-2xl mr-6 text-4xl flex items-center justify-center shadow-lg text-white`} aria-hidden="true">
                          {attraction.emoji}
                        </div>
                        <CardTitle className="text-2xl font-bold text-mesia-wine font-greek">
                          {attraction.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-lg text-mesia-darkText leading-relaxed">
                        {attraction.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Photo Gallery CTA */}
          <section className="py-24 bg-gradient-to-br from-mesia-wine via-mesia-wine/95 to-mesia-wine/90 relative overflow-hidden" aria-labelledby="gallery-heading">
            <div className="absolute inset-0 bg-mesh-gradient opacity-20" aria-hidden="true"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
              <div className="mb-8">
                <Camera className="h-16 w-16 text-mesia-gold mx-auto mb-6 animate-float" aria-hidden="true" />
              </div>
              <h2 id="gallery-heading" className="text-5xl font-bold text-white font-greek mb-6">
                Γκαλερί Φωτογραφιών
              </h2>
              <p className="text-2xl text-mesia-cream mb-12 max-w-3xl mx-auto">
                Δείτε τις ομορφιές του χωριού μας μέσα από τον φακό
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-mesia-gold to-mesia-accent text-mesia-wine hover:from-mesia-accent hover:to-mesia-gold transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-mesia-gold/25 px-12 py-6 text-xl font-bold animate-glow border border-mesia-gold/30" 
                asChild
              >
                <Link href="/photos" className="flex items-center">
                  <Camera className="h-6 w-6 mr-3" aria-hidden="true" />
                  Προβολή Όλων των Φωτογραφιών
                  <ArrowRight className="h-6 w-6 ml-3" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
