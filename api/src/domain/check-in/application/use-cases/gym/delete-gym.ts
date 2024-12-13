import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { GymsRepository } from '../../repositories/gyms-repository'

interface DeleteGymUseCaseRequest {
  gymId: string
}

type DeleteGymUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    gymId,
  }: DeleteGymUseCaseRequest): Promise<DeleteGymUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    await this.gymsRepository.delete(gym)

    return right(null)
  }
}
