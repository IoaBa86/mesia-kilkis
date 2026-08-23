import type { Metadata } from 'next'
import { Inter, Alegreya, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieSettingsButton from '@/components/CookieSettingsButton'
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

        {/* Google Analytics — consent-gated: denied by default until Google's
            own Funding Choices consent message (configured in the AdSense
            dashboard, injected by the adsbygoogle script below) grants it */}
        <Script id="google-analytics-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied'
            });
            gtag('js', new Date());
            gtag('config', 'G-0JBJ2897HL');

            // Mirror Funding Choices' consent decisions into our own
            // GDPR audit log (/admin/consent-logs), since Funding Choices
            // itself only stores consent client-side / in Google's systems.
            var __origGtag = window.gtag;
            window.gtag = function () {
              __origGtag.apply(null, arguments);
              if (arguments[0] === 'consent' && arguments[1] === 'update') {
                var c = arguments[2] || {};
                var analyticsGranted = c.analytics_storage === 'granted';
                var adsGranted = c.ad_storage === 'granted';
                fetch('/api/cookie-consent', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    consent: (analyticsGranted || adsGranted) ? 'accepted' : 'declined',
                    categories: {
                      necessary: true,
                      analytics: analyticsGranted,
                      marketing: adsGranted
                    }
                  })
                }).catch(function () {});
              }
            };
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JBJ2897HL"
          strategy="afterInteractive"
        />
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

        <CookieSettingsButton />
      </body>
    </html>
  )
}
