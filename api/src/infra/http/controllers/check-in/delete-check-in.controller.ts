import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteCheckInUseCase } from '@/domain/check-in/application/use-cases/check-in/delete-check-in'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'

@Controller('check-ins/:checkInId')
export class DeleteCheckInController {
  constructor(private deleteCheckInUseCase: DeleteCheckInUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('checkInId', ParseUUIDPipe) checkInId: string) {
    const result = await this.deleteCheckInUseCase.execute({
      checkInId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
