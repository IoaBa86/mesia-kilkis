// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/categories - Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { photos: true }
        }
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST /api/categories - Create new category
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
    const { name, nameEn, description, slug } = body

    // Create slug from name if not provided
    const categorySlug = slug || name.toLowerCase()
      .replace(/[^a-z0-9αβγδεζηθικλμνξοπρστυφχψω\s-]/gi, '')
      .replace(/\s+/g, '-')

    // Get the next order number
    const lastCategory = await prisma.category.findFirst({
      orderBy: { order: 'desc' }
    })
    const nextOrder = (lastCategory?.order || 0) + 1

    const category = await prisma.category.create({
      data: {
        name,
        nameEn,
        description,
        slug: categorySlug,
        order: nextOrder,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
