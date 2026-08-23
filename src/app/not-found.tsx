// src/app/not-found.tsx
import Link from 'next/link'
import { Compass, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CoordinateStamp from '@/components/site/CoordinateStamp'

export default function NotFound() {
  return (
    <div className="bg-mesia-cream min-h-[70vh] flex items-center">
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(117,54,71,0.7) 1.5px, transparent 2px)',
            backgroundSize: '26px 26px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <Compass className="h-10 w-10 text-mesia-gold mx-auto mb-6" aria-hidden="true" />

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-mesia-wine/50 mb-4">
            Σφάλμα 404
          </p>

          <h1 className="text-5xl md:text-8xl font-bold text-mesia-wine font-greek leading-none mb-6">
            Εκτός Χάρτη
          </h1>

          <p className="text-lg text-mesia-darkText/80 leading-relaxed mb-8 max-w-md mx-auto">
            Η σελίδα που ψάχνετε δεν βρέθηκε — ίσως μετακινήθηκε ή ποτέ δεν υπήρξε σε αυτές τις συντεταγμένες.
          </p>

          <div className="flex justify-center mb-10">
            <CoordinateStamp tone="dark">ΣΥΝΤΕΤΑΓΜΕΝΕΣ · ΑΓΝΩΣΤΕΣ</CoordinateStamp>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild>
              <Link href="/" className="flex items-center">
                Επιστροφή στην Αρχική
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/photos">Δείτε Φωτογραφίες</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
