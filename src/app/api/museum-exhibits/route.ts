// src/app/api/museum-exhibits/route.ts - Public: fetch active museum exhibits
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const exhibits = await prisma.museumExhibit.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        type: true,
        title: true,
        description: true,
        imageUrl: true,
        mediaUrl: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ exhibits })
  } catch (error) {
    console.error('Error fetching museum exhibits:', error)
    return NextResponse.json({ error: 'Failed to fetch exhibits' }, { status: 500 })
  }
}
