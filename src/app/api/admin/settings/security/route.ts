// src/app/api/admin/settings/security/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const CONFIG_KEY = "security"

const DEFAULT_SETTINGS = {
  maxLoginAttempts: 5,
  sessionTimeout: 60,
  enableActivityLog: true,
  autoBackup: true,
  backupFrequency: "daily"
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const config = await prisma.siteConfig.findUnique({ where: { key: CONFIG_KEY } })
    return NextResponse.json(config ? config.value : DEFAULT_SETTINGS)
  } catch (error) {
    console.error('Error loading security settings:', error)
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
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
    console.error('Error saving security settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
