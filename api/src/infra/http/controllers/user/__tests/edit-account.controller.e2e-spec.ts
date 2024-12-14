import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Edit Account (E2E)', () => {
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

    userFactory = moduleRef.get(UserFactory)
    prisma = moduleRef.get(PrismaService)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /accounts/:userId', async () => {
    const user = await userFactory.makePrismaUser({ name: 'example name' })

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const response = await request(app.getHttpServer())
      .put(`/accounts/${user.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'example name 02',
        email: 'example@email.com',
      })

    expect(response.statusCode).toBe(204)

    const userOnDatabase = await prisma.user.findFirst({
      where: {
        name: 'example name 02',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
