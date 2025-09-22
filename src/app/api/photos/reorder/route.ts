// src/app/api/photos/reorder/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// POST /api/photos/reorder - Reorder photos within a category
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
    const { photoIds, categoryId } = body

    if (!Array.isArray(photoIds) || photoIds.length === 0) {
      return NextResponse.json(
        { error: 'Photo IDs array is required' },
        { status: 400 }
      )
    }

    // Update order for each photo
    const updatePromises = photoIds.map((photoId: string, index: number) =>
      prisma.photo.update({
        where: { id: photoId },
        data: { order: index + 1 }
      })
    )

    await Promise.all(updatePromises)

    // Revalidate related pages
    revalidatePath('/admin/photos')
    revalidatePath('/photos')
    if (categoryId) {
      revalidatePath(`/photos?category=${categoryId}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering photos:', error)
    return NextResponse.json(
      { error: 'Failed to reorder photos' },
      { status: 500 }
    )
  }
}
