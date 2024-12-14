import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { CheckInWithGym } from '@/domain/check-in/enterprise/entities/value-objects/check-in-with-gym'
import { Injectable } from '@nestjs/common'
import { CheckInsRepository } from '../../repositories/check-ins-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface ListCheckInsByUserUseCaseRequest {
  userId: string
  page: number
  perPage: number
}

type ListCheckInsByUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    checkIns: DataWithPagination<CheckInWithGym>
  }
>

@Injectable()
export class ListCheckInsByUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    page,
    perPage,
    userId,
  }: ListCheckInsByUserUseCaseRequest): Promise<ListCheckInsByUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const checkIns = await this.checkInsRepository.findManyByUser(
      { page, perPage },
      userId,
    )

    return right({
      checkIns,
    })
  }
}
