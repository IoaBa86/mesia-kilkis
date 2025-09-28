'use client'

import { useEffect } from 'react'

interface ResponsiveAdSlotProps {
  id: string
  className?: string
  adSlot: string  // Your AdSense ad slot ID
  adFormat?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function ResponsiveAdSlot({ 
  id, 
  className = '', 
  adSlot,
  adFormat = 'auto',
  style 
}: ResponsiveAdSlotProps) {
  
  useEffect(() => {
    try {
      // Push the ad to AdSense queue
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div className={`w-full flex justify-center py-6 ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ins
          className="adsbygoogle"
          style={style || {
            display: 'block',
            minHeight: '50px',
            width: '100%',
            maxWidth: '970px',
            margin: '0 auto'
          }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
