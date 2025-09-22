// src/app/api/admin/export-analytics/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate CSV data
    const [categories, photos, events, users] = await Promise.all([
      prisma.category.count(),
      prisma.photo.count(),
      prisma.event.count(),
      prisma.user.count()
    ])

    const csvData = [
      ['Metric', 'Count', 'Date'],
      ['Total Categories', categories, new Date().toISOString()],
      ['Total Photos', photos, new Date().toISOString()],
      ['Total Events', events, new Date().toISOString()],
      ['Total Users', users, new Date().toISOString()],
      ['Export Generated', '', new Date().toISOString()]
    ].map(row => row.join(',')).join('\n')

    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="mesia-analytics-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error) {
    console.error('Error exporting analytics:', error)
    return NextResponse.json({ error: 'Failed to export analytics' }, { status: 500 })
  }
}
