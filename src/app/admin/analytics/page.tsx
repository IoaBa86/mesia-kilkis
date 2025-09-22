import { analytics } from '@/lib/analytics'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Users, Eye, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getAnalyticsData() {
  try {
    const summary = await analytics.getAnalyticsSummary()
    return summary
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return null
  }
}

export default async function AnalyticsPage() {
  const analyticsData = await getAnalyticsData()

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-600">Σφάλμα φόρτωσης αναλυτικών δεδομένων</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mesia-cream via-mesia-lightCream to-mesia-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-mesia-gold/20">
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
                <h1 className="text-3xl font-bold text-mesia-wine flex items-center">
                  <TrendingUp className="h-8 w-8 mr-3" />
                  Αναλυτικά Στοιχεία
                </h1>
                <p className="text-gray-600">Στατιστικά επισκεπτότητας και χρήσης</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Σημερινοί Επισκέπτες</CardTitle>
              <Users className="h-4 w-4 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mesia-wine">{analyticsData.visitors.today}</div>
              <p className="text-xs text-gray-500">Εβδομάδα: {analyticsData.visitors.week}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Προβολές Σελίδων</CardTitle>
              <Eye className="h-4 w-4 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mesia-wine">{analyticsData.pageViews.today}</div>
              <p className="text-xs text-gray-500">Εβδομάδα: {analyticsData.pageViews.week}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Μέσος Χρόνος</CardTitle>
              <Clock className="h-4 w-4 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mesia-wine">{analyticsData.engagement.avgTimeOnSite}m</div>
              <p className="text-xs text-gray-500">Ανά επίσκεψη</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-mesia-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-mesia-wine">{Math.round(analyticsData.engagement.bounceRate)}%</div>
              <p className="text-xs text-gray-500">Τελευταίος μήνας</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Δημοφιλέστερες Σελίδες</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-mesia-gold">#{index + 1}</span>
                    <span className="font-medium">{page.path}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{page.views} προβολές</span>
                    <span>{page.avgTime}s μέσος χρόνος</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Πρόσφατη Δραστηριότητα</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm">{activity.action}</span>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
