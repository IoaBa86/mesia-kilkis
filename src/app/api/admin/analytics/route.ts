// src/app/api/admin/analytics/route.ts - Main Analytics API for Admin Dashboard
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔍 Admin Analytics: Fetching analytics data...')

    // Get date ranges
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get visitor counts from database
    const [todayVisitors, weekVisitors, monthVisitors] = await Promise.all([
      prisma.analyticsSession.count({ where: { startTime: { gte: today } } }),
      prisma.analyticsSession.count({ where: { startTime: { gte: weekAgo } } }),
      prisma.analyticsSession.count({ where: { startTime: { gte: monthAgo } } })
    ])

    console.log('👥 Visitor counts:', { todayVisitors, weekVisitors, monthVisitors })

    // Get page view counts
    const [todayViews, weekViews, monthViews] = await Promise.all([
      prisma.pageView.count({ where: { timestamp: { gte: today } } }),
      prisma.pageView.count({ where: { timestamp: { gte: weekAgo } } }),
      prisma.pageView.count({ where: { timestamp: { gte: monthAgo } } })
    ])

    console.log('📄 Page view counts:', { todayViews, weekViews, monthViews })

    // Get top pages from last 30 days
    const topPagesRaw = await prisma.pageView.groupBy({
      by: ['path'],
      _count: { path: true },
      _avg: { timeOnPage: true },
      where: { 
        timestamp: { gte: monthAgo },
        path: { not: { startsWith: '/admin' } } // Exclude admin pages
      },
      orderBy: { _count: { path: 'desc' } },
      take: 10
    })

    const topPages = topPagesRaw.map(page => ({
      path: page.path,
      views: page._count.path,
      avgTime: Math.round(page._avg.timeOnPage || 0)
    }))

    console.log('📊 Top pages:', topPages)

    // Calculate engagement metrics
    const sessions = await prisma.analyticsSession.findMany({
      where: { startTime: { gte: monthAgo } }
    })

    const totalSessions = sessions.length
    const bouncedSessions = sessions.filter(s => s.bounced).length
    const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0

    // Calculate average time on site
    const pageViews = await prisma.pageView.findMany({
      where: { 
        timestamp: { gte: monthAgo },
        timeOnPage: { not: null }
      },
      select: { timeOnPage: true }
    })

    const avgTimeOnSite = pageViews.length > 0 
      ? Math.round(pageViews.reduce((sum, view) => sum + (view.timeOnPage || 0), 0) / pageViews.length / 60)
      : 0

    console.log('⚡ Engagement:', { totalSessions, bouncedSessions, bounceRate, avgTimeOnSite })

    // Get recent activity
    const recentActivity = await prisma.pageView.findMany({
      take: 10,
      orderBy: { timestamp: 'desc' },
      where: { path: { not: { startsWith: '/admin' } } },
      select: { path: true, timestamp: true }
    })

    const formattedActivity = recentActivity.map(view => ({
      action: `Επίσκεψη σελίδας: ${getPageTitle(view.path)}`,
      timestamp: view.timestamp.toLocaleString('el-GR'),
      path: view.path
    }))

    // Get monthly growth data (simplified - last 6 months)
    const monthlyVisitors = []
    const monthlyLabels = []
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      const visitors = await prisma.analyticsSession.count({
        where: {
          startTime: { gte: startOfMonth, lte: endOfMonth }
        }
      })

      monthlyVisitors.push(visitors)
      monthlyLabels.push(date.toLocaleDateString('el-GR', { month: 'short', year: 'numeric' }))
    }

    // Get content stats
    const [categoriesCount, photosCount, eventsCount] = await Promise.all([
      prisma.category.count({ where: { isActive: true } }),
      prisma.photo.count({ where: { isActive: true } }),
      prisma.event.count({ where: { isActive: true } })
    ])

    const analyticsData = {
      visitors: { today: todayVisitors, week: weekVisitors, month: monthVisitors },
      pageViews: { today: todayViews, week: weekViews, month: monthViews },
      topPages,
      engagement: { avgTimeOnSite, bounceRate },
      growth: { monthlyVisitors, monthlyLabels },
      recentActivity: formattedActivity,
      contentStats: { categories: categoriesCount, photos: photosCount, events: eventsCount }
    }

    console.log('✅ Admin Analytics: Returning data:', analyticsData)

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error('💥 Admin Analytics error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

// Helper function to get readable page titles
function getPageTitle(path: string): string {
  const titles: { [key: string]: string } = {
    '/': 'Αρχική',
    '/photos': 'Φωτογραφίες',
    '/events': 'Εκδηλώσεις',
    '/village': 'Το Χωριό',
    '/history': 'Ιστορία',
    '/area': 'Η Περιοχή',
    '/services': 'Υπηρεσίες'
  }
  return titles[path] || path
}
