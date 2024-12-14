import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetCheckInByIdUseCase } from '@/domain/check-in/application/use-cases/check-in/get-check-in-by-id'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { CheckInWithGymPresenter } from '../../presenters/check-in-with-gym-presenter'

@Controller('check-ins/:checkInId')
export class GetCheckInByIdController {
  constructor(private getCheckInByIdUseCase: GetCheckInByIdUseCase) {}

  @Get()
  async handle(@Param('checkInId', ParseUUIDPipe) checkInId: string) {
    const result = await this.getCheckInByIdUseCase.execute({ checkInId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const checkIn = result.value.checkIn

    return {
      checkIn: CheckInWithGymPresenter.toHTTP(checkIn),
    }
  }
}
