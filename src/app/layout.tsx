import type { Metadata } from 'next'
import { Inter, Alegreya, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SimplePageTracker from '@/components/SimplePageTracker'

const inter = Inter({ subsets: ['latin', 'greek'], variable: '--font-body' })
const alegreya = Alegreya({ subsets: ['latin', 'greek'], variable: '--font-display', weight: ['500', '600', '700', '800'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'greek'], variable: '--font-mono', weight: ['400', '500', '600'] })

// Enhanced metadata for SEO - Updated to use correct domain
export const metadata: Metadata = {
  metadataBase: new URL('https://mesia.gr'),
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
    url: 'https://mesia.gr',
    siteName: 'Μεσιά Κιλκίς',
    title: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας',
    description: 'Ιστοσελίδα του χωριού Μεσιά Κιλκίς. Ανακαλύψτε την ιστορία, τις εκδηλώσεις και τις φωτογραφίες του παραδοσιακού μας χωριού.',
    images: [
      {
        url: 'https://mesia.gr/images/og-image.jpg',
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
    images: ['https://mesia.gr/images/twitter-image.jpg'],
  },
  verification: {
    google: '2Xu5E66EEkrjwcbDpTpng8wP9jo57_p_lkN40R0DCe0',
  },
  alternates: {
    canonical: 'https://mesia.gr/',
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

        {/* Usercentrics CMP - Cookie Consent Management */}
        <Script
          id="usercentrics-cmp"
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          data-settings-id="AwAIUZcb10Nqhx"
          strategy="beforeInteractive"
        />

        {/* Google Analytics - Direct Implementation */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JBJ2897HL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0JBJ2897HL', {
              debug_mode: true
            });
            console.log('📊 Google Analytics loaded directly');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${alegreya.variable} ${jetbrainsMono.variable} ${inter.className} antialiased`}>
        {/* Google AdSense Script */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1184028367307988"
          strategy="beforeInteractive"
        />
        
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <Navbar />
            <main className="flex-grow">        
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        
        {/* Page Tracker for Client-Side Navigation */}
        <SimplePageTracker />
      </body>
    </html>
  )
}
