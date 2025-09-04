// src/app/services/page.tsx
import { Metadata } from 'next'
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowLeft, 
  Building, 
  Heart,
  Package,
  GraduationCap,
  Users,
  Shield,
  Briefcase,
  Home,
  Car,
  Landmark
} from "lucide-react"
import StructuredData from "@/components/StructuredData"

export const metadata: Metadata = {
  title: 'Υπηρεσίες & Δημοτικό Συμβούλιο',
  description: 'Βρείτε όλες τις υπηρεσίες του χωριού Μεσιά Κιλκίς και τα στοιχεία επικοινωνίας του Δημοτικού Συμβουλίου.',
  openGraph: {
    title: 'Υπηρεσίες & Δημοτικό Συμβούλιο - Μεσιά Κιλκίς',
    description: 'Όλες οι υπηρεσίες και επικοινωνία με το Δημοτικό Συμβούλιο του χωριού Μεσιά Κιλκίς',
    images: ['/og-image.jpg'],
  },
}

export default function ServicesPage() {
  const villageServices = [
    {
      title: "Ταχυδρομείο",
      description: "Ταχυδρομικές υπηρεσίες και αποστολή δεμάτων",
      icon: Package,
      contact: "Τηλ: 23430 41234",
      hours: "Δευ-Παρ: 08:00-14:00",
      location: "Κεντρική Πλατεία",
      color: "from-mesia-wine to-mesia-wine/80"
    },
    {
      title: "Ιατρείο",
      description: "Πρωτοβάθμια φροντίδα υγείας για τους κατοίκους",
      icon: Heart,
      contact: "Τηλ: 23430 41567 (Επείγον: 166)",
      hours: "Δευ-Τετ-Παρ: 09:00-13:00",
      location: "Οδός Κιλκίς 15",
      color: "from-mesia-gold to-mesia-accent"
    },
    {
      title: "Δημοτικό Σχολείο",
      description: "Εκπαίδευση παιδιών ηλικίας 6-12 ετών",
      icon: GraduationCap,
      contact: "Τηλ: 23430 41890",
      hours: "Δευ-Παρ: 08:15-14:00",
      location: "Οδός Μακεδονίας 8",
      color: "from-mesia-wine to-mesia-gold"
    },
    {
      title: "Αστυνομικό Τμήμα",
      description: "Ασφάλεια και τάξη στο χωριό",
      icon: Shield,
      contact: "Τηλ: 23430 41100 (Επείγον: 100)",
      hours: "24ωρη εξυπηρέτηση",
      location: "Κεντρικός Δρόμος 22",
      color: "from-mesia-gold to-mesia-wine"
    }
  ]

  const councilMembers = [
    {
      name: "Δημήτριος Παπαδόπουλος",
      position: "Πρόεδρος Τοπικής Κοινότητας",
      phone: "23430 41001",
      email: "president@mesia-kilkis.gr",
      responsibilities: ["Γενική διοίκηση", "Συντονισμός έργων", "Εξωτερικές σχέσεις"]
    },
    {
      name: "Μαρία Γεωργιάδου",
      position: "Αντιπρόεδρος",
      phone: "23430 41002", 
      email: "vicepresident@mesia-kilkis.gr",
      responsibilities: ["Κοινωνικά θέματα", "Πολιτιστικές εκδηλώσεις", "Γυναικείες οργανώσεις"]
    },
    {
      name: "Ιωάννης Νικολάου",
      position: "Γραμματέας",
      phone: "23430 41003",
      email: "secretary@mesia-kilkis.gr", 
      responsibilities: ["Διοικητικά", "Πρακτικά συνεδριάσεων", "Αρχειοθέτηση"]
    },
    {
      name: "Ελένη Κωνσταντίνου",
      position: "Ταμίας",
      phone: "23430 41004",
      email: "treasurer@mesia-kilkis.gr",
      responsibilities: ["Οικονομικά", "Προϋπολογισμός", "Λογιστική διαχείριση"]
    },
    {
      name: "Νικόλαος Ανδρέου",
      position: "Σύμβουλος",
      phone: "23430 41005",
      email: "councilor1@mesia-kilkis.gr",
      responsibilities: ["Αγροτικά θέματα", "Περιβάλλον", "Υδροδότηση"]
    }
  ]

  return (
    <>
      <StructuredData type="place" />
      
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
                <Building className="h-16 w-16 text-mesia-gold mx-auto mb-6" aria-hidden="true" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white font-greek mb-6">
                Υπηρεσίες & Συμβούλιο
              </h2>
              <p className="text-xl md:text-2xl text-mesia-cream mb-8 max-w-3xl mx-auto leading-relaxed">
                Όλες οι υπηρεσίες του χωριού και η επικοινωνία με το Δημοτικό Συμβούλιο
              </p>
            </div>
          </section>

          {/* Village Services */}
          <section className="py-24 bg-white" aria-labelledby="services-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-16">
                <h2 id="services-heading" className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                  Υπηρεσίες Χωριού
                </h2>
                <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                  Βρείτε όλες τις απαραίτητες υπηρεσίες για την καθημερινή σας εξυπηρέτηση
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {villageServices.map((service, index) => (
                  <Card key={index} className="group hover:scale-105 transition-all duration-500 border-0 shadow-xl hover:shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} aria-hidden="true"></div>
                    <CardHeader className="relative">
                      <div className="flex items-center mb-6">
                        <div className={`bg-gradient-to-br ${service.color} p-4 rounded-2xl mr-6 shadow-lg text-white`} aria-hidden="true">
                          <service.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-mesia-wine font-greek mb-2">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-mesia-darkText leading-relaxed">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="space-y-3 ml-20">
                        <div className="flex items-center text-mesia-darkText">
                          <Phone className="h-4 w-4 mr-3 text-mesia-gold" />
                          <span>{service.contact}</span>
                        </div>
                        <div className="flex items-center text-mesia-darkText">
                          <Clock className="h-4 w-4 mr-3 text-mesia-gold" />
                          <span>{service.hours}</span>
                        </div>
                        <div className="flex items-center text-mesia-darkText">
                          <MapPin className="h-4 w-4 mr-3 text-mesia-gold" />
                          <span>{service.location}</span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Village Council */}
          <section className="py-24 bg-gradient-to-br from-mesia-beige/30 via-white to-mesia-cream/30" aria-labelledby="council-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-mesia-wine/10 rounded-full text-mesia-wine mb-6 border border-mesia-wine/20">
                  <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span className="text-sm font-medium">Τοπική Διοίκηση</span>
                </div>
                <h2 id="council-heading" className="text-4xl font-bold text-mesia-wine font-greek mb-6">
                  Δημοτικό Συμβούλιο
                </h2>
                <p className="text-xl text-mesia-lightText max-w-3xl mx-auto">
                  Επικοινωνήστε με τους εκπροσώπους του χωριού για οποιαδήποτε ανάγκη
                </p>
              </header>

              {/* Council Contact Info */}
              <div className="mb-12">
                <Card className="bg-gradient-to-br from-mesia-wine to-mesia-wine/90 text-white shadow-2xl border-0 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <Landmark className="h-8 w-8 text-mesia-gold mr-4" />
                      <CardTitle className="text-2xl font-bold text-mesia-gold font-greek">
                        Γενικές Πληροφορίες
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-mesia-gold mr-3" />
                        <div>
                          <p className="font-medium">Διεύθυνση:</p>
                          <p className="text-mesia-cream">Δημαρχείο Μεσιάς, Κεντρική Πλατεία</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-mesia-gold mr-3" />
                        <div>
                          <p className="font-medium">Τηλέφωνο:</p>
                          <p className="text-mesia-cream">23430 41000</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-mesia-gold mr-3" />
                        <div>
                          <p className="font-medium">Email:</p>
                          <p className="text-mesia-cream">info@mesia-kilkis.gr</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-mesia-gold/30">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-mesia-gold mr-3" />
                        <div>
                          <p className="font-medium">Ώρες Λειτουργίας:</p>
                          <p className="text-mesia-cream">Δευτέρα - Παρασκευή: 08:00 - 15:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Council Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {councilMembers.map((member, index) => (
                  <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-white/95 backdrop-blur-sm border border-mesia-gold/20 shadow-xl hover:shadow-2xl">
                    <CardHeader>
                      <div className="text-center mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-mesia-wine to-mesia-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <Users className="h-10 w-10 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-mesia-wine font-greek mb-1">
                          {member.name}
                        </CardTitle>
                        <CardDescription className="text-mesia-gold font-semibold">
                          {member.position}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-mesia-darkText">
                          <Phone className="h-4 w-4 mr-3 text-mesia-gold" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-mesia-darkText">
                          <Mail className="h-4 w-4 mr-3 text-mesia-gold" />
                          <span className="truncate">{member.email}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-mesia-wine mb-2">Αρμοδιότητες:</h4>
                        <ul className="text-sm text-mesia-lightText space-y-1">
                          {member.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-mesia-gold rounded-full mr-2"></span>
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Emergency Contacts */}
              <div className="mt-16">
                <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl border-0">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center font-greek flex items-center justify-center">
                      <Shield className="h-8 w-8 mr-3" />
                      Αριθμοί Έκτακτης Ανάγκης
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-3xl font-bold mb-2">100</div>
                        <div className="text-sm">Αστυνομία</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold mb-2">199</div>
                        <div className="text-sm">Πυροσβεστική</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold mb-2">166</div>
                        <div className="text-sm">Ιατρική Βοήθεια</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold mb-2">112</div>
                        <div className="text-sm">Ευρωπαϊκός Αριθμός</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  )
}
