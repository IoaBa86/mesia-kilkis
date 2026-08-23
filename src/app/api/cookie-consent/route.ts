import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const consentSchema = z.object({
  consent: z.enum(['accepted', 'declined']),
  categories: z.object({
    necessary: z.boolean().optional(),
    functional: z.boolean().optional(),
    analytics: z.boolean().optional(),
    marketing: z.boolean().optional(),
  }).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)

    // This is the one fully public, unauthenticated write endpoint on the
    // site (every visitor's browser calls it once per consent choice) — cap
    // it to stop it being used to flood the database.
    if (!rateLimit(`cookie-consent:${clientIp}`, 10, 60_000)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      )
    }

    const body = await request.json().catch(() => null)
    const parsed = consentSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }
    const { consent, categories } = parsed.data

    // Anonymize IP (GDPR compliance) — zero the last octet for IPv4, keep
    // only the first 3 hextets for IPv6.
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

    const anonymizedIP = anonymizeIP(clientIp)
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

// GET /api/cookie-consent - aggregate stats for the admin dashboard
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
