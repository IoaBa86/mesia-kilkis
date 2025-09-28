'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    UC_UI: any
  }
}

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false)
  const pathname = usePathname()
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    const checkUsercentrics = () => {
      // Check if Usercentrics consent was given
      if (window.UC_UI) {
        try {
          const consentData = window.UC_UI.getServicesBaseInfo()
          const analyticsService = consentData?.find((service: any) => 
            service.name?.toLowerCase().includes('google') || 
            service.name?.toLowerCase().includes('analytics')
          )

          if (analyticsService?.consent?.status === true) {
            console.log('✅ Usercentrics consent granted for Analytics')
            setConsentGiven(true)
            initializeGA()
          } else {
            console.log('🚫 Usercentrics consent not granted yet')
          }
        } catch (error) {
          console.log('⚠️ Usercentrics not ready, initializing GA directly')
          setConsentGiven(true)
          initializeGA()
        }
      } else {
        // Fallback: Initialize directly if Usercentrics not found
        console.log('⚠️ Usercentrics not found, initializing GA')
        setConsentGiven(true)
        initializeGA()
      }
    }

    const initializeGA = () => {
      if (!GA_MEASUREMENT_ID || consentGiven) return

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
      
      console.log('✅ Google Analytics initialized')
    }

    // Wait for Usercentrics to load
    setTimeout(checkUsercentrics, 2000)
    
    // Listen for consent changes
    window.addEventListener('UC_UI_CONSENT_CHANGED', checkUsercentrics)
    
    return () => {
      window.removeEventListener('UC_UI_CONSENT_CHANGED', checkUsercentrics)
    }
  }, [GA_MEASUREMENT_ID, pathname, consentGiven])

  if (!GA_MEASUREMENT_ID) return null

  return consentGiven ? (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
      onLoad={() => console.log('📊 GA Script loaded')}
    />
  ) : null
}
