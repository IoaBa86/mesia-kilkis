'use client'

import { useState } from 'react'
import { Settings2 } from 'lucide-react'

declare global {
  interface Window {
    googlefc?: {
      showRevocationMessage?: () => void
    }
  }
}

export default function CookieSettingsButton() {
  // Google's Funding Choices script (which provides showRevocationMessage)
  // only loads via the AdSense script — it silently never arrives for
  // visitors with an ad-blocker, or if ads.txt/AdSense verification isn't
  // in place yet. Surface that instead of a button that does nothing.
  const [unavailable, setUnavailable] = useState(false)

  const reopenSettings = () => {
    if (typeof window.googlefc?.showRevocationMessage === 'function') {
      window.googlefc.showRevocationMessage()
    } else {
      setUnavailable(true)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {unavailable && (
        <div
          role="alert"
          className="max-w-[220px] border border-mesia-gold/30 bg-white px-3 py-2 text-xs text-mesia-wine shadow-md"
        >
          Οι ρυθμίσεις cookies δεν είναι διαθέσιμες αυτή τη στιγμή (πιθανόν λόγω ad-blocker). Δοκιμάστε να απενεργοποιήσετε τυχόν ad-blocker και ανανεώστε τη σελίδα.
        </div>
      )}
      <button
        onClick={reopenSettings}
        className="flex h-11 w-11 items-center justify-center border border-mesia-gold/30 bg-white text-mesia-wine shadow-md hover:bg-mesia-cream transition-colors"
        title="Ρυθμίσεις Cookies"
        aria-label="Ρυθμίσεις Cookies"
      >
        <Settings2 className="h-4 w-4" />
      </button>
    </div>
  )
}
