import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'
import { AuthenticateUserController } from './authenticate-user.controller'
import { AuthenticateUserUseCase } from '@/domain/check-in/application/use-cases/user/authenticate-user'
import { CreateAccountController } from './create-account.controller'
import { CreateUserUseCase } from '@/domain/check-in/application/use-cases/user/create-user'
import { DeleteAccountController } from './delete-account.controller'
import { DeleteUserUseCase } from '@/domain/check-in/application/use-cases/user/delete-user'
import { GetUserProfileController } from './get-user-profile.controller'
import { GetUserByIdUseCase } from '@/domain/check-in/application/use-cases/user/get-user-by-id'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateUserController,
    CreateAccountController,
    GetUserProfileController,
    DeleteAccountController,
  ],
  providers: [
    AuthenticateUserUseCase,
    CreateUserUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
