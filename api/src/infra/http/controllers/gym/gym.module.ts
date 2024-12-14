import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { ListGymsController } from './list-gyms.controller'
import { ListGymsUseCase } from '@/domain/check-in/application/use-cases/gym/list-gyms'
import { GetGymByIdController } from './get-gym-by-id.controller'
import { GetGymByIdUseCase } from '@/domain/check-in/application/use-cases/gym/get-gym-by-id'
import { CreateGymController } from './create-gym.controller'
import { CreateGymUseCase } from '@/domain/check-in/application/use-cases/gym/create-gym'
import { EditGymController } from './edit-gym.controller'
import { EditGymUseCase } from '@/domain/check-in/application/use-cases/gym/edit-gym'
import { DeleteGymController } from './delete-gym.controller'
import { DeleteGymUseCase } from '@/domain/check-in/application/use-cases/gym/delete-gym'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateGymController,
    ListGymsController,
    GetGymByIdController,
    EditGymController,
    DeleteGymController,
  ],
  providers: [
    CreateGymUseCase,
    ListGymsUseCase,
    GetGymByIdUseCase,
    EditGymUseCase,
    DeleteGymUseCase,
  ],
})
export class GymModule {}
