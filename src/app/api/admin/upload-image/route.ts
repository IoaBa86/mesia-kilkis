// src/app/api/admin/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const rawType = formData.get('type') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type (MIME + extension must agree — a spoofed MIME type
    // paired with a mismatched extension is rejected)
    const allowedTypes: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/gif': '.gif',
      'image/webp': '.webp',
    }
    const expectedExt = allowedTypes[file.type]
    if (!expectedExt) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // `type` only labels the upload (e.g. "logo", "favicon") — never let it
    // reach the filesystem unsanitized, it was previously concatenated
    // straight into the file path (path traversal via `../`).
    const type = (rawType || 'image').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'image'

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'admin')
    try {
      await fs.access(uploadsDir)
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename — extension comes from the validated MIME
    // type, never from the user-supplied filename
    const timestamp = Date.now()
    const filename = `${type}-${timestamp}${expectedExt}`
    const filepath = path.join(uploadsDir, filename)

    // Defense in depth: refuse to write anywhere outside uploadsDir
    if (path.dirname(filepath) !== uploadsDir) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(filepath, buffer)

    const url = `/uploads/admin/${filename}`

    return NextResponse.json({ url, filename })
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
