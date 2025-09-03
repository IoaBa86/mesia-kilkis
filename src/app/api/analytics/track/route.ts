// src/app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from "next/server"
import { analytics } from "@/lib/analytics"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, sessionId, userId, timeOnPage } = body

    const headersList = headers()
    const userAgent = headersList.get('user-agent') || undefined
    const referrer = headersList.get('referer') || undefined
    
    // In a real app, you might want to get country from IP
    // For now, we'll use a placeholder or integrate with a geo service
    const country = 'GR' // Default to Greece for Mesia Kilkis

    await analytics.trackPageView({
      path,
      userAgent,
      referrer,
      sessionId,
      userId,
      country,
      timeOnPage
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 })
  }
}
