// src/app/api/admin/settings/security/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { promises as fs } from 'fs'
import path from 'path'

const SECURITY_SETTINGS_FILE = path.join(process.cwd(), 'data', 'security-settings.json')

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await ensureDataDir()
    
    try {
      const settingsData = await fs.readFile(SECURITY_SETTINGS_FILE, 'utf-8')
      return NextResponse.json(JSON.parse(settingsData))
    } catch (error) {
      const defaultSettings = {
        maxLoginAttempts: 5,
        sessionTimeout: 60,
        enableActivityLog: true,
        autoBackup: true,
        backupFrequency: "daily"
      }
      return NextResponse.json(defaultSettings)
    }
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
    const settings = {
      ...body,
      updatedAt: new Date().toISOString(),
      updatedBy: session.user.email
    }

    await ensureDataDir()
    await fs.writeFile(SECURITY_SETTINGS_FILE, JSON.stringify(settings, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving security settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
