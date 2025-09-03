// src/app/api/admin/workflows/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { promises as fs } from 'fs'
import path from 'path'

const WORKFLOWS_FILE = path.join(process.cwd(), 'data', 'workflows.json')

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
      const workflowsData = await fs.readFile(WORKFLOWS_FILE, 'utf-8')
      return NextResponse.json(JSON.parse(workflowsData))
    } catch (error) {
      const defaultWorkflows = {
        autoImageOptimization: true,
        contentApprovalRequired: false,
        emailNotifications: true,
        scheduledBackups: true,
        autoPublishEvents: false
      }
      return NextResponse.json(defaultWorkflows)
    }
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
    const workflows = {
      ...body,
      updatedAt: new Date().toISOString(),
      updatedBy: session.user.email
    }

    await ensureDataDir()
    await fs.writeFile(WORKFLOWS_FILE, JSON.stringify(workflows, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving workflows:', error)
    return NextResponse.json({ error: 'Failed to save workflows' }, { status: 500 })
  }
}
