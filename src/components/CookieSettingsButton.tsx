'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import Cookies from 'js-cookie'

export default function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false)

  const reopenSettings = () => {
    // Remove the consent cookie to show banner again
    Cookies.remove('mesia-cookie-consent')
    window.location.reload()
  }

  return (
    <button
      onClick={reopenSettings}
      className="fixed bottom-4 left-4 z-40 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
      title="Ρυθμίσεις Cookies"
    >
      <Settings className="h-5 w-5" />
    </button>
  )
}
