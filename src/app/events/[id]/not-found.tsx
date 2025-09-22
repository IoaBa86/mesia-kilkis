// src/app/events/[id]/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <Calendar className="h-24 w-24 text-mesia-gold mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-mesia-wine font-greek mb-4">
          Εκδήλωση δεν βρέθηκε
        </h1>
        <p className="text-mesia-lightText mb-8">
          Η εκδήλωση που ψάχνετε δεν υπάρχει ή έχει αφαιρεθεί.
        </p>
        <Link href="/events">
          <Button className="bg-mesia-wine text-white hover:bg-mesia-wine/90">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Επιστροφή στις Εκδηλώσεις
          </Button>
        </Link>
      </div>
    </div>
  )
}
