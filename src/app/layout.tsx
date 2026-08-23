import type { Metadata } from 'next'
import { Inter, Alegreya, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { prisma } from '@/lib/prisma'

const inter = Inter({ subsets: ['latin', 'greek'], variable: '--font-body' })
const alegreya = Alegreya({ subsets: ['latin', 'greek'], variable: '--font-display', weight: ['500', '600', '700', '800'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin', 'greek'], variable: '--font-mono', weight: ['400', '500', '600'] })

// Enhanced metadata for SEO - canonical host is www.mesia.gr (mesia.gr 301s to it)
export const metadata: Metadata = {
  metadataBase: new URL('https://www.mesia.gr'),
  title: {
    template: '%s | Μεσιά Κιλκίς',
    default: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας | Mesia Kilkis'
  },
  description: 'Το χωριό Μεσιά (Mesia) στην Περιφερειακή Ενότητα Κιλκίς, δημοτική ενότητα Ευρωπού. Ιστορία, εκδηλώσεις και φωτογραφίες του παραδοσιακού πεδινού χωριού στην Κεντρική Μακεδονία.',
  keywords: ['Μεσιά', 'Mesia', 'Μεσιά Κιλκίς', 'Mesia Kilkis', 'Κιλκίς', 'Ευρωπός', 'Ευρωπού', 'χωριό', 'Μακεδονία', 'Παιονία', 'ιστορία', 'εκδηλώσεις'],
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
    url: 'https://www.mesia.gr',
    siteName: 'Μεσιά Κιλκίς',
    title: 'Μεσιά Κιλκίς - Χωριό της Κεντρικής Μακεδονίας',
    description: 'Το χωριό Μεσιά (Mesia) στην Περιφερειακή Ενότητα Κιλκίς, δημοτική ενότητα Ευρωπού. Ιστορία, εκδηλώσεις και φωτογραφίες του χωριού.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Μεσιά Κιλκίς - Παραδοσιακό Χωριό',
    description: 'Ανακαλύψτε το παραδοσιακό χωριό Μεσιά στο Κιλκίς, Μακεδονία',
    creator: '@mesia_kilkis',
  },
  verification: {
    google: '2Xu5E66EEkrjwcbDpTpng8wP9jo57_p_lkN40R0DCe0',
  },
  alternates: {
    canonical: '/',
  },
}

async function getNavVisibility() {
  try {
    const config = await prisma.siteConfig.findUnique({ where: { key: 'general' } })
    const value = (config?.value as Record<string, unknown>) || {}
    return {
      showVillageVoices: Boolean(value.showVillageVoices),
      showDigitalMuseum: Boolean(value.showDigitalMuseum),
    }
  } catch (error) {
    console.error('Error loading nav visibility:', error)
    return { showVillageVoices: false, showDigitalMuseum: false }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navVisibility = await getNavVisibility()

  return (
    <html lang="el" className="scroll-smooth">
      <head>
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="GR-61" />
        <meta name="geo.placename" content="Μεσιά, Κιλκίς, Ελλάδα" />
        <meta name="geo.position" content="40.8825;22.5764" />
        <meta name="ICBM" content="40.8825, 22.5764" />

        {/* Theme color */}
        <meta name="theme-color" content="#753647" />

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
            <Navbar {...navVisibility} />
            <main className="flex-grow">
              {children}
            </main>
            <Footer {...navVisibility} />
          </div>
        </Providers>
      </body>
    </html>
  )
}
