import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { CheckInWithGym } from '@/domain/check-in/enterprise/entities/value-objects/check-in-with-gym'
import { CheckInWithGymPresenter } from './check-in-with-gym-presenter'

export class CheckInWithGymPaginatedPresenter {
  static toHTTP(checkIn: DataWithPagination<CheckInWithGym>) {
    return {
      checkIns: checkIn.data.map(CheckInWithGymPresenter.toHTTP),
      amount: checkIn.amount,
      totalPages: checkIn.totalPages,
      actualPage: checkIn.actualPage,
      perPage: checkIn.perPage,
    }
  }
}
