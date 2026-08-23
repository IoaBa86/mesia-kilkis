// src/app/api/historical-posts/route.ts - Get all historical posts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.historicalPost.findMany({
      where: { isActive: true },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 100,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        images: true,
        createdAt: true,
        creator: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching historical posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}
