// src/components/layout/Navbar.tsx - Fully Responsive Version
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Building2, 
  Camera, 
  Map, 
  BookOpen, 
  Settings, 
  Calendar,
  Navigation,
  Menu,
  X
} from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Αρχική', icon: Home },
    { href: '/village', label: 'Το Χωριό', icon: Building2 },
    { href: '/access', label: 'Πώς να Έρθετε', icon: Navigation },
    { href: '/photos', label: 'Φωτογραφίες', icon: Camera },
    { href: '/area', label: 'Η Περιοχή', icon: Map },
    { href: '/history', label: 'Ιστορία', icon: BookOpen },
    { href: '/services', label: 'Υπηρεσίες', icon: Settings },
    { href: '/events', label: 'Εκδηλώσεις', icon: Calendar },
  ]

  const isActivePath = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname?.startsWith(path)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-mesia-gold/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
       

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = isActivePath(item.href)
                
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`
                        flex items-center space-x-2 px-3 py-2 transition-all duration-300 whitespace-nowrap
                        ${isActive 
                          ? 'bg-gradient-to-r from-mesia-wine to-mesia-wine/90 text-white shadow-lg' 
                          : 'text-mesia-darkText hover:text-mesia-wine hover:bg-mesia-gold/10'
                        }
                      `}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="text-mesia-wine hover:text-mesia-wine hover:bg-mesia-gold/10"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-3 space-y-1 bg-white/98 backdrop-blur-md border-t border-mesia-gold/20">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActivePath(item.href)
              
              return (
                <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                  <div className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-mesia-wine to-mesia-wine/90 text-white shadow-md' 
                      : 'text-mesia-darkText hover:text-mesia-wine hover:bg-mesia-gold/10'
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

      {/* Breadcrumb Bar */}
      <div className="bg-mesia-lightCream/30 border-b border-mesia-gold/20 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-2 text-sm text-mesia-lightText">
            <Link href="/" className="hover:text-mesia-wine transition-colors">
              Αρχική
            </Link>
            {pathname !== '/' && (
              <>
                <span>/</span>
                <span className="text-mesia-wine font-medium">
                  {navItems.find(item => item.href === pathname)?.label || 
                   pathname?.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}
