import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CheckIn } from '@/domain/check-in/enterprise/entities/check-in'
import { Injectable } from '@nestjs/common'
import { CheckInsRepository } from '../../repositories/check-ins-repository'

interface GetCheckInByIdUseCaseRequest {
  checkInId: string
}

type GetCheckInByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    checkIn: CheckIn
  }
>

@Injectable()
export class GetCheckInByIdUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: GetCheckInByIdUseCaseRequest): Promise<GetCheckInByIdUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      return left(new ResourceNotFoundError())
    }

    return right({
      checkIn,
    })
  }
}
