// src/components/analytics/AnalyticsTracker.tsx
"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const startTimeRef = useRef<number>()
  const sessionIdRef = useRef<string>()

  // Generate or retrieve session ID
  useEffect(() => {
    // Skip tracking on admin pages
    if (pathname?.startsWith('/admin')) return

    let sessionId = localStorage.getItem('mesia_analytics_session')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('mesia_analytics_session', sessionId)
    }
    sessionIdRef.current = sessionId
  }, [pathname])

  // Track page views and time on page
  useEffect(() => {
    // Skip tracking on admin pages
    if (pathname?.startsWith('/admin') || !sessionIdRef.current) return

    startTimeRef.current = Date.now()

    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            sessionId: sessionIdRef.current,
            userId: session?.user?.id
          })
        })
      } catch (error) {
        console.error('Analytics tracking failed:', error)
      }
    }

    trackPageView()

    // Track time on page when leaving
    const handleBeforeUnload = () => {
      if (startTimeRef.current && sessionIdRef.current) {
        const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000)
        
        // Use sendBeacon for reliable tracking on page unload
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/analytics/track', JSON.stringify({
            path: pathname,
            sessionId: sessionIdRef.current,
            userId: session?.user?.id,
            timeOnPage
          }))
        }
      }
    }

    // Also track on visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleBeforeUnload()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      handleBeforeUnload() // Also track when component unmounts (route change)
    }
  }, [pathname, session])

  return null // This component doesn't render anything
}
