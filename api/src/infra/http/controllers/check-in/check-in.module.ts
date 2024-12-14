import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateCheckInController } from './create-check-in.controller'
import { CreateCheckInUseCase } from '@/domain/check-in/application/use-cases/check-in/create-check-in'
import { ListCheckInsByUserController } from './list-check-ins-by-user.controller'
import { ListCheckInsByUserUseCase } from '@/domain/check-in/application/use-cases/check-in/list-check-ins-by-user'
import { GetCheckInByIdController } from './get-check-in-by-id.controller'
import { GetCheckInByIdUseCase } from '@/domain/check-in/application/use-cases/check-in/get-check-in-by-id'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateCheckInController,
    ListCheckInsByUserController,
    GetCheckInByIdController,
  ],
  providers: [
    CreateCheckInUseCase,
    ListCheckInsByUserUseCase,
    GetCheckInByIdUseCase,
  ],
})
export class CheckInModule {}
