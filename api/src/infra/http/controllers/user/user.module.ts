import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthenticateUserController } from './authenticate-user.controller'
import { AuthenticateUserUseCase } from '@/domain/check-in/application/use-cases/user/authenticate-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateUserController],
  providers: [AuthenticateUserUseCase],
})
export class UserModule {}
