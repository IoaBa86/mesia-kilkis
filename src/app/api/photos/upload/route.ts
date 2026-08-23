// src/app/api/photos/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const categoryId = formData.get('categoryId') as string

    console.log('Upload request:', { categoryId, fileCount: files.length })

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      )
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    const uploadedPhotos = []

    // Ensure upload directories exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    const thumbnailsDir = path.join(uploadsDir, 'thumbnails')
    
    // Create directories if they don't exist
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }
    if (!existsSync(thumbnailsDir)) {
      await mkdir(thumbnailsDir, { recursive: true })
    }

    const ALLOWED_TYPES: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    }
    const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB

    for (const file of files) {
      const extension = ALLOWED_TYPES[file.type]
      if (!extension) {
        console.log(`Skipping file with disallowed type: ${file.name} (${file.type})`)
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        console.log(`Skipping oversized file: ${file.name} (${file.size} bytes)`)
        continue
      }

      try {
        // Generate unique filename — extension comes from the validated
        // MIME type, never from the user-supplied filename
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substring(2, 8)
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.[^/.]+$/, '')
        const filename = `${timestamp}_${randomId}_${sanitizedName}${extension}`
        
        // File paths
        const filepath = path.join(uploadsDir, filename)
        const thumbnailPath = path.join(thumbnailsDir, `thumb_${filename}`)

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Save original image
        await writeFile(filepath, buffer)
        console.log(`Saved original: ${filename}`)

        // Create a simple thumbnail (copy original for now - we'll add Sharp later)
        await writeFile(thumbnailPath, buffer)
        console.log(`Created thumbnail: thumb_${filename}`)

        // Get next order number
        const lastPhoto = await prisma.photo.findFirst({
          where: { categoryId },
          orderBy: { order: 'desc' }
        })
        const nextOrder = (lastPhoto?.order || 0) + 1

        // Create a user if doesn't exist (for session compatibility)
        let userId = session.user.id
        if (!userId) {
          // Create or find user based on email
          const user = await prisma.user.upsert({
            where: { email: session.user.email! },
            update: {},
            create: {
              email: session.user.email!,
              name: session.user.name || 'Admin',
              role: 'ADMIN'
            }
          })
          userId = user.id
        }

        // Save to database
        // Default alt text is genuinely descriptive (category + village) so
        // photos are never shipped with a meaningless "Photo: IMG_1234.jpg"
        // alt — admins can still refine it later via the photo edit screen.
        const readableTitle = sanitizedName || file.name.replace(/\.[^/.]+$/, '')
        const photo = await prisma.photo.create({
          data: {
            title: readableTitle,
            filename,
            url: `/uploads/${filename}`,
            thumbnailUrl: `/uploads/thumbnails/thumb_${filename}`,
            alt: `${category.name} - Μεσιά Κιλκίς`,
            order: nextOrder,
            categoryId,
            userId,
          },
        })

        uploadedPhotos.push(photo)
        console.log(`Created photo record: ${photo.id}`)

      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError)
        // Continue with other files
      }
    }

    return NextResponse.json({
      success: true,
      message: `Uploaded ${uploadedPhotos.length} photos successfully`,
      photos: uploadedPhotos
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: `Failed to upload photos: ${error.message}` },
      { status: 500 }
    )
  }
}
