import { Either, right } from '@/core/either'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { Injectable } from '@nestjs/common'
import { GymsRepository } from '../../repositories/gyms-repository'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { FilterGyms } from './filter/filter-gyms'

interface ListGymsUseCaseRequest {
  page: number
  perPage: number
  filter: FilterGyms
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
    filter,
  }: ListGymsUseCaseRequest): Promise<ListGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findMany({ page, perPage }, filter)

    return right({ gyms })
  }
}
