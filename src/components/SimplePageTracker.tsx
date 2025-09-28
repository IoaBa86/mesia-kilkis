'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function SimplePageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('📄 Tracking page view:', pathname)
      
      // Track page view
      window.gtag('config', 'G-0JBJ2897HL', {
        page_path: pathname,
        page_title: document.title
      })
      
      // Send explicit page_view event  
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href
      })
    } else {
      console.log('⚠️ gtag not available yet')
    }
  }, [pathname])

  return null
}
