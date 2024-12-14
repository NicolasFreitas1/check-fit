import { WrongCredentialsError } from '@/domain/check-in/application/use-cases/__errors/wrong-credentials-error'
import { AuthenticateUserUseCase } from '@/domain/check-in/application/use-cases/user/authenticate-user'
import { Public } from '@/infra/auth/public'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common'
import { UserPresenter } from '../../presenters/user-presenter'
import {
  AuthenticateUserBodySchema,
  bodyValidationPipe,
} from './dto/authenticate-user.dto'

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
          throw new UnprocessableEntityException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken, user } = result.value

    return {
      access_token: accessToken,
      user: UserPresenter.toHTTP(user),
    }
  }
}
