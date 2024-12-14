import { PaginationParams } from '@/core/repositories/pagination-params'
import { CheckIn } from '../../enterprise/entities/check-in'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'

export abstract class CheckInsRepository {
  abstract findMany(params: PaginationParams): Promise<CheckIn[]>
  abstract findManyByUser(
    params: PaginationParams,
    userId: string,
  ): Promise<DataWithPagination<CheckIn>>

  abstract findById(id: string): Promise<CheckIn | null>
  abstract findUniqueByUser(userId: string, date: Date): Promise<CheckIn | null>
  abstract create(checkIn: CheckIn): Promise<void>
  abstract save(checkIn: CheckIn): Promise<void>
  abstract delete(checkIn: CheckIn): Promise<void>
}
