'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="bg-mesia-cream min-h-[70vh] flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <AlertTriangle className="h-10 w-10 text-mesia-gold mx-auto mb-6" aria-hidden="true" />

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-mesia-wine/50 mb-4">
          Σφάλμα 500
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-mesia-wine font-greek leading-tight mb-6">
          Κάτι πήγε στραβά
        </h1>

        <p className="text-lg text-mesia-darkText/80 leading-relaxed mb-10 max-w-md mx-auto">
          Παρουσιάστηκε ένα απρόσμενο σφάλμα. Δοκιμάστε ξανά — αν το πρόβλημα επιμένει, επιστρέψτε αργότερα.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => reset()} className="flex items-center">
            <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
            Δοκιμάστε ξανά
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Επιστροφή στην Αρχική</Link>
          </Button>
        </div>

        {error.digest && (
          <p className="mt-10 font-mono text-[11px] text-mesia-lightText/60">
            Κωδικός σφάλματος: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
