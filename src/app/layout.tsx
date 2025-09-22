import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieConsentBanner from '@/components/CookieConsent'
import ConditionalGoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin', 'greek'] })

// Enhanced metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://www.mesia.gr'), // Added metadataBase for www canonical
  title: {
    template: '%s | Μεσιά Κιλκίς',
    default: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας'
  },
  description: 'Ιστοσελίδα του χωριού Μεσιά Κιλκίς. Ανακαλύψτε την ιστορία, τις εκδηλώσεις και τις φωτογραφίες του παραδοσιακού μας χωριού στη Μακεδονία.',
  keywords: ['Μεσιά', 'Κιλκίς', 'χωριό', 'Μακεδονία', 'Ελλάδα', 'παράδοση', 'ιστορία', 'εκδηλώσεις'],
  authors: [{ name: 'Μεσιά Κιλκίς' }],
  creator: 'Μεσιά Κιλκίς',
  publisher: 'Μεσιά Κιλκίς',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    url: 'https://www.mesia.gr', // Changed to www for consistency
    siteName: 'Μεσιά Κιλκίς',
    title: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας',
    description: 'Ιστοσελίδα του χωριού Μεσιά Κιλκίς. Ανακαλύψτε την ιστορία, τις εκδηλώσεις και τις φωτογραφίες του παραδοσιακού μας χωριού.',
    images: [
      {
        url: 'https://www.mesia.gr/images/og-image.jpg', // Changed to www
        width: 1200,
        height: 630,
        alt: 'Μεσιά Κιλκίς - Παραδοσιακό χωριό στη Μακεδονία',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Μεσιά Κιλκίς - Παραδοσιακό Χωριό',
    description: 'Ανακαλύψτε το παραδοσιακό χωριό Μεσιά στο Κιλκίς, Μακεδονία',
    creator: '@mesia_kilkis',
    images: ['https://www.mesia.gr/images/twitter-image.jpg'], // Changed to www
  },
  verification: {
    google: '2Xu5E66EEkrjwcbDpTpng8wP9jo57_p_lkN40R0DCe0',
  },
  alternates: {
    canonical: 'https://www.mesia.gr/', // Changed to www with trailing slash
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="el" className="scroll-smooth">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="GR-61" />
        <meta name="geo.placename" content="Μεσιά, Κιλκίς, Ελλάδα" />
        <meta name="geo.position" content="41.15;22.87" />
        <meta name="ICBM" content="41.15, 22.87" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#8B5A3C" />
      </head>
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
        
        <ConditionalGoogleAnalytics />
      </body>
    </html>
  )
}
