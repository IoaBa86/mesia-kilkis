import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowLeft, Eye, CheckCircle, XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { DeleteOlderControl } from './ConsentDeleteControls'

// Always fetch fresh — this is a live monitoring page.
export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const [counters, legacyCount] = await Promise.all([
      prisma.consentCounter.findMany(),
      prisma.cookieConsent.count(),
    ])
    const accepted = counters.find((c) => c.kind === 'accepted')?.count ?? 0
    const declined = counters.find((c) => c.kind === 'declined')?.count ?? 0
    return { accepted, declined, legacyCount }
  } catch (error) {
    console.error('Error fetching consent stats:', error)
    return { accepted: 0, declined: 0, legacyCount: 0 }
  }
}

export default async function CookieConsentLogsPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  const { accepted, declined, legacyCount } = await getStats()
  const total = accepted + declined

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <header className="bg-white shadow-sm border-b border-primary-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center space-x-4">
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Επιστροφή στο Admin
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Eye className="h-8 w-8 mr-3" />
              Στατιστικά επιλογών cookies
            </h1>
            <p className="text-gray-600">
              Μόνο συνολικοί αριθμοί. Δεν αποθηκεύεται IP, browser ή αναγνωριστικό.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Σύνολο επιλογών</h3>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" /> Αποδοχές
            </h3>
            <p className="text-3xl font-bold text-green-600">{accepted}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <XCircle className="h-5 w-5 mr-2 text-red-600" /> Απορρίψεις
            </h3>
            <p className="text-3xl font-bold text-red-600">{declined}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Μετράται κάθε φορά που ένας επισκέπτης κάνει επιλογή στο μήνυμα συναίνεσης. Ο ίδιος επισκέπτης μπορεί να μετρηθεί
          περισσότερες από μία φορές (π.χ. αν αλλάξει επιλογή), ενώ οι ανακλήσεις δεν διακρίνονται από τις απορρίψεις.
        </p>

        {legacyCount > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Παλαιές καταγραφές ανά επισκέπτη</h3>
            <p className="text-sm text-gray-600">
              Υπάρχουν {legacyCount} παλαιές καταγραφές (ανωνυμοποιημένη IP και browser) από την προηγούμενη λειτουργία. Δεν
              δημιουργούνται πλέον νέες. Μπορείτε να τις διαγράψετε.
            </p>
            <DeleteOlderControl />
          </div>
        )}
      </main>
    </div>
  )
}
