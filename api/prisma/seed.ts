import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: await hash('admin123', 8),
      isAdmin: true,
    },
  })

  await prisma.user.create({
    data: {
      name: 'Nicolas',
      email: 'nicolas@email.com',
      password: await hash('user123', 8),
      isAdmin: false,
    },
  })

  await prisma.gym.create({
    data: {
      name: 'Academia Fit',
      description: 'Uma academia incrível com equipamentos modernos.',
      phone: '1234567890',
      latitude: 40.7128,
      longitude: -74.006,
    },
  })
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
