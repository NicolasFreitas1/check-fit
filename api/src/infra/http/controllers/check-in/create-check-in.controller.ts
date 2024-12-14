import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserAlreadyCheckedInError } from '@/domain/check-in/application/use-cases/__errors/user-already-checked-in-error'
import { CreateCheckInUseCase } from '@/domain/check-in/application/use-cases/check-in/create-check-in'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common'

@Controller('gyms/:gymId/check-ins')
export class CreateCheckInController {
  constructor(private createCheckInUseCase: CreateCheckInUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('gymId', ParseUUIDPipe) gymId: string,
  ) {
    const result = await this.createCheckInUseCase.execute({
      gymId,
      userId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        case UserAlreadyCheckedInError:
          throw new ConflictException(error.message)
      }
    }
  }
}
