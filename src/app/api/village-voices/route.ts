// src/app/api/village-voices/route.ts - Public: fetch active village voices
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const voices = await prisma.villageVoice.findMany({
      where: { isActive: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        type: true,
        authorName: true,
        title: true,
        content: true,
        imageUrl: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ voices })
  } catch (error) {
    console.error('Error fetching village voices:', error)
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
  }
}
