// src/app/api/admin/workflows/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const CONFIG_KEY = "workflows"

const DEFAULT_WORKFLOWS = {
  autoImageOptimization: true,
  contentApprovalRequired: false,
  emailNotifications: true,
  scheduledBackups: true,
  autoPublishEvents: false
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const config = await prisma.siteConfig.findUnique({ where: { key: CONFIG_KEY } })
    return NextResponse.json(config ? config.value : DEFAULT_WORKFLOWS)
  } catch (error) {
    console.error('Error loading workflows:', error)
    return NextResponse.json({ error: 'Failed to load workflows' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    await prisma.siteConfig.upsert({
      where: { key: CONFIG_KEY },
      update: { value: body, updatedBy: session.user.email },
      create: { key: CONFIG_KEY, value: body, updatedBy: session.user.email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving workflows:', error)
    return NextResponse.json({ error: 'Failed to save workflows' }, { status: 500 })
  }
}
