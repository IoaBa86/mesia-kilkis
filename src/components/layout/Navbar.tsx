// src/components/layout/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  Camera,
  Map,
  BookOpen,
  Calendar,
  Navigation,
  Menu,
  X
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Αρχική', icon: Home },
  { href: '/village', label: 'Το Χωριό', icon: Building2 },
  { href: '/access', label: 'Πώς να Έρθετε', icon: Navigation },
  { href: '/photos', label: 'Φωτογραφίες', icon: Camera },
  { href: '/area', label: 'Η Περιοχή', icon: Map },
  { href: '/history', label: 'Ιστορία', icon: BookOpen },
  { href: '/events', label: 'Εκδηλώσεις', icon: Calendar },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname?.startsWith(path)
  }

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav className="bg-mesia-cream/95 backdrop-blur-md border-b border-mesia-gold/25 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="flex h-11 w-11 items-center justify-center border-2 border-mesia-wine bg-mesia-wine text-mesia-gold font-greek font-bold text-xl">
                Μ
              </div>
              <div className="min-w-0 hidden sm:block">
                <p className="text-xl font-bold font-greek text-mesia-wine leading-none">
                  Μεσιά Κιλκίς
                </p>
                <p className="text-mesia-lightText text-[11px] font-mono uppercase tracking-[0.12em] mt-1">
                  Κεντρική Μακεδονία
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = isActivePath(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap
                      ${isActive
                        ? 'text-mesia-wine'
                        : 'text-mesia-darkText/70 hover:text-mesia-wine'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute left-4 right-4 -bottom-[1px] h-[2px] bg-mesia-gold" aria-hidden="true" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center text-mesia-wine border border-mesia-gold/30"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-3 space-y-1 bg-mesia-cream border-t border-mesia-gold/20">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActivePath(item.href)

              return (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                  <div className={`
                    flex items-center gap-3 px-4 py-3 transition-colors duration-200 border-l-2
                    ${isActive
                      ? 'bg-white border-mesia-gold text-mesia-wine'
                      : 'border-transparent text-mesia-darkText/70 hover:text-mesia-wine hover:bg-white/60'
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
