// src/app/api/admin/museum-exhibits/[id]/route.ts - Admin API for single museum exhibit
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

    const exhibit = await prisma.museumExhibit.findUnique({
      where: { id: params.id },
      include: { creator: { select: { name: true } } },
    })

    if (!exhibit) {
      return NextResponse.json({ error: 'Exhibit not found' }, { status: 404 })
    }

    return NextResponse.json({ exhibit })
  } catch (error) {
    console.error('Error fetching museum exhibit:', error)
    return NextResponse.json({ error: 'Failed to fetch exhibit' }, { status: 500 })
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
    const { type, title, description, imageUrl, mediaUrl, isActive, order } = body

    const existing = await prisma.museumExhibit.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Exhibit not found' }, { status: 404 })
    }

    const updated = await prisma.museumExhibit.update({
      where: { id: params.id },
      data: {
        ...(type !== undefined && { type }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(mediaUrl !== undefined && { mediaUrl }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
      include: { creator: { select: { name: true } } },
    })

    return NextResponse.json({ exhibit: updated })
  } catch (error) {
    console.error('Error updating museum exhibit:', error)
    return NextResponse.json({ error: 'Failed to update exhibit' }, { status: 500 })
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

    const existing = await prisma.museumExhibit.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Exhibit not found' }, { status: 404 })
    }

    await prisma.museumExhibit.delete({ where: { id: params.id } })

    return NextResponse.json({ message: 'Exhibit deleted successfully' })
  } catch (error) {
    console.error('Error deleting museum exhibit:', error)
    return NextResponse.json({ error: 'Failed to delete exhibit' }, { status: 500 })
  }
}
