// src/app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/events - Fetch events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const upcoming = searchParams.get('upcoming') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where: any = {
      isActive: true
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (upcoming) {
      where.eventDate = {
        gte: new Date()
      }
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          creator: {
            select: { name: true, email: true }
          }
        },
        orderBy: [
          { isPinned: 'desc' },
          { eventDate: 'desc' }
        ],
        skip,
        take: limit,
      }),
      prisma.event.count({ where })
    ])

    return NextResponse.json({
      events,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events - Create event
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
    const { 
      title, 
      titleEn, 
      description, 
      descriptionEn, 
      eventDate, 
      endDate, 
      location, 
      category, 
      imageUrl, 
      isPinned 
    } = body

    // Validate required fields
    if (!title || !eventDate) {
      return NextResponse.json(
        { error: 'Title and event date are required' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        titleEn: titleEn || null,
        description: description || null,
        descriptionEn: descriptionEn || null,
        eventDate: new Date(eventDate),
        endDate: endDate ? new Date(endDate) : null,
        location: location || null,
        category: category || 'ANNOUNCEMENT',
        imageUrl: imageUrl || null,
        isPinned: isPinned || false,
        createdBy: session.user.id,
      },
      include: {
        creator: {
          select: { name: true, email: true }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
