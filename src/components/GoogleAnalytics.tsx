'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getCookieConsentValue } from 'react-cookie-consent'

export default function ConditionalGoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  useEffect(() => {
    const checkConsent = () => {
      const consentValue = getCookieConsentValue('mesia-cookie-consent')
      
      if (consentValue === 'true') {
        setHasConsent(true)
        console.log('📊 Google Analytics enabled - user accepted cookies')
      } else if (consentValue === 'false') {
        setHasConsent(false)
        console.log('🚫 Google Analytics disabled - user declined cookies')
      } else {
        setHasConsent(null)
        console.log('⏳ Waiting for cookie consent decision...')
      }
    }

    checkConsent()

    // Check every 2 seconds for consent changes
    const interval = setInterval(checkConsent, 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Don't load analytics if no consent or consent declined
  if (!hasConsent) {
    return null
  }

  console.log('🚀 Loading Google Analytics...')

  return (
    <GoogleAnalytics 
      gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} 
    />
  )
}
