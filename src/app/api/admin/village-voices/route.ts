// src/app/api/admin/village-voices/route.ts - Admin API for village voices list & create
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

    const voices = await prisma.villageVoice.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      include: { creator: { select: { name: true } } },
    })

    return NextResponse.json({ voices })
  } catch (error) {
    console.error('Error fetching village voices:', error)
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, authorName, title, content, imageUrl, isActive, order } = body

    if (!type || !authorName || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: type, authorName, title, content' },
        { status: 400 }
      )
    }

    const voice = await prisma.villageVoice.create({
      data: {
        type,
        authorName,
        title,
        content,
        imageUrl: imageUrl || null,
        isActive: isActive ?? true,
        order: order ?? 0,
        creatorId: session.user.id,
      },
      include: { creator: { select: { name: true } } },
    })

    return NextResponse.json({ voice }, { status: 201 })
  } catch (error) {
    console.error('Error creating village voice:', error)
    return NextResponse.json({ error: 'Failed to create voice' }, { status: 500 })
  }
}
