import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Either delete one record by id, or every record older than N days.
const deleteSchema = z.union([
  z.object({ id: z.string().min(1) }),
  z.object({ olderThanDays: z.number().int().min(0).max(3650) }),
])

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = deleteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    if ('id' in parsed.data) {
      const { count } = await prisma.cookieConsent.deleteMany({ where: { id: parsed.data.id } })
      return NextResponse.json({ success: true, deleted: count })
    }

    const cutoff = new Date(Date.now() - parsed.data.olderThanDays * 24 * 60 * 60 * 1000)
    const { count } = await prisma.cookieConsent.deleteMany({ where: { timestamp: { lt: cutoff } } })
    return NextResponse.json({ success: true, deleted: count })
  } catch (error) {
    console.error('Error deleting consent logs:', error)
    return NextResponse.json({ error: 'Failed to delete consent logs' }, { status: 500 })
  }
}
