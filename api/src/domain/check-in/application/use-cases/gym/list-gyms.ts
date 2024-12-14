import { Either, right } from '@/core/either'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { Injectable } from '@nestjs/common'
import { GymsRepository } from '../../repositories/gyms-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'

interface ListGymsUseCaseRequest {
  page: number
  perPage: number
}

type ListGymsUseCaseResponse = Either<
  null,
  {
    gyms: DataWithPagination<Gym>
  }
>

@Injectable()
export class ListGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page,
    perPage,
  }: ListGymsUseCaseRequest): Promise<ListGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findMany({ page, perPage })

    return right({ gyms })
  }
}
