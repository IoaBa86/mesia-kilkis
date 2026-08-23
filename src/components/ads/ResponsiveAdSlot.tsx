'use client'

import { useEffect, useState } from 'react'

interface AdSlotData {
  id: string
  key: string
  adClient: string
  adSlotId: string
  adFormat: string
  isActive: boolean
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

// Fetches its own config from /api/ad-slots by `slotKey` and renders
// nothing when the slot is missing or turned off in the admin panel.
export default function ResponsiveAdSlot({
  slotKey,
  className = '',
  style,
}: {
  slotKey: string
  className?: string
  style?: React.CSSProperties
}) {
  const [slot, setSlot] = useState<AdSlotData | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/ad-slots?key=${encodeURIComponent(slotKey)}&activeOnly=1`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: AdSlotData[]) => {
        if (!cancelled) setSlot(data[0] || null)
      })
      .catch(() => {
        if (!cancelled) setSlot(null)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [slotKey])

  useEffect(() => {
    if (!slot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [slot])

  if (!loaded || !slot) return null

  return (
    <div className={`w-full flex justify-center py-6 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ins
          className="adsbygoogle"
          style={
            style || {
              display: 'block',
              minHeight: '50px',
              width: '100%',
              maxWidth: '970px',
              margin: '0 auto',
            }
          }
          data-ad-client={slot.adClient}
          data-ad-slot={slot.adSlotId}
          data-ad-format={slot.adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
