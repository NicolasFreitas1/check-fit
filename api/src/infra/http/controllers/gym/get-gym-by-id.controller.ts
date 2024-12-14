import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetGymByIdUseCase } from '@/domain/check-in/application/use-cases/gym/get-gym-by-id'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common'
import { GymPresenter } from '../../presenters/gym-presenter'

@Controller('gyms/:gymId')
export class GetGymByIdController {
  constructor(private getGymByIdUseCase: GetGymByIdUseCase) {}

  @Get()
  async handle(@Param('gymId', ParseUUIDPipe) gymId: string) {
    const result = await this.getGymByIdUseCase.execute({ gymId })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    const gym = result.value.gym

    return {
      gym: GymPresenter.toHTTP(gym),
    }
  }
}
