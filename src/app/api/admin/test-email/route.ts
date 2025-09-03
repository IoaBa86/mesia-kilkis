// src/app/api/admin/test-email/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { smtpHost, smtpPort, smtpUsername, smtpPassword, smtpSecure, fromEmail, fromName, testEmail } = body

    if (!smtpHost || !smtpPort || !smtpUsername || !smtpPassword) {
      return NextResponse.json({ error: 'Missing SMTP configuration' }, { status: 400 })
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: smtpSecure,
      auth: {
        user: smtpUsername,
        pass: smtpPassword
      }
    })

    // Send test email
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail || smtpUsername}>`,
      to: testEmail || session.user.email,
      subject: 'Test Email - Μεσιά Κιλκίς',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #722F37; font-size: 28px; margin-bottom: 10px;">Μεσιά Κιλκίς</h1>
            <p style="color: #D4AF37; font-size: 16px;">Test Email Επιτυχής!</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #722F37, #D4AF37); padding: 30px; border-radius: 10px; color: white; text-align: center;">
            <h2 style="margin-top: 0;">Email Configuration Test</h2>
            <p>Αυτό είναι ένα test email από το διαχειριστικό πάνελ της ιστοσελίδας Μεσιά Κιλκίς.</p>
            <p>Η διαμόρφωση email λειτουργεί επιτυχώς!</p>
          </div>
          
          <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
            <p>Αποστάλθηκε στις: ${new Date().toLocaleString('el-GR')}</p>
            <p>Διαχειριστής: ${session.user.name} (${session.user.email})</p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Test email sent successfully'
    })
  } catch (error: any) {
    console.error('Error sending test email:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to send test email' 
    }, { status: 500 })
  }
}
