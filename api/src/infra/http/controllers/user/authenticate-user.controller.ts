import { WrongCredentialsError } from '@/domain/check-in/application/use-cases/__errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/check-in/application/use-cases/user/authenticate-user'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import {
  AuthenticateUserBodySchema,
  bodyValidationPipe,
} from './dto/authenticate-user.dto'
import { UserPresenter } from '../../presenters/user-presenter'

@Public()
@Controller('/sessions')
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: AuthenticateUserBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException()
      }
    }

    const { accessToken, user } = result.value

    return {
      access_token: accessToken,
      user: UserPresenter.toHTTP(user),
    }
  }
}
