import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateCheckInController } from './create-check-in.controller'
import { CreateCheckInUseCase } from '@/domain/check-in/application/use-cases/check-in/create-check-in'
import { ListCheckInsByUserController } from './list-check-ins-by-user.controller'
import { ListCheckInsByUserUseCase } from '@/domain/check-in/application/use-cases/check-in/list-check-ins-by-user'
import { GetCheckInByIdController } from './get-check-in-by-id.controller'
import { GetCheckInByIdUseCase } from '@/domain/check-in/application/use-cases/check-in/get-check-in-by-id'
import { DeleteCheckInController } from './delete-check-in.controller'
import { DeleteCheckInUseCase } from '@/domain/check-in/application/use-cases/check-in/delete-check-in'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateCheckInController,
    ListCheckInsByUserController,
    GetCheckInByIdController,
    DeleteCheckInController,
  ],
  providers: [
    CreateCheckInUseCase,
    ListCheckInsByUserUseCase,
    GetCheckInByIdUseCase,
    DeleteCheckInUseCase,
  ],
})
export class CheckInModule {}
