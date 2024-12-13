import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { Injectable } from '@nestjs/common'
import { GymsRepository } from '../../repositories/gyms-repository'

interface GetGymByIdUseCaseRequest {
  gymId: string
}

type GetGymByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    gym: Gym
  }
>

@Injectable()
export class GetGymByIdUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    gymId,
  }: GetGymByIdUseCaseRequest): Promise<GetGymByIdUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    return right({ gym })
  }
}
