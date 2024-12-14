import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { GymFactory } from 'test/factories/make-gym'
import { UserFactory } from 'test/factories/make-user'

describe('Create Check In (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let gymFactory: GymFactory

  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, GymFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    gymFactory = moduleRef.get(GymFactory)

    await app.init()
  })

  test('[POST] /gyms/:gymId/check-ins', async () => {
    const user = await userFactory.makePrismaUser({ isAdmin: true })

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const gym = await gymFactory.makePrismaGym({
      name: 'Gym 01',
    })

    const response = await request(app.getHttpServer())
      .post(`/gyms/${gym.id.toString()}/check-ins`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(201)

    const checkInOnDatabase = await prisma.checkIn.findFirst({
      where: {
        gymId: gym.id.toString(),
        userId: user.id.toString(),
      },
    })

    expect(checkInOnDatabase).toBeTruthy()
  })
})