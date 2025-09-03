// src/app/api/admin/backup/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create backup directory
    const backupDir = path.join(process.cwd(), 'backups')
    try {
      await fs.access(backupDir)
    } catch {
      await fs.mkdir(backupDir, { recursive: true })
    }

    // Generate backup data
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupData = {
      timestamp: new Date().toISOString(),
      createdBy: session.user.email,
      data: {
        // Backup categories
        categories: await prisma.category.findMany({
          include: { _count: { select: { photos: true } } }
        }),
        
        // Backup photos metadata (not actual files)
        photos: await prisma.photo.findMany({
          include: { category: true, uploadedBy: true }
        }),
        
        // Backup events
        events: await prisma.event.findMany({
          include: { creator: true }
        }),
        
        // Backup users (without passwords)
        users: await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true
          }
        })
      }
    }

    // Save backup file
    const backupFilename = `mesia-backup-${timestamp}.json`
    const backupPath = path.join(backupDir, backupFilename)
    await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2))

    return NextResponse.json({ 
      success: true, 
      filename: backupFilename,
      timestamp: backupData.timestamp,
      size: JSON.stringify(backupData).length
    })
  } catch (error) {
    console.error('Error creating backup:', error)
    return NextResponse.json({ error: 'Backup failed' }, { status: 500 })
  }
}
