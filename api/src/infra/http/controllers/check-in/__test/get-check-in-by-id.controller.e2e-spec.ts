import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CheckInFactory } from 'test/factories/make-check-in'
import { GymFactory } from 'test/factories/make-gym'
import { UserFactory } from 'test/factories/make-user'

describe('Get Check In by Id (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let gymFactory: GymFactory
  let checkInFactory: CheckInFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, GymFactory, CheckInFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    gymFactory = moduleRef.get(GymFactory)
    checkInFactory = moduleRef.get(CheckInFactory)

    await app.init()
  })

  test('[GET] /check-ins/:checkInId', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const gym = await gymFactory.makePrismaGym({
      name: 'Gym 01',
    })

    const checkIn = await checkInFactory.makePrismaCheckIn({
      gymId: gym.id,
      userId: user.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/check-ins/${checkIn.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      checkIn: expect.objectContaining({
        gymId: gym.id.toString(),
        userId: user.id.toString(),
      }),
    })
  })
})
