import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { consent, categories } = body
    
    // Validate required fields
    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'Missing consent field' },
        { status: 400 }
      )
    }

    // Extract IP address
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')

    let clientIP = 'unknown'
    if (forwardedFor) {
      clientIP = forwardedFor.split(',')[0].trim()
    } else if (realIP) {
      clientIP = realIP
    }

    // Anonymize IP (GDPR compliance) — zero the last octet for IPv4, keep
    // only the first 3 hextets for IPv6 (mirrors the IPv4 anonymization
    // level; a bare `.includes('.')` check previously let IPv6 addresses
    // through completely un-anonymized)
    const anonymizeIP = (ip: string): string => {
      if (ip.includes('.')) {
        const parts = ip.split('.')
        return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.0` : ip
      }
      if (ip.includes(':')) {
        const parts = ip.split(':').filter(Boolean)
        return parts.length >= 3 ? `${parts[0]}:${parts[1]}:${parts[2]}::` : ip
      }
      return ip
    }

    const anonymizedIP = anonymizeIP(clientIP)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const consentRecord = await prisma.cookieConsent.create({
      data: {
        ipAddress: anonymizedIP,
        consentGiven: consent === 'accepted',
        categories: categories || {},
        userAgent: userAgent.substring(0, 500),
        timestamp: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      id: consentRecord.id
    })

  } catch (error) {
    console.error('Error storing cookie consent:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to store consent' },
      { status: 500 }
    )
  }
}

// GET endpoint for admin dashboard stats
export async function GET() {
  try {
    const totalCount = await prisma.cookieConsent.count()
    const acceptedCount = await prisma.cookieConsent.count({
      where: { consentGiven: true }
    })
    const declinedCount = totalCount - acceptedCount

    return NextResponse.json({
      totalCount,
      acceptedCount,
      declinedCount
    })
  } catch (error) {
    console.error('Error fetching consent stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
