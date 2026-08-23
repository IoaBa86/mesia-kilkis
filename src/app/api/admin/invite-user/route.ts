// src/app/api/admin/invite-user/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, role } = body

    if (!email || !role) {
      return NextResponse.json({ 
        error: 'Email and role are required' 
      }, { status: 400 })
    }

    if (!['ADMIN', 'EDITOR'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ 
        error: 'User with this email already exists' 
      }, { status: 400 })
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(tempPassword, 10)

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        name: email.split('@')[0] // Default name from email
      }
    })

    // Send invitation email
    try {
      // Load email settings
      const emailConfig = await prisma.siteConfig.findUnique({ where: { key: 'email' } })
      if (!emailConfig) {
        throw new Error('Email settings not configured')
      }
      const emailSettings = emailConfig.value as Record<string, any>

      const transporter = nodemailer.createTransport({
        host: emailSettings.smtpHost,
        port: parseInt(emailSettings.smtpPort),
        secure: emailSettings.smtpSecure,
        auth: {
          user: emailSettings.smtpUsername,
          pass: emailSettings.smtpPassword
        }
      })

      await transporter.sendMail({
        from: `"${emailSettings.fromName}" <${emailSettings.fromEmail || emailSettings.smtpUsername}>`,
        to: email,
        subject: 'Πρόσκληση στη διαχείριση - Μεσιά Κιλκίς',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #722F37; font-size: 28px; margin-bottom: 10px;">Μεσιά Κιλκίς</h1>
              <p style="color: #D4AF37; font-size: 18px;">Πρόσκληση Διαχειριστή</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #722F37, #D4AF37); padding: 30px; border-radius: 10px; color: white; margin-bottom: 20px;">
              <h2 style="margin-top: 0;">Καλώς ήρθατε!</h2>
              <p>Έχετε προσκληθεί να γίνετε ${role === 'ADMIN' ? 'διαχειριστής' : 'editor'} στην ιστοσελίδα του χωριού Μεσιά Κιλκίς.</p>
            </div>
            
            <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h3 style="color: #722F37; margin-top: 0;">Στοιχεία Σύνδεσης</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Προσωρινός Κωδικός:</strong> <code style="background: #e0e0e0; padding: 2px 6px; border-radius: 3px;">${tempPassword}</code></p>
              <p><strong>Ρόλος:</strong> ${role}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/admin/login" 
                 style="display: inline-block; background: linear-gradient(135deg, #722F37, #D4AF37); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Σύνδεση στο Διαχειριστικό Πάνελ
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
              <p><strong>Σημαντικό:</strong> Παρακαλώ αλλάξτε τον κωδικό σας μετά την πρώτη σύνδεση.</p>
              <p>Προσκλήθηκατε από: ${session.user.name} (${session.user.email})</p>
            </div>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Error sending invitation email:', emailError)
      // Still return success if user was created, just log email error
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      },
      tempPassword // In production, you might not want to return this
    })
  } catch (error) {
    console.error('Error inviting user:', error)
    return NextResponse.json({ error: 'Failed to invite user' }, { status: 500 })
  }
}
