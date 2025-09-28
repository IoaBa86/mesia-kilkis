'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Fixed: Check document.cookie instead of getCookieConsentValue
  useEffect(() => {
    const checkConsent = () => {
      const hasCookieConsent = document.cookie.includes('mesia-cookie-consent=true')
      
      if (hasCookieConsent) {
        setHasConsent(true)
        console.log('📊 Analytics enabled - user accepted cookies')
      } else if (document.cookie.includes('mesia-cookie-consent=false')) {
        setHasConsent(false)
        console.log('🚫 Analytics disabled - user declined cookies')
      } else {
        setHasConsent(null)
        console.log('⏳ Waiting for cookie consent...')
      }
    }

    checkConsent()
    
    // Check every 2 seconds for consent changes
    const interval = setInterval(checkConsent, 2000)
    
    return () => clearInterval(interval)
  }, [])

  // Initialize Google Analytics when consent is given
  useEffect(() => {
    if (hasConsent && !isLoaded && GA_MEASUREMENT_ID) {
      console.log('🚀 Initializing Google Analytics with ID:', GA_MEASUREMENT_ID)
      
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      
      window.gtag('js', new Date())
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
        page_title: document.title
      })
      
      setIsLoaded(true)
      console.log('✅ Google Analytics initialized')
    }
  }, [hasConsent, GA_MEASUREMENT_ID, isLoaded, pathname])

  // Track page views on route changes
  useEffect(() => {
    if (hasConsent && isLoaded && window.gtag) {
      console.log('📄 Tracking page view:', pathname)
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
        page_title: document.title
      })
    }
  }, [pathname, hasConsent, isLoaded, GA_MEASUREMENT_ID])

  if (!hasConsent || !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('📊 Google Analytics script loaded')
        }}
      />
    </>
  )
}
