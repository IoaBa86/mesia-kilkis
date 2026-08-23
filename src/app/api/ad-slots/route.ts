// src/app/api/ad-slots/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/ad-slots - Fetch ad slots. ?page=home&activeOnly=1 for public consumption.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const key = searchParams.get('key')
    const activeOnly = searchParams.get('activeOnly')

    const adSlots = await prisma.adSlot.findMany({
      where: {
        ...(page ? { page } : {}),
        ...(key ? { key } : {}),
        ...(activeOnly ? { isActive: true } : {}),
      },
      orderBy: [{ page: 'asc' }, { order: 'asc' }],
    })

    return NextResponse.json(adSlots)
  } catch (error) {
    console.error('Error fetching ad slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ad slots' },
      { status: 500 }
    )
  }
}

// POST /api/ad-slots - Create new ad slot
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { key, name, page, position, adClient, adSlotId, adFormat, isActive, order } = body

    if (!key || !name || !page || !position || !adClient || !adSlotId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const adSlot = await prisma.adSlot.create({
      data: {
        key,
        name,
        page,
        position,
        adClient,
        adSlotId,
        adFormat: adFormat || 'auto',
        isActive: isActive ?? true,
        order: order ?? 0,
      },
    })

    return NextResponse.json(adSlot)
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'A slot with this key already exists' },
        { status: 409 }
      )
    }
    console.error('Error creating ad slot:', error)
    return NextResponse.json(
      { error: 'Failed to create ad slot' },
      { status: 500 }
    )
  }
}
