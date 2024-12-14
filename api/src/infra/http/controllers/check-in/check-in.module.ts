import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { CreateCheckInController } from './create-check-in.controller'
import { CreateCheckInUseCase } from '@/domain/check-in/application/use-cases/check-in/create-check-in'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateCheckInController],
  providers: [CreateCheckInUseCase],
})
export class CheckInModule {}
