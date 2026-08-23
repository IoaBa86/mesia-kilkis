'use client'

import { Settings2 } from 'lucide-react'

export default function CookieSettingsButton() {
  const reopenSettings = () => {
    window.dispatchEvent(new Event('mesia-cookie-settings-open'))
  }

  return (
    <button
      onClick={reopenSettings}
      className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center border border-mesia-gold/30 bg-white text-mesia-wine shadow-md hover:bg-mesia-cream transition-colors"
      title="Ρυθμίσεις Cookies"
      aria-label="Ρυθμίσεις Cookies"
    >
      <Settings2 className="h-4 w-4" />
    </button>
  )
}
