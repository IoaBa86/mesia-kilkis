// src/app/api/admin/historical-posts/route.ts - Admin API for historical posts list & create
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Fetch all historical posts (admin view)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const posts = await prisma.historicalPost.findMany({
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ],
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true
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

// POST - Create new historical post
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
    const { title, slug, excerpt, content, images, isPinned } = body

    // Validation
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, excerpt, content' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPost = await prisma.historicalPost.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      )
    }

    // Create post
    const newPost = await prisma.historicalPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        images: images || [], // Store as JSON array
        isPinned: isPinned || false,
        creatorId: session.user.id
      },
      include: {
        creator: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(
      { post: newPost, message: 'Historical post created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating historical post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
