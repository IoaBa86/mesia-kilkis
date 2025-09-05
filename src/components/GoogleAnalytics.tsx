'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getCookieConsentValue } from 'react-cookie-consent'
import { trackDualAnalytics } from '@/lib/analytics'  // Now client-safe!
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

  useEffect(() => {
    const checkConsent = () => {
      const consentValue = getCookieConsentValue('mesia-cookie-consent')
      
      if (consentValue === 'true') {
        setHasConsent(true)
        console.log('📊 Analytics enabled - user accepted cookies')
      } else if (consentValue === 'false') {
        setHasConsent(false)
        console.log('🚫 Analytics disabled - user declined cookies')
      } else {
        setHasConsent(null)
        console.log('⏳ Waiting for cookie consent...')
      }
    }

    checkConsent()
    const handleConsentChange = () => checkConsent()

    window.addEventListener('cookie-consent-updated', handleConsentChange)
    const interval = setInterval(checkConsent, 2000)
    
    return () => {
      window.removeEventListener('cookie-consent-updated', handleConsentChange)
      clearInterval(interval)
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (hasConsent && isLoaded) {
      const sessionId = sessionStorage.getItem('sessionId') || 
                       Date.now().toString(36) + Math.random().toString(36).substr(2)
      
      if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', sessionId)
      }

      // Now this is client-safe - no direct Prisma calls!
      trackDualAnalytics.pageView(pathname, document.title, {
        sessionId,
        userAgent: navigator.userAgent,
        referrer: document.referrer || undefined
      })
    }
  }, [pathname, hasConsent, isLoaded])

  // Initialize Google Analytics
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
      
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
          });
          
          gtag('consent', 'update', {
            'analytics_storage': 'granted',
            'ad_storage': 'granted'
          });
        `}
      </Script>
    </>
  )
}
