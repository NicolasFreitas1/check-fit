import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Edit Account Password (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /accounts/:userId/password', async () => {
    const user = await userFactory.makePrismaUser({
      password: await hash('123', 8),
    })

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const response = await request(app.getHttpServer())
      .patch(`/accounts/${user.id.toString()}/password`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        oldPassword: '123',
        newPassword: 'newPassword123',
      })

    expect(response.statusCode).toBe(204)
  })
})
