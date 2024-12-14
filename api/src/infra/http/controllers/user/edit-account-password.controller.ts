import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EmailAlreadyInUseError } from '@/domain/check-in/application/use-cases/__errors/email-already-in-use-error'
import { EditUserPasswordUseCase } from '@/domain/check-in/application/use-cases/user/edit-user-password'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common'
import {
  EditAccountPasswordBodySchema,
  bodyValidationPipe,
} from './dto/edit-account-password.dto'

@Controller('accounts/:userId/password')
export class EditAccountPasswordController {
  constructor(private editUserPasswordUseCase: EditUserPasswordUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(bodyValidationPipe) body: EditAccountPasswordBodySchema,
  ) {
    const { newPassword, oldPassword } = body

    const result = await this.editUserPasswordUseCase.execute({
      userId,
      newPassword,
      oldPassword,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case EmailAlreadyInUseError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
