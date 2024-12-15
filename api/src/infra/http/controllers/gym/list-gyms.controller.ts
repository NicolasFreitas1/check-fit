import { ListGymsUseCase } from '@/domain/check-in/application/use-cases/gym/list-gyms'
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { GymWithPaginationPresenter } from '../../presenters/gym-with-pagination-presenter'

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

@Controller('gyms')
export class ListGymsController {
  constructor(private listGymsUseCase: ListGymsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: pageQueryParamSchema,
    @Query('per_page', sizeValidationPipe) perPage: sizeQueryParamSchema,
    @Query('gymName') gymName: string,
  ) {
    const result = await this.listGymsUseCase.execute({
      page,
      perPage,
      filter: { gymName },
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }

    const gyms = result.value.gyms

    return GymWithPaginationPresenter.toHTTP(gyms)
  }
}
