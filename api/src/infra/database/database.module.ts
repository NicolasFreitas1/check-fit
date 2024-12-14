import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/check-in/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repository/prisma-users-repository'
import { GymsRepository } from '@/domain/check-in/application/repositories/gyms-repository'
import { PrismaGymsRepository } from './prisma/repository/prisma-gyms-repository'
import { CheckInsRepository } from '@/domain/check-in/application/repositories/check-ins-repository'
import { PrismaCheckInsRepository } from './prisma/repository/prisma-check-ins-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: GymsRepository,
      useClass: PrismaGymsRepository,
    },
    {
      provide: CheckInsRepository,
      useClass: PrismaCheckInsRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, GymsRepository, CheckInsRepository],
})
export class DatabaseModule {}
