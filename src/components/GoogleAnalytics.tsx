'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  // Initialize GA when script loads
  const initializeGA = () => {
    if (!GA_MEASUREMENT_ID) {
      console.error('❌ GA_MEASUREMENT_ID not found')
      return
    }

    console.log('🚀 Initializing Google Analytics with ID:', GA_MEASUREMENT_ID)
    
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args)
      console.log('🏷️ gtag called:', args[0])
    }
    
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
      page_title: document.title,
      debug_mode: true // Enable debug mode for testing
    })
    
    console.log('✅ Google Analytics initialized')
  }

  // Track page views on route changes
  useEffect(() => {
    if (window.gtag && GA_MEASUREMENT_ID) {
      console.log('📄 Tracking page view:', pathname)
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
        page_title: document.title
      })
    }
  }, [pathname, GA_MEASUREMENT_ID])

  if (!GA_MEASUREMENT_ID) {
    console.error('❌ NEXT_PUBLIC_GA_MEASUREMENT_ID not set')
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('📊 GA Script loaded successfully')
          initializeGA()
        }}
        onError={(e) => {
          console.error('❌ GA Script failed to load:', e)
        }}
      />
    </>
  )
}
