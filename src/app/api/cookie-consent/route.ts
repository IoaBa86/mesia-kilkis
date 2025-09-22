import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    console.log('🍪 Cookie consent API called')
    
    const body = await request.json()
    console.log('📝 Request body:', body)
    
    const { consent, categories, consentType } = body
    
    // Validate required fields
    if (!consent) {
      console.error('❌ Missing consent field')
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

    // Anonymize IP (GDPR compliance)
    const anonymizeIP = (ip: string): string => {
      if (ip === 'unknown' || !ip.includes('.')) return ip
      const parts = ip.split('.')
      return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.0` : ip
    }

    const anonymizedIP = anonymizeIP(clientIP)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    console.log('🔍 Processing consent:', {
      consent,
      ip: anonymizedIP,
      categories: categories || {}
    })

    // Store in database
    const consentRecord = await prisma.cookieConsent.create({
      data: {
        ipAddress: anonymizedIP,
        consentGiven: consent === 'accepted',
        categories: categories || {},
        userAgent: userAgent.substring(0, 500),
        timestamp: new Date()
      }
    })

    console.log('✅ Consent stored successfully:', consentRecord.id)

    return NextResponse.json({ 
      success: true, 
      id: consentRecord.id 
    })

  } catch (error) {
    console.error('❌ Error storing cookie consent:', error)
    
    // Return detailed error for debugging
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to store consent',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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
