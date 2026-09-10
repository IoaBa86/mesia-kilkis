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

// Explicit static weights (not the default variable-font build) — the
// variable font's self-hosted bold cut was silently missing Greek glyphs
// (e.g. "ω" rendered as tofu in <strong>/bold text) while regular weight
// and document.fonts.check() both looked fine. Static per-weight files
// sidestep whatever merge step drops the subset.
const inter = Inter({ subsets: ['latin', 'greek'], variable: '--font-body', weight: ['400', '500', '600', '700', '800'] })
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

                // Consent Mode only applies "granted" to events fired AFTER
                // the update — it never retroactively resends the page_view
                // that already went out (denied) on load. Without this, a
                // visitor who accepts and then just stays on the page never
                // produces a single consented hit, so they never show up in
                // Realtime at all.
                if (analyticsGranted) {
                  __origGtag('event', 'page_view');
                }

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

            // --- Funding Choices -> Google Consent Mode bridge ---
            // Funding Choices is an IAB TCF CMP: it publishes the visitor's
            // choice through __tcfapi and googlefc, but it never calls
            // gtag('consent','update') itself. Without this bridge,
            // analytics_storage stays 'denied' forever no matter how many
            // people accept, so GA only ever receives cookieless pings and
            // nobody shows up in Realtime.
            (function () {
              var applied = '';

              function applyConsent(analyticsOk, adsOk, adUserDataOk, adPersonalizationOk) {
                var fingerprint = [analyticsOk, adsOk, adUserDataOk, adPersonalizationOk].join('|');
                if (fingerprint === applied) return;
                applied = fingerprint;
                window.gtag('consent', 'update', {
                  analytics_storage: analyticsOk ? 'granted' : 'denied',
                  ad_storage: adsOk ? 'granted' : 'denied',
                  ad_user_data: adUserDataOk ? 'granted' : 'denied',
                  ad_personalization: adPersonalizationOk ? 'granted' : 'denied'
                });
              }

              // Preferred source: Funding Choices' own Consent Mode values,
              // when the message has consent mode configured in AdSense.
              window.googlefc = window.googlefc || {};
              window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
              window.googlefc.callbackQueue.push({
                CONSENT_DATA_READY: function () {
                  try {
                    var GRANTED = 1;
                    var v = window.googlefc.getGoogleConsentModeValues();
                    // Only trust these when they're actually configured —
                    // otherwise every purpose comes back NOT_CONFIGURED (4)
                    // and we'd wrongly downgrade a real TCF grant to denied.
                    if (v && v.analyticsStoragePurposeConsentStatus !== 4) {
                      applyConsent(
                        v.analyticsStoragePurposeConsentStatus === GRANTED,
                        v.adStoragePurposeConsentStatus === GRANTED,
                        v.adUserDataPurposeConsentStatus === GRANTED,
                        v.adPersonalizationPurposeConsentStatus === GRANTED
                      );
                    }
                  } catch (e) {}
                }
              });

              // Fallback that works even when Consent Mode isn't configured
              // on the AdSense message: read the TCF purpose consents directly.
              function listenToTcf() {
                if (typeof window.__tcfapi !== 'function') return false;
                window.__tcfapi('addEventListener', 2, function (tcData, success) {
                  if (!success || !tcData) return;
                  if (tcData.eventStatus !== 'tcloaded' && tcData.eventStatus !== 'useractioncomplete') return;
                  var p = (tcData.purpose && tcData.purpose.consents) || {};
                  var storage = !!p[1];
                  applyConsent(
                    storage && !!p[8],            // measure content performance
                    storage,
                    storage && !!p[7],            // measure ad performance
                    storage && !!p[3] && !!p[4]   // ad profile + personalised ads
                  );
                });
                return true;
              }

              if (!listenToTcf()) {
                var tries = 0;
                var poll = setInterval(function () {
                  if (listenToTcf() || ++tries > 40) clearInterval(poll);
                }, 250);
              }
            })();
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
