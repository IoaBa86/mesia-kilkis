// src/app/api/ad-slots/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// PUT /api/ad-slots/[id] - Update ad slot
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const adSlot = await prisma.adSlot.update({
      where: { id: params.id },
      data: {
        key,
        name,
        page,
        position,
        adClient,
        adSlotId,
        adFormat,
        isActive,
        order,
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
    console.error('Error updating ad slot:', error)
    return NextResponse.json(
      { error: 'Failed to update ad slot' },
      { status: 500 }
    )
  }
}

// DELETE /api/ad-slots/[id] - Delete ad slot
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.adSlot.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting ad slot:', error)
    return NextResponse.json(
      { error: 'Failed to delete ad slot' },
      { status: 500 }
    )
  }
}
