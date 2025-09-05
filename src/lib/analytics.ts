import { prisma } from "@/lib/prisma"

// Existing interfaces (keeping your original structure)
export interface AnalyticsEvent {
  path: string
  userAgent?: string
  referrer?: string
  sessionId: string
  userId?: string
  country?: string
  timeOnPage?: number
}

export interface AnalyticsSummary {
  visitors: { today: number; week: number; month: number }
  pageViews: { today: number; week: number; month: number }
  topPages: Array<{ path: string; views: number; avgTime: number }>
  engagement: { avgTimeOnSite: number; bounceRate: number }
  growth: { monthlyVisitors: number[]; monthlyLabels: string[] }
  recentActivity: Array<{ action: string; timestamp: string; path: string }>
}

// Google Analytics Integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

// CLIENT-SAFE: Google Analytics tracking functions (no Prisma)
export const trackGoogleAnalytics = {
  // Page view tracking
  pageView: (url: string, title: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title,
        page_location: window.location.href
      })
      
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: title,
        page_location: window.location.href
      })
      
      console.log('📊 GA Page view tracked:', url)
    }
  },

  // Custom events for village website
  photoView: (photoId: string, categoryName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'photo_view', {
        photo_id: photoId,
        category: categoryName,
        event_category: 'photos'
      })
    }
  },

  categoryFilter: (categoryName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'category_filter', {
        category: categoryName,
        event_category: 'navigation'
      })
    }
  },

  shareClick: (contentType: string, method: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        content_type: contentType,
        method: method,
        event_category: 'social'
      })
    }
  },

  contactForm: (formType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_form_submit', {
        form_type: formType,
        event_category: 'contact'
      })
    }
  },

  eventClick: (eventName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'event_click', {
        event_name: eventName,
        event_category: 'events'
      })
    }
  }
}

// CLIENT-SAFE: Dual analytics tracking (API calls instead of direct Prisma)
export const trackDualAnalytics = {
  async pageView(path: string, title: string, sessionData: Partial<AnalyticsEvent>) {
    try {
      // Track in Google Analytics immediately (client-side)
      trackGoogleAnalytics.pageView(path, title)
      
      // Track in YOUR custom system via API call (no direct Prisma!)
      if (typeof window !== 'undefined') {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'pageview',
            path,
            title,
            sessionId: sessionData.sessionId || generateSessionId(),
            userAgent: sessionData.userAgent || navigator.userAgent,
            referrer: sessionData.referrer || document.referrer || undefined,
            userId: sessionData.userId,
            country: sessionData.country
          })
        }).catch(error => {
          console.warn('Custom analytics tracking failed:', error)
        })
      }
      
    } catch (error) {
      console.error('Dual analytics error:', error)
    }
  },

  photoView(photoId: string, categoryName: string) {
    // Track in Google Analytics
    trackGoogleAnalytics.photoView(photoId, categoryName)
    
    // Optional: Also send to your custom analytics API
    if (typeof window !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'photo_view',
          photoId,
          categoryName
        })
      }).catch(error => console.warn('Photo view tracking failed:', error))
    }
  },

  shareClick(contentType: string, method: string) {
    trackGoogleAnalytics.shareClick(contentType, method)
    
    // Track share events in custom analytics
    if (typeof window !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'share_click',
          contentType,
          method
        })
      }).catch(error => console.warn('Share tracking failed:', error))
    }
  },

  categoryFilter(categoryName: string) {
    trackGoogleAnalytics.categoryFilter(categoryName)
  },

  contactForm(formType: string) {
    trackGoogleAnalytics.contactForm(formType)
  },

  eventClick(eventName: string) {
    trackGoogleAnalytics.eventClick(eventName)
  }
}

// Utility function to generate session ID
function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// SERVER-SIDE ONLY: AnalyticsTracker class (for API routes only)
class AnalyticsTracker {
  async trackPageView(data: AnalyticsEvent): Promise<void> {
    try {
      // Record page view in your database
      await prisma.pageView.create({
        data: {
          path: data.path,
          userAgent: data.userAgent,
          referrer: data.referrer,
          sessionId: data.sessionId,
          userId: data.userId,
          country: data.country,
          timeOnPage: data.timeOnPage
        }
      })

      // Update or create session
      await this.updateSession(data.sessionId, data)
      
      // Update content analytics
      await this.updateContentAnalytics(data.path)
      
      console.log('📊 Custom analytics tracked:', data.path)
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }
  }

  private async updateSession(sessionId: string, data: AnalyticsEvent): Promise<void> {
    try {
      const session = await prisma.analyticsSession.findUnique({
        where: { sessionId }
      })

      if (session) {
        // Update existing session
        await prisma.analyticsSession.update({
          where: { sessionId },
          data: {
            endTime: new Date(),
            totalPages: { increment: 1 },
            bounced: false // More than 1 page = not bounced
          }
        })
      } else {
        // Create new session
        await prisma.analyticsSession.create({
          data: {
            sessionId,
            userId: data.userId,
            country: data.country,
            device: this.extractDevice(data.userAgent),
            browser: this.extractBrowser(data.userAgent)
          }
        })
      }
    } catch (error) {
      console.error('Session update error:', error)
    }
  }

  private async updateContentAnalytics(path: string): Promise<void> {
    try {
      const contentType = this.getContentType(path)
      const contentId = this.extractContentId(path)

      await prisma.contentAnalytics.upsert({
        where: {
          contentType_contentId: { contentType, contentId }
        },
        update: {
          views: { increment: 1 }
        },
        create: {
          contentType,
          contentId,
          path,
          views: 1
        }
      })
    } catch (error) {
      console.error('Content analytics error:', error)
    }
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    try {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      // Get visitor counts
      const [todayVisitors, weekVisitors, monthVisitors] = await Promise.all([
        prisma.analyticsSession.count({ where: { startTime: { gte: today } } }),
        prisma.analyticsSession.count({ where: { startTime: { gte: weekAgo } } }),
        prisma.analyticsSession.count({ where: { startTime: { gte: monthAgo } } })
      ])

      // Get page view counts
      const [todayViews, weekViews, monthViews] = await Promise.all([
        prisma.pageView.count({ where: { timestamp: { gte: today } } }),
        prisma.pageView.count({ where: { timestamp: { gte: weekAgo } } }),
        prisma.pageView.count({ where: { timestamp: { gte: monthAgo } } })
      ])

      // Get top pages
      const topPagesRaw = await prisma.pageView.groupBy({
        by: ['path'],
        _count: { path: true },
        _avg: { timeOnPage: true },
        where: { timestamp: { gte: monthAgo } },
        orderBy: { _count: { path: 'desc' } },
        take: 10
      })

      const topPages = topPagesRaw.map(page => ({
        path: page.path,
        views: page._count.path,
        avgTime: Math.round(page._avg.timeOnPage || 0)
      }))

      // Calculate engagement metrics
      const sessions = await prisma.analyticsSession.findMany({
        where: { startTime: { gte: monthAgo } }
      })

      const totalSessions = sessions.length
      const bouncedSessions = sessions.filter(s => s.bounced).length
      const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0

      const avgTimeOnSite = await this.calculateAverageTimeOnSite(monthAgo)

      // Get monthly growth data
      const { monthlyVisitors, monthlyLabels } = await this.getMonthlyGrowthData()

      // Get recent activity
      const recentActivity = await this.getRecentActivity()

      return {
        visitors: { today: todayVisitors, week: weekVisitors, month: monthVisitors },
        pageViews: { today: todayViews, week: weekViews, month: monthViews },
        topPages,
        engagement: { avgTimeOnSite, bounceRate },
        growth: { monthlyVisitors, monthlyLabels },
        recentActivity
      }
    } catch (error) {
      console.error('Analytics summary error:', error)
      
      // Return empty summary on error
      return {
        visitors: { today: 0, week: 0, month: 0 },
        pageViews: { today: 0, week: 0, month: 0 },
        topPages: [],
        engagement: { avgTimeOnSite: 0, bounceRate: 0 },
        growth: { monthlyVisitors: [], monthlyLabels: [] },
        recentActivity: []
      }
    }
  }

  private async calculateAverageTimeOnSite(since: Date): Promise<number> {
    try {
      const pageViews = await prisma.pageView.findMany({
        where: { 
          timestamp: { gte: since },
          timeOnPage: { not: null }
        },
        select: { timeOnPage: true }
      })

      if (pageViews.length === 0) return 0

      const totalTime = pageViews.reduce((sum, view) => sum + (view.timeOnPage || 0), 0)
      return Math.round((totalTime / pageViews.length) / 60) // Convert to minutes
    } catch (error) {
      console.error('Average time calculation error:', error)
      return 0
    }
  }

  private async getMonthlyGrowthData(): Promise<{ monthlyVisitors: number[]; monthlyLabels: string[] }> {
    try {
      const monthlyData = []
      const labels = []
      
      for (let i = 11; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

        const visitors = await prisma.analyticsSession.count({
          where: {
            startTime: { gte: startOfMonth, lte: endOfMonth }
          }
        })

        monthlyData.push(visitors)
        labels.push(date.toLocaleDateString('el-GR', { month: 'short', year: 'numeric' }))
      }

      return { monthlyVisitors: monthlyData, monthlyLabels: labels }
    } catch (error) {
      console.error('Growth data error:', error)
      return { monthlyVisitors: [], monthlyLabels: [] }
    }
  }

  private async getRecentActivity(): Promise<Array<{ action: string; timestamp: string; path: string }>> {
    try {
      const recentViews = await prisma.pageView.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
        select: { path: true, timestamp: true }
      })

      return recentViews.map(view => ({
        action: `Επίσκεψη σελίδας: ${this.getPageTitle(view.path)}`,
        timestamp: view.timestamp.toLocaleString('el-GR'),
        path: view.path
      }))
    } catch (error) {
      console.error('Recent activity error:', error)
      return []
    }
  }

  private getContentType(path: string): string {
    if (path.startsWith('/photos')) return 'photo'
    if (path.startsWith('/events')) return 'event'
    if (path.startsWith('/village')) return 'village'
    if (path.startsWith('/history')) return 'history'
    return 'page'
  }

  private extractContentId(path: string): string {
    const segments = path.split('/')
    return segments[segments.length - 1] || 'home'
  }

  private getPageTitle(path: string): string {
    const titles: { [key: string]: string } = {
      '/': 'Αρχική',
      '/photos': 'Φωτογραφίες',
      '/events': 'Εκδηλώσεις',
      '/village': 'Το Χωριό',
      '/history': 'Ιστορία',
      '/area': 'Η Περιοχή',
      '/contact': 'Επικοινωνία',
      '/admin': 'Διαχείριση'
    }
    return titles[path] || path
  }

  private extractDevice(userAgent?: string): string {
    if (!userAgent) return 'Unknown'
    if (/Mobile|Android|iPhone|iPad/.test(userAgent)) return 'Mobile'
    if (/Tablet/.test(userAgent)) return 'Tablet'
    return 'Desktop'
  }

  private extractBrowser(userAgent?: string): string {
    if (!userAgent) return 'Unknown'
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    return 'Other'
  }
}

// Export the main analytics instance (SERVER-SIDE ONLY)
export const analytics = new AnalyticsTracker()
