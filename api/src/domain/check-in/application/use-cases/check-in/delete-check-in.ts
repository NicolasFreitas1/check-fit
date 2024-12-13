import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { CheckInsRepository } from '../../repositories/check-ins-repository'

interface DeleteCheckInUseCaseRequest {
  checkInId: string
}

type DeleteCheckInUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: DeleteCheckInUseCaseRequest): Promise<DeleteCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      return left(new ResourceNotFoundError())
    }

    await this.checkInsRepository.delete(checkIn)

    return right(null)
  }
}
