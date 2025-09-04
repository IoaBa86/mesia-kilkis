// src/app/layout.tsx - Fixed version
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'  
import Footer from '@/components/layout/Footer'
import CookieConsentBanner from '@/components/CookieConsent'
import ConditionalGoogleAnalytics from '@/components/GoogleAnalytics'  // NEW

const inter = Inter({ subsets: ['latin', 'greek'] })

export const metadata: Metadata = {
  title: {
    template: '%s - Μεσιά Κιλκίς',
    default: 'Μεσιά Κιλκίς - Χωριό Κεντρικής Μακεδονίας'
  },
  description: 'Ιστοσελίδα για το χωριό Μεσιά Κιλκίς. Εκδηλώσεις, φωτογραφίες, ιστορία και πληροφορίες για το παραδοσιακό μας χωριό.',
  keywords: ['Μεσιά', 'Κιλκίς', 'χωριό', 'Μακεδονία', 'εκδηλώσεις', 'παράδοση'],
  authors: [{ name: 'Κοινότητα Μεσιάς Κιλκίς' }],
  openGraph: {
    title: 'Μεσιά Κιλκίς - Παραδοσιακό Χωριό',
    description: 'Ιστοσελίδα για το χωριό Μεσιά Κιλκίς',
    url: 'https://mesia.gr',
    siteName: 'Μεσιά Κιλκίς',
    locale: 'el_GR',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Navbar />
            <main className="flex-grow">        
              {children}
            </main>
            <CookieConsentBanner />
            <Footer />
          </div>
        </Providers>
        {/* Google Analytics - loads only after cookie consent */}
        <ConditionalGoogleAnalytics />
      </body>
    </html>
  )
}
