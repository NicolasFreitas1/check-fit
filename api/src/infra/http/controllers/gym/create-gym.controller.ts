import { CreateGymUseCase } from '@/domain/check-in/application/use-cases/gym/create-gym'
import { IsAdminGuard } from '@/infra/auth/is-admin.guard'
import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CreateGymBodySchema, bodyValidationPipe } from './dto/create-gym.dto'
import { IsAdmin } from '@/infra/auth/is-admin'

@Controller('gyms')
@UseGuards(IsAdminGuard)
export class CreateGymController {
  constructor(private createGymUseCase: CreateGymUseCase) {}

  @Post()
  @IsAdmin()
  async handle(@Body(bodyValidationPipe) body: CreateGymBodySchema) {
    const { description, latitude, longitude, name, phone } = body

    const result = await this.createGymUseCase.execute({
      description,
      latitude,
      longitude,
      name,
      phone,
    })

    if (result.isLeft()) {
      console.log(result)

      throw new InternalServerErrorException('Something went wrong')
    }
  }
}
