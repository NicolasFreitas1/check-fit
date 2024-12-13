import { PaginationParams } from '@/core/repositories/pagination-params'
import { Gym } from '../../enterprise/entities/gym'

export abstract class GymsRepository {
  abstract findMany(params: PaginationParams): Promise<Gym[]>
  abstract findById(id: string): Promise<Gym | null>
  abstract create(Gym: Gym): Promise<void>
  abstract save(Gym: Gym): Promise<void>
  abstract delete(Gym: Gym): Promise<void>
}
