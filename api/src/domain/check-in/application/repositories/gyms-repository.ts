import { PaginationParams } from '@/core/repositories/pagination-params'
import { Gym } from '../../enterprise/entities/gym'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { FilterGyms } from '../use-cases/gym/filter/filter-gyms'

export abstract class GymsRepository {
  abstract findMany(
    params: PaginationParams,
    filter: FilterGyms,
  ): Promise<DataWithPagination<Gym>>

  abstract findById(id: string): Promise<Gym | null>
  abstract create(gym: Gym): Promise<void>
  abstract save(gym: Gym): Promise<void>
  abstract delete(gym: Gym): Promise<void>
}
