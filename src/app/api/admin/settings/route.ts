// src/app/api/admin/settings/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { promises as fs } from 'fs'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// GET /api/admin/settings - Load settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await ensureDataDir()
    
    try {
      const settingsData = await fs.readFile(SETTINGS_FILE, 'utf-8')
      const settings = JSON.parse(settingsData)
      return NextResponse.json(settings)
    } catch (error) {
      // Return default settings if file doesn't exist
      const defaultSettings = {
        siteTitle: "Μεσιά Κιλκίς",
        contactEmail: "info@mesia-kilkis.gr",
        villagePhone: "23430 41000",
        address: "Μεσιά Κιλκίς, 61100"
      }
      return NextResponse.json(defaultSettings)
    }
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
    const { siteTitle, contactEmail, villagePhone, address } = body

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
      updatedAt: new Date().toISOString(),
      updatedBy: session.user.email
    }

    await ensureDataDir()
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
