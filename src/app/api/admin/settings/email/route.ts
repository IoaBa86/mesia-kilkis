// src/app/api/admin/settings/email/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const CONFIG_KEY = "email"

const DEFAULT_SETTINGS = {
  smtpHost: "",
  smtpPort: "587",
  smtpUsername: "",
  smtpSecure: true,
  fromEmail: "",
  fromName: "Μεσιά Κιλκίς"
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const config = await prisma.siteConfig.findUnique({ where: { key: CONFIG_KEY } })
    const settings = (config?.value as Record<string, unknown>) || DEFAULT_SETTINGS
    // Don't send password in response
    const { smtpPassword, ...safeSettings } = settings
    return NextResponse.json(safeSettings)
  } catch (error) {
    console.error('Error loading email settings:', error)
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
    const { smtpHost, smtpPort, smtpUsername, smtpPassword, smtpSecure, fromEmail, fromName } = body

    if (!smtpHost || !smtpPort || !smtpUsername) {
      return NextResponse.json(
        { error: 'SMTP host, port, and username are required' },
        { status: 400 }
      )
    }

    const settings = {
      smtpHost,
      smtpPort,
      smtpUsername,
      smtpPassword,
      smtpSecure: Boolean(smtpSecure),
      fromEmail,
      fromName,
    }

    await prisma.siteConfig.upsert({
      where: { key: CONFIG_KEY },
      update: { value: settings, updatedBy: session.user.email },
      create: { key: CONFIG_KEY, value: settings, updatedBy: session.user.email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving email settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
