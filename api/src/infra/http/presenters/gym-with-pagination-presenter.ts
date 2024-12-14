import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { GymPresenter } from './gym-presenter'

export class GymWithPaginationPresenter {
  static toHTTP(gym: DataWithPagination<Gym>) {
    return {
      gyms: gym.data.map(GymPresenter.toHTTP),
      amount: gym.amount,
      totalPages: gym.totalPages,
      actualPage: gym.actualPage,
      perPage: gym.perPage,
    }
  }
}
