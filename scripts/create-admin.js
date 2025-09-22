// Load environment variables from .env file
require('dotenv').config({ path: '.env' });

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔄 Creating admin user for mesia.gr...');
    console.log('📊 Database URL found:', !!process.env.DATABASE_URL);
    console.log('📧 Admin email will be:', process.env.ADMIN_EMAIL || 'admin@mesiakilkis.gr');
    
    // Hash the password
    const password = 'mesia2024admin'; // Change this password!
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin user with your exact schema
    const admin = await prisma.user.create({
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@mesia.gr',
        name: 'Mesia Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔐 Password: mesia2024admin');
    console.log('🎭 Role:', admin.role);
    console.log('🆔 ID:', admin.id);
    console.log('📅 Created:', admin.createdAt);
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('ℹ️ Admin user already exists with this email');
      
      // Try to update password instead
      try {
        const hashedPassword = await bcrypt.hash('mesia2024admin', 10);
        const updatedAdmin = await prisma.user.update({
          where: { email: process.env.ADMIN_EMAIL || 'admin@mesiakilkis.gr' },
          data: { password: hashedPassword }
        });
        console.log('✅ Updated existing admin password');
        console.log('🆔 Updated user ID:', updatedAdmin.id);
      } catch (updateError) {
        console.error('❌ Error updating password:', updateError.message);
      }
    } else {
      console.error('❌ Error creating admin:', error.message);
      console.error('Full error:', error);
    }
  } finally {
    await prisma.$disconnect();
    console.log('📴 Database connection closed');
  }
}

// Debug function to check environment
function debugEnvironment() {
  console.log('🔍 Environment Debug:');
  console.log('Working directory:', process.cwd());
  console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('DIRECT_DATABASE_URL exists:', !!process.env.DIRECT_DATABASE_URL);
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'not set');
  console.log('');
}

// Run debug first, then create admin
debugEnvironment();
createAdmin();
