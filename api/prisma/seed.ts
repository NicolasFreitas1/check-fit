import { faker } from '@faker-js/faker/locale/pt_BR'
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

  for (let index = 0; index < 25; index++) {
    await prisma.gym.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        phone: faker.phone.number({ style: 'national' }),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
    })
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
