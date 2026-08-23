// src/app/api/admin/village-voices/[id]/route.ts - Admin API for single village voice
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const voice = await prisma.villageVoice.findUnique({
      where: { id: params.id },
      include: { creator: { select: { name: true } } },
    })

    if (!voice) {
      return NextResponse.json({ error: 'Voice not found' }, { status: 404 })
    }

    return NextResponse.json({ voice })
  } catch (error) {
    console.error('Error fetching village voice:', error)
    return NextResponse.json({ error: 'Failed to fetch voice' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, authorName, title, content, imageUrl, isActive, order } = body

    const existing = await prisma.villageVoice.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Voice not found' }, { status: 404 })
    }

    const updated = await prisma.villageVoice.update({
      where: { id: params.id },
      data: {
        ...(type !== undefined && { type }),
        ...(authorName !== undefined && { authorName }),
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
      include: { creator: { select: { name: true } } },
    })

    return NextResponse.json({ voice: updated })
  } catch (error) {
    console.error('Error updating village voice:', error)
    return NextResponse.json({ error: 'Failed to update voice' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const existing = await prisma.villageVoice.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Voice not found' }, { status: 404 })
    }

    await prisma.villageVoice.delete({ where: { id: params.id } })

    return NextResponse.json({ message: 'Voice deleted successfully' })
  } catch (error) {
    console.error('Error deleting village voice:', error)
    return NextResponse.json({ error: 'Failed to delete voice' }, { status: 500 })
  }
}
