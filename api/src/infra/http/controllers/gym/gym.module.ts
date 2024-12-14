import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { ListGymsController } from './list-gyms.controller'
import { ListGymsUseCase } from '@/domain/check-in/application/use-cases/gym/list-gyms'
import { GetGymByIdController } from './get-gym-by-id.controller'
import { GetGymByIdUseCase } from '@/domain/check-in/application/use-cases/gym/get-gym-by-id'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [ListGymsController, GetGymByIdController],
  providers: [ListGymsUseCase, GetGymByIdUseCase],
})
export class GymModule {}
