// src/app/api/admin/historical-posts/[id]/route.ts - Admin API for single historical post operations
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - Fetch single historical post for editing
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const post = await prisma.historicalPost.findUnique({
      where: { id: params.id },
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

    if (!post) {
      return NextResponse.json(
        { error: 'Historical post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching historical post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

// PATCH - Update historical post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, slug, excerpt, content, images, isPinned, isActive } = body

    // Check if post exists
    const existingPost = await prisma.historicalPost.findUnique({
      where: { id: params.id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Historical post not found' },
        { status: 404 }
      )
    }

    // Check slug uniqueness (if slug is being changed)
    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.historicalPost.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        )
      }
    }

    // Update post
    const updatedPost = await prisma.historicalPost.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(images !== undefined && { images }), // Store as JSON array
        ...(isPinned !== undefined && { isPinned }),
        ...(isActive !== undefined && { isActive }),
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

    return NextResponse.json({
      post: updatedPost,
      message: 'Historical post updated successfully'
    })
  } catch (error) {
    console.error('Error updating historical post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

// DELETE - Delete historical post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if post exists
    const existingPost = await prisma.historicalPost.findUnique({
      where: { id: params.id }
    })

    if (!existingPost) {
      return NextResponse.json(
        { error: 'Historical post not found' },
        { status: 404 }
      )
    }

    // Delete the post
    await prisma.historicalPost.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      message: 'Historical post deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting historical post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
