import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EditGymUseCase } from '@/domain/check-in/application/use-cases/gym/edit-gym'
import { IsAdmin } from '@/infra/auth/is-admin'
import { IsAdminGuard } from '@/infra/auth/is-admin.guard'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common'
import { EditGymBodySchema, bodyValidationPipe } from './dto/edit-gym.dto'

@Controller('gyms/:gymId')
@UseGuards(IsAdminGuard)
export class EditGymController {
  constructor(private editGymUseCase: EditGymUseCase) {}

  @Put()
  @IsAdmin()
  @HttpCode(204)
  async handle(
    @Param('gymId', ParseUUIDPipe) gymId: string,
    @Body(bodyValidationPipe) body: EditGymBodySchema,
  ) {
    const { description, latitude, longitude, name, phone } = body

    const result = await this.editGymUseCase.execute({
      gymId,
      description,
      latitude,
      longitude,
      name,
      phone,
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
