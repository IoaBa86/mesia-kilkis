'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { Cookie, Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

const CONSENT_COOKIE = 'mesia-cookie-consent'
const CONSENT_EXPIRY_DAYS = 365

type Categories = {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

const DEFAULT_CATEGORIES: Categories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [categories, setCategories] = useState<Categories>(DEFAULT_CATEGORIES)
  const [saving, setSaving] = useState(false)

  const readStoredCategories = (): Categories | null => {
    const raw = Cookies.get(CONSENT_COOKIE)
    if (!raw) return null
    try {
      return { ...DEFAULT_CATEGORIES, ...JSON.parse(raw) }
    } catch {
      return null
    }
  }

  useEffect(() => {
    const stored = readStoredCategories()
    if (!stored) {
      setVisible(true)
    } else {
      setCategories(stored)
    }

    // Let the floating settings button reopen this banner with current choices
    const handleReopen = () => {
      setCategories(readStoredCategories() || DEFAULT_CATEGORIES)
      setShowDetails(true)
      setVisible(true)
    }
    window.addEventListener('mesia-cookie-settings-open', handleReopen)
    return () => window.removeEventListener('mesia-cookie-settings-open', handleReopen)
  }, [])

  const applyGtagConsent = (cats: Categories) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: cats.analytics ? 'granted' : 'denied',
        ad_storage: cats.marketing ? 'granted' : 'denied',
      })
    }
  }

  const persist = async (cats: Categories) => {
    setSaving(true)
    try {
      Cookies.set(CONSENT_COOKIE, JSON.stringify(cats), { expires: CONSENT_EXPIRY_DAYS })
      applyGtagConsent(cats)

      await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consent: cats.analytics || cats.marketing || cats.functional ? 'accepted' : 'declined',
          categories: cats,
        }),
      }).catch((err) => console.error('Failed to log cookie consent:', err))
    } finally {
      setSaving(false)
      setVisible(false)
    }
  }

  const acceptAll = () => persist({ necessary: true, functional: true, analytics: true, marketing: true })
  const rejectAll = () => persist({ necessary: true, functional: false, analytics: false, marketing: false })
  const savePreferences = () => persist(categories)

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9999] border-t border-mesia-gold/30 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-label="Ρυθμίσεις cookies"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-start gap-3 mb-4">
          <Cookie className="h-5 w-5 text-mesia-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-mesia-darkText/90 leading-relaxed">
            Χρησιμοποιούμε cookies για τη λειτουργία της ιστοσελίδας και, εφόσον συναινέσετε, για ανάλυση
            επισκεψιμότητας και εξατομικευμένες διαφημίσεις.{' '}
            <Link href="/legal/cookie-policy" className="text-mesia-wine underline hover:text-mesia-gold">
              Πολιτική Cookies
            </Link>
          </p>
        </div>

        {showDetails && (
          <div className="mb-5 border border-mesia-gold/25 divide-y divide-mesia-gold/20">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-mesia-darkText">Απαραίτητα</p>
                <p className="text-xs text-mesia-lightText mt-0.5">Απαραίτητα για τη λειτουργία της ιστοσελίδας. Δεν μπορούν να απενεργοποιηθούν.</p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-mesia-darkText">Λειτουργικότητας</p>
                <p className="text-xs text-mesia-lightText mt-0.5">Απομνημόνευση προτιμήσεων εμφάνισης και πλοήγησης.</p>
              </div>
              <Switch
                checked={categories.functional}
                onCheckedChange={(checked) => setCategories(prev => ({ ...prev, functional: checked }))}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-mesia-darkText">Ανάλυσης</p>
                <p className="text-xs text-mesia-lightText mt-0.5">Στατιστικά επισκεψιμότητας μέσω Google Analytics.</p>
              </div>
              <Switch
                checked={categories.analytics}
                onCheckedChange={(checked) => setCategories(prev => ({ ...prev, analytics: checked }))}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-mesia-darkText">Διαφήμισης</p>
                <p className="text-xs text-mesia-lightText mt-0.5">Εξατομικευμένες διαφημίσεις μέσω Google AdSense.</p>
              </div>
              <Switch
                checked={categories.marketing}
                onCheckedChange={(checked) => setCategories(prev => ({ ...prev, marketing: checked }))}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {!showDetails ? (
            <button
              onClick={() => setShowDetails(true)}
              className="flex items-center justify-center gap-2 text-sm font-medium text-mesia-wine hover:text-mesia-gold transition-colors sm:mr-auto"
            >
              <Settings2 className="h-4 w-4" />
              Προσαρμογή
            </button>
          ) : (
            <span className="sm:mr-auto" />
          )}

          <Button variant="outline" onClick={rejectAll} disabled={saving} className="sm:order-1">
            Απόρριψη όλων
          </Button>
          {showDetails && (
            <Button variant="outline" onClick={savePreferences} disabled={saving} className="sm:order-2">
              Αποθήκευση επιλογών
            </Button>
          )}
          <Button onClick={acceptAll} disabled={saving} className="sm:order-3">
            Αποδοχή όλων
          </Button>
        </div>
      </div>
    </div>
  )
}
