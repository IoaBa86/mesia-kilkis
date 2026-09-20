import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

// Aggregate statistics only: increments one counter per outcome. No IP,
// user agent or identifier is stored (the IP is used in memory for rate
// limiting and then discarded).
const consentSchema = z.object({
  consent: z.enum(['accepted', 'declined']),
})

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(`cookie-consent:${getClientIp(request)}`, 10, 60_000)) {
      return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
    }

    const parsed = consentSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
    }

    const kind = parsed.data.consent
    await prisma.consentCounter.upsert({
      where: { kind },
      create: { kind, count: 1 },
      update: { count: { increment: 1 } },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating consent counter:', error)
    return NextResponse.json({ success: false, error: 'Failed to store consent' }, { status: 500 })
  }
}
