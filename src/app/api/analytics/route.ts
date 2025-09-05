import { NextRequest, NextResponse } from 'next/server'
import { analytics, AnalyticsEvent } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { type, ...eventData } = data

    console.log('📊 Analytics API called:', type, eventData)

    switch (type) {
      case 'pageview':
        await analytics.trackPageView({
          path: eventData.path,
          userAgent: request.headers.get('user-agent') || undefined,
          referrer: request.headers.get('referer') || undefined,
          sessionId: eventData.sessionId || generateSessionId(),
          userId: eventData.userId,
          country: eventData.country,
          timeOnPage: eventData.timeOnPage
        })
        break

      case 'photo_view':
        // You can extend this to track photo views in your custom system too
        console.log('Photo view:', eventData.photoId, eventData.categoryName)
        break

      default:
        console.warn('Unknown analytics event type:', type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

// GET endpoint for analytics dashboard data (server-side only)
export async function GET() {
  try {
    const summary = await analytics.getAnalyticsSummary()
    return NextResponse.json(summary)
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function generateSessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
