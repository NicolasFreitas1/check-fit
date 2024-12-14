import { PaginationParams } from '@/core/repositories/pagination-params'
import { CheckIn } from '../../enterprise/entities/check-in'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { CheckInWithGym } from '../../enterprise/entities/value-objects/check-in-with-gym'

export abstract class CheckInsRepository {
  abstract findMany(params: PaginationParams): Promise<CheckIn[]>
  abstract findManyByUser(
    params: PaginationParams,
    userId: string,
  ): Promise<DataWithPagination<CheckInWithGym>>

  abstract findById(id: string): Promise<CheckIn | null>
  abstract findByIdWithGym(id: string): Promise<CheckInWithGym | null>
  abstract findUniqueByUser(userId: string, date: Date): Promise<CheckIn | null>
  abstract create(checkIn: CheckIn): Promise<void>
  abstract save(checkIn: CheckIn): Promise<void>
  abstract delete(checkIn: CheckIn): Promise<void>
}
