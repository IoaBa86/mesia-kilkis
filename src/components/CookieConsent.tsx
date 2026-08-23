'use client'

import { useState, useEffect } from 'react'
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent'
import Link from 'next/link'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consentValue = getCookieConsentValue('mesia-cookie-consent')
    if (consentValue === undefined) {
      setShowBanner(true)
    }
  }, [])

  const logConsent = async (consentType: 'accepted' | 'declined', categories = {}) => {
    try {
      console.log('🚀 Sending consent to API:', { consentType, categories })
      
      const response = await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consent: consentType,
          categories: categories,
          consentType: consentType
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Response not OK:', errorText)
        return
      }

      const result = await response.json()
      if (result.success) {
        console.log(`✅ Consent logged with ID: ${result.id}`)
      } else {
        console.error('Failed to log consent:', result.error)
      }
    } catch (error) {
      console.error('Error logging consent:', error)
    }
  }

  const handleAccept = async () => {
    console.log('✅ User ACCEPTED cookies!')
    
    const categories = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true
    }

    // Log to database
    await logConsent('accepted', categories)
    
    // Enable Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      })
    }
    
    // Trigger event to notify Google Analytics component to reload
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-updated'))
      
      // Also trigger a storage event as fallback
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'mesia-cookie-consent',
        newValue: 'true'
      }))
    }
    
    setShowBanner(false)
  }

  const handleDecline = async () => {
    console.log('❌ User DECLINED cookies')
    
    const categories = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false
    }

    // Log to database
    await logConsent('declined', categories)
    
    // Disable Google Analytics consent
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      })
    }
    
    // Trigger event to notify components of consent change
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie-consent-updated'))
      
      // Also trigger storage event as fallback
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'mesia-cookie-consent',
        newValue: 'false'
      }))
    }
    
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <CookieConsent
      location="bottom"
      buttonText="Αποδοχή όλων"
      declineButtonText="Απόρριψη"
      enableDeclineButton
      cookieName="mesia-cookie-consent"
      onAccept={handleAccept}
      onDecline={handleDecline}
      expires={365}
      style={{
        background: '#2B373B',
        color: '#FFF',
        fontSize: '16px',
        padding: '20px',
        alignItems: 'center',
        zIndex: 9999
      }}
      buttonStyle={{
        backgroundColor: '#10B981',
        color: '#FFF',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        padding: '12px 24px',
        cursor: 'pointer',
        marginRight: '10px'
      }}
      declineButtonStyle={{
        backgroundColor: '#6B7280',
        color: '#FFF',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        padding: '12px 24px',
        cursor: 'pointer'
      }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            Αυτός ο ιστότοπος χρησιμοποιεί cookies για να βελτιώσει την εμπειρία σας. 
            Καταγράφουμε τις προτιμήσεις σας για συμμόρφωση με τον GDPR.{' '}
            <Link href="/legal/cookie-policy" className="underline text-blue-300">
              Μάθετε περισσότερα
            </Link>
          </p>
        </div>
      </div>
    </CookieConsent>
  )
}
