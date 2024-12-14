import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { GymFactory } from 'test/factories/make-gym'
import { UserFactory } from 'test/factories/make-user'

describe('List recent Gyms (E2E)', () => {
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

  test('[GET] /gyms', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    await Promise.all([
      gymFactory.makePrismaGym({
        name: 'Gym 01',
      }),
      gymFactory.makePrismaGym({
        name: 'Gym 02',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Gym 02' }),
        expect.objectContaining({ name: 'Gym 01' }),
      ]),
    )
  })
})
