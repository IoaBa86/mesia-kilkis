// src/components/layout/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import WeatherWidget from '@/components/weather/WeatherWidget'

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-mesia-darkText text-mesia-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 text-xs font-mono tracking-wide">
          <a
            href="#"
            className="flex items-center gap-2 hover:text-mesia-gold transition-colors flex-shrink-0"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="hidden sm:inline">Facebook</span>
          </a>

          <div className="hidden sm:block uppercase tracking-[0.14em]">
            40°52′57″N · 22°34′35″E
          </div>

          <div className="flex-shrink-0">
            {mounted && <WeatherWidget compact />}
          </div>
        </div>
      </div>
    </div>
  )
}
