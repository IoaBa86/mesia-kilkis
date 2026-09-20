'use client'

import { useState } from 'react'

declare global {
  interface Window {
    googlefc?: {
      callbackQueue?: unknown[]
      showRevocationMessage?: () => void
    }
  }
}

// Reopens Google's consent message (Funding Choices) so visitors can change
// or withdraw consent. Documented call:
// https://support.google.com/adsense/answer/10959060
export default function CookieSettingsLink({ className }: { className?: string }) {
  // Funding Choices only loads via the AdSense script, so it never arrives
  // for visitors with an ad-blocker. Say so instead of doing nothing.
  const [unavailable, setUnavailable] = useState(false)

  const reopen = () => {
    const fc = window.googlefc
    if (fc?.callbackQueue && typeof fc.showRevocationMessage === 'function') {
      fc.callbackQueue.push(fc.showRevocationMessage)
    } else {
      setUnavailable(true)
    }
  }

  return (
    <>
      <button type="button" onClick={reopen} className={className}>
        Ρυθμίσεις απορρήτου και cookie
      </button>
      {unavailable && (
        <p role="alert" className="mt-2 text-xs text-mesia-lightText">
          Οι ρυθμίσεις δεν είναι διαθέσιμες αυτή τη στιγμή (πιθανόν λόγω ad-blocker).
        </p>
      )}
    </>
  )
}
