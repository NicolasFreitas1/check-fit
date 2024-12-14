import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthenticateUserController } from './authenticate-user.controller'
import { AuthenticateUserUseCase } from '@/domain/check-in/application/use-cases/user/authenticate-user'
import { CreateAccountController } from './create-account.controller'
import { CreateUserUseCase } from '@/domain/check-in/application/use-cases/user/create-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [AuthenticateUserController, CreateAccountController],
  providers: [AuthenticateUserUseCase, CreateUserUseCase],
})
export class UserModule {}
