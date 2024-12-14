import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CheckInWithGym } from '@/domain/check-in/enterprise/entities/value-objects/check-in-with-gym'
import { Injectable } from '@nestjs/common'
import { CheckInsRepository } from '../../repositories/check-ins-repository'

interface GetCheckInByIdUseCaseRequest {
  checkInId: string
}

type GetCheckInByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    checkIn: CheckInWithGym
  }
>

@Injectable()
export class GetCheckInByIdUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: GetCheckInByIdUseCaseRequest): Promise<GetCheckInByIdUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findByIdWithGym(checkInId)

    if (!checkIn) {
      return left(new ResourceNotFoundError())
    }

    return right({
      checkIn,
    })
  }
}
