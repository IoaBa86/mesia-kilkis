// src/components/layout/Header.tsx - Weather widget always visible and responsive
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react'
import WeatherWidget from '@/components/weather/WeatherWidget'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-gradient-to-r from-mesia-wine via-mesia-wine to-mesia-darkText text-white shadow-xl">
      {/* Top Bar - Contact Info */}
      <div className="bg-mesia-darkText/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between py-2 text-sm">
            {/* Social Media Links */}
            <div className="flex items-center space-x-3">
              <a href="#" className="text-mesia-lightCream hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            {/* Weather Widget in Top Bar on Mobile */}
            <div className="flex items-center sm:hidden">
              {mounted && (
                <div className="scale-75 origin-right">
                  <WeatherWidget />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 sm:space-x-4 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-mesia-gold to-mesia-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-mesia-wine font-bold text-lg sm:text-xl font-greek">Μ</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-greek text-white group-hover:text-mesia-gold transition-colors duration-300 truncate">
                Μεσιά Κιλκίς
              </h1>
              <p className="text-mesia-lightCream text-xs sm:text-sm hidden sm:block">
                Παραδοσιακό Χωριό Κεντρικής Μακεδονίας
              </p>
            </div>
          </Link>

          {/* Weather Widget - Always Visible and Responsive */}
          <div className="flex items-center ml-4">
            {mounted && (
              <>
                {/* Desktop and Tablet Weather Widget */}
                <div className="hidden sm:block">
                  <WeatherWidget />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

   
    </header>
  )
}
