import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { GymFactory } from 'test/factories/make-gym'
import { UserFactory } from 'test/factories/make-user'

describe('Get Gym by Id (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let gymFactory: GymFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, GymFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    gymFactory = moduleRef.get(GymFactory)

    await app.init()
  })

  test('[GET] /gyms/:getId', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const gym = await gymFactory.makePrismaGym({
      name: 'Gym 01',
    })

    const response = await request(app.getHttpServer())
      .get(`/gyms/${gym.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      gym: expect.objectContaining({
        name: 'Gym 01',
      }),
    })
  })
})
