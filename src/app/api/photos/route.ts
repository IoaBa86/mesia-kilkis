// src/app/api/photos/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/photos - Fetch photos with optional category filter
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where = categoryId ? { categoryId } : {}

    const [photos, totalCount] = await Promise.all([
      prisma.photo.findMany({
        where,
        include: {
          category: {
            select: { name: true, slug: true }
          },
          uploadedBy: {
            select: { name: true, email: true }
          }
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit,
      }),
      prisma.photo.count({ where })
    ])

    return NextResponse.json({
      photos,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}
