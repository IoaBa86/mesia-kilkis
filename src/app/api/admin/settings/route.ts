// src/app/api/admin/settings/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const CONFIG_KEY = "general"

const DEFAULT_SETTINGS = {
  siteTitle: "Μεσιά Κιλκίς",
  contactEmail: "info@mesia.gr",
  villagePhone: "",
  address: "Μεσιά Κιλκίς, 61007",
  showVillageVoices: false,
  showDigitalMuseum: false,
}

// GET /api/admin/settings - Load settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const config = await prisma.siteConfig.findUnique({ where: { key: CONFIG_KEY } })
    return NextResponse.json(config ? config.value : DEFAULT_SETTINGS)
  } catch (error) {
    console.error('Error loading settings:', error)
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}

// POST /api/admin/settings - Save settings
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { siteTitle, contactEmail, villagePhone, address, showVillageVoices, showDigitalMuseum } = body

    // Validate required fields
    if (!siteTitle || !contactEmail) {
      return NextResponse.json(
        { error: 'Site title and contact email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const settings = {
      siteTitle,
      contactEmail,
      villagePhone: villagePhone || "",
      address: address || "",
      showVillageVoices: showVillageVoices ?? false,
      showDigitalMuseum: showDigitalMuseum ?? false,
    }

    await prisma.siteConfig.upsert({
      where: { key: CONFIG_KEY },
      update: { value: settings, updatedBy: session.user.email },
      create: { key: CONFIG_KEY, value: settings, updatedBy: session.user.email },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
