// src/app/api/admin/museum-exhibits/route.ts - Admin API for museum exhibits list & create
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const exhibits = await prisma.museumExhibit.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { creator: { select: { name: true } } },
    })

    return NextResponse.json({ exhibits })
  } catch (error) {
    console.error('Error fetching museum exhibits:', error)
    return NextResponse.json({ error: 'Failed to fetch exhibits' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, title, description, imageUrl, mediaUrl, isActive, order } = body

    if (!type || !title || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: type, title, description' },
        { status: 400 }
      )
    }

    const exhibit = await prisma.museumExhibit.create({
      data: {
        type,
        title,
        description,
        imageUrl: imageUrl || null,
        mediaUrl: mediaUrl || null,
        isActive: isActive ?? true,
        order: order ?? 0,
        creatorId: session.user.id,
      },
      include: { creator: { select: { name: true } } },
    })

    return NextResponse.json({ exhibit }, { status: 201 })
  } catch (error) {
    console.error('Error creating museum exhibit:', error)
    return NextResponse.json({ error: 'Failed to create exhibit' }, { status: 500 })
  }
}
