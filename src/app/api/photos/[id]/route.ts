// src/app/api/photos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// GET /api/photos/[id] - Fetch single photo
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

    const photo = await prisma.photo.findUnique({
      where: { id: params.id },
      include: {
        category: {
          select: { id: true, name: true }
        },
        uploadedBy: {
          select: { name: true, email: true }
        }
      }
    })

    if (!photo) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Error fetching photo:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photo' },
      { status: 500 }
    )
  }
}

// PUT /api/photos/[id] - Update photo
export async function PUT(
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
    const { title, titleEn, description, descriptionEn, alt, categoryId, isActive } = body

    // Validate required fields
    if (!title || !alt) {
      return NextResponse.json(
        { error: 'Title and alt text are required' },
        { status: 400 }
      )
    }

    // Verify category exists if changing category
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      })
      
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        )
      }
    }

    const photo = await prisma.photo.update({
      where: { id: params.id },
      data: {
        title,
        titleEn: titleEn || null,
        description: description || null,
        descriptionEn: descriptionEn || null,
        alt,
        categoryId: categoryId || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    })

    // Revalidate related pages
    revalidatePath('/admin/photos')
    revalidatePath('/photos')
    revalidatePath(`/admin/photos/${params.id}/edit`)

    return NextResponse.json(photo)
  } catch (error) {
    console.error('Error updating photo:', error)
    return NextResponse.json(
      { error: 'Failed to update photo' },
      { status: 500 }
    )
  }
}

// DELETE /api/photos/[id] - Delete photo
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

    await prisma.photo.delete({
      where: { id: params.id }
    })

    // Revalidate related pages
    revalidatePath('/admin/photos')
    revalidatePath('/photos')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting photo:', error)
    return NextResponse.json(
      { error: 'Failed to delete photo' },
      { status: 500 }
    )
  }
}
