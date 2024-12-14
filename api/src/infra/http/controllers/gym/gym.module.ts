import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { ListGymsController } from './list-gyms.controller'
import { ListGymsUseCase } from '@/domain/check-in/application/use-cases/gym/list-gyms'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [ListGymsController],
  providers: [ListGymsUseCase],
})
export class GymModule {}
