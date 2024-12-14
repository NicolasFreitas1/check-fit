import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Create Gym (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /gyms', async () => {
    const user = await userFactory.makePrismaUser({ isAdmin: true })

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const response = await request(app.getHttpServer())
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Gym 01',
        description: 'Gym 01 description',
        phone: '+5511998765432',
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.gym.findFirst({
      where: {
        name: 'Gym 01',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })

  it('should not be able to create a gym without an admin account', async () => {
    const user = await userFactory.makePrismaUser({ isAdmin: false })

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const response = await request(app.getHttpServer())
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Gym 02',
        description: 'Gym 02 description',
        phone: '+5511998765432',
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      })

    expect(response.statusCode).toBe(403)

    const gymOnDatabase = await prisma.gym.findFirst({
      where: {
        name: 'Gym 02',
      },
    })

    expect(gymOnDatabase).toBeFalsy()
  })
})
