require('dotenv').config({ path: '.env' });
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAdminPassword() {
  try {
    console.log('🔄 Fixing admin password...');
    
    // Set a simple, known password
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedAdmin = await prisma.user.update({
      where: { 
        email: 'admin@mesiakilkis.gr' 
      },
      data: { 
        password: hashedPassword 
      }
    });
    
    console.log('✅ Admin password updated successfully!');
    console.log('📧 Email: admin@mesiakilkis.gr');
    console.log('🔐 Password: admin123');
    console.log('🆔 User ID:', updatedAdmin.id);
    
    // Verify the password works
    const testPassword = await bcrypt.compare('admin123', hashedPassword);
    console.log('🧪 Password verification test:', testPassword ? '✅ PASS' : '❌ FAIL');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminPassword();
