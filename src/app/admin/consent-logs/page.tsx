import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ArrowLeft, Eye, CheckCircle, XCircle } from 'lucide-react'

const prisma = new PrismaClient()

async function getConsentLogs() {
  try {
    const [stats, recentConsents, totalCount] = await Promise.all([
      prisma.cookieConsent.groupBy({
        by: ['consentGiven'],
        _count: true
      }),
      prisma.cookieConsent.findMany({
        select: {
          id: true,
          ipAddress: true,
          consentGiven: true,
          timestamp: true,
          categories: true,
          userAgent: true
        },
        orderBy: { timestamp: 'desc' },
        take: 100
      }),
      prisma.cookieConsent.count()
    ])

    return { 
      stats, 
      recentConsents, 
      totalCount,
      acceptedCount: stats.find(s => s.consentGiven)?._count || 0,
      declinedCount: stats.find(s => !s.consentGiven)?._count || 0
    }
  } catch (error) {
    console.error('Error fetching consent logs:', error)
    return { 
      stats: [], 
      recentConsents: [], 
      totalCount: 0,
      acceptedCount: 0,
      declinedCount: 0
    }
  }
}

export default async function CookieConsentLogsPage() {
  const { stats, recentConsents, totalCount, acceptedCount, declinedCount } = await getConsentLogs()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-primary-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
                  Καταγραφές Cookie Consent
                </h1>
                <p className="text-gray-600">Παρακολούθηση αποδοχών και απορρίψεων cookies</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Σύνολο Καταγραφών</h3>
                <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Αποδοχές</h3>
                <p className="text-3xl font-bold text-green-600">{acceptedCount}</p>
                <p className="text-sm text-gray-500">
                  {totalCount > 0 ? Math.round((acceptedCount / totalCount) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Απορρίψεις</h3>
                <p className="text-3xl font-bold text-red-600">{declinedCount}</p>
                <p className="text-sm text-gray-500">
                  {totalCount > 0 ? Math.round((declinedCount / totalCount) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Consent Logs Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Πρόσφατες Καταγραφές Consent</h3>
            <p className="text-sm text-gray-500 mt-1">
              Εμφανίζονται οι {Math.min(100, totalCount)} πιο πρόσφατες καταγραφές
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ημερομηνία & Ώρα
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address (Ανωνυμοποιημένη)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Απόφαση
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Κατηγορίες Cookies
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Browser
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentConsents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Eye className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">Δεν υπάρχουν καταγραφές</p>
                        <p className="text-sm">Οι καταγραφές consent θα εμφανιστούν εδώ</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  recentConsents.map((consent) => (
                    <tr key={consent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(consent.timestamp).toLocaleString('el-GR', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {consent.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          consent.consentGiven 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {consent.consentGiven ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Αποδοχή
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Απόρριψη
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="space-y-1">
                          {consent.categories && typeof consent.categories === 'object' ? (
                            Object.entries(consent.categories as Record<string, boolean>).map(([category, enabled]) => (
                              <div key={category} className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-400' : 'bg-gray-300'}`}></span>
                                <span className="text-xs capitalize">{category}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">Δεν υπάρχουν δεδομένα</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={consent.userAgent || 'N/A'}>
                        {consent.userAgent ? (
                          consent.userAgent.length > 50 
                            ? `${consent.userAgent.substring(0, 50)}...`
                            : consent.userAgent
                        ) : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
