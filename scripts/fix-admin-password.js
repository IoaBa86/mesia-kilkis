require('dotenv').config({ path: '.env' });
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAdminPassword() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const newPassword = process.env.ADMIN_PASSWORD;
    if (!email || !newPassword) {
      console.error('❌ Set ADMIN_EMAIL and ADMIN_PASSWORD in your environment before running this script.');
      process.exit(1);
    }

    console.log('🔄 Resetting admin password...');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedAdmin = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    console.log('✅ Admin password updated successfully!');
    console.log('📧 Email:', email);
    console.log('🆔 User ID:', updatedAdmin.id);

    // Verify the password works
    const testPassword = await bcrypt.compare(newPassword, hashedPassword);
    console.log('🧪 Password verification test:', testPassword ? '✅ PASS' : '❌ FAIL');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminPassword();
