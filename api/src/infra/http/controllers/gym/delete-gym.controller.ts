import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteGymUseCase } from '@/domain/check-in/application/use-cases/gym/delete-gym'
import { IsAdmin } from '@/infra/auth/is-admin'
import { IsAdminGuard } from '@/infra/auth/is-admin.guard'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common'

@Controller('gyms/:gymId')
@UseGuards(IsAdminGuard)
export class DeleteGymController {
  constructor(private deleteGymUseCase: DeleteGymUseCase) {}

  @Delete()
  @IsAdmin()
  @HttpCode(204)
  async handle(@Param('gymId', ParseUUIDPipe) gymId: string) {
    const result = await this.deleteGymUseCase.execute({
      gymId,
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
