import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ListCheckInsByUserUseCase } from '@/domain/check-in/application/use-cases/check-in/list-check-ins-by-user'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { CheckInWithGymPaginatedPresenter } from '../../presenters/check-in-with-gym-paginated-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type pageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const sizeQueryParamSchema = z
  .string()
  .optional()
  .default('20')
  .transform(Number)
  .pipe(z.number().min(1))

const sizeValidationPipe = new ZodValidationPipe(sizeQueryParamSchema)

type sizeQueryParamSchema = z.infer<typeof sizeQueryParamSchema>

@Controller('accounts/:userId/check-ins')
export class ListCheckInsByUserController {
  constructor(private listCheckInsByUserUseCase: ListCheckInsByUserUseCase) {}

  @Get()
  async handle(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Query('per_page', sizeValidationPipe) perPage: sizeQueryParamSchema,
  ) {
    const result = await this.listCheckInsByUserUseCase.execute({
      page,
      perPage,
      userId,
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

    const checkIns = result.value.checkIns

    return CheckInWithGymPaginatedPresenter.toHTTP(checkIns)
  }
}
