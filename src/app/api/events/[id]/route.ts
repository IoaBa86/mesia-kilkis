// src/app/api/events/[id]/route.ts - Complete with GET, PUT, DELETE
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// GET /api/events/[id] - Fetch event details (MISSING - ADD THIS!)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔍 API: Searching for event with ID:', params.id)

    const event = await prisma.event.findUnique({
      where: { 
        id: params.id,
        isActive: true 
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

    console.log('📊 API: Event found:', event ? `"${event.title}"` : 'null')

    if (!event) {
      return NextResponse.json(
        { 
          error: 'Event not found',
          message: `Event with ID "${params.id}" does not exist or is not active`
        }, 
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('💥 API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message
      }, 
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - Update event (YOUR EXISTING CODE)
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
    const { isPinned, isActive, ...otherData } = body

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        isPinned: isPinned !== undefined ? isPinned : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        ...otherData
      },
      include: {
        creator: {
          select: { name: true, email: true }
        }
      }
    })

    // Revalidate related pages
    revalidatePath('/admin/events')
    revalidatePath('/events')

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Delete event (YOUR EXISTING CODE)
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

    await prisma.event.delete({
      where: { id: params.id }
    })

    // Revalidate related pages
    revalidatePath('/admin/events')
    revalidatePath('/events')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
