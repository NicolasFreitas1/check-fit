import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Delete account (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let prisma: PrismaService
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

  test('[DELETE] /accounts', async () => {
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({
      sub: user.id.toString(),
      isAdmin: user.isAdmin,
    })

    const response = await request(app.getHttpServer())
      .delete('/accounts')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: 'john.doe@example.com',
      },
    })

    expect(userOnDatabase).toBeFalsy()
  })
})
