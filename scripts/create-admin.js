// Load environment variables from .env file
require('dotenv').config({ path: '.env' });

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      console.error('❌ Set ADMIN_EMAIL and ADMIN_PASSWORD in your environment before running this script.');
      process.exit(1);
    }

    console.log('🔄 Creating admin user for mesia.gr...');
    console.log('📊 Database URL found:', !!process.env.DATABASE_URL);
    console.log('📧 Admin email will be:', email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        email,
        name: 'Mesia Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🎭 Role:', admin.role);
    console.log('🆔 ID:', admin.id);
    console.log('📅 Created:', admin.createdAt);

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('ℹ️ Admin user already exists with this email');

      // Try to update password instead
      try {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const updatedAdmin = await prisma.user.update({
          where: { email: process.env.ADMIN_EMAIL },
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
