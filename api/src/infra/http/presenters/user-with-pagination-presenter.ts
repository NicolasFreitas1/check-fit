import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { User } from '@/domain/check-in/enterprise/entities/user'
import { UserPresenter } from './user-presenter'

export class UserWithPaginationPresenter {
  static toHTTP(user: DataWithPagination<User>) {
    return {
      users: user.data.map(UserPresenter.toHTTP),
      amount: user.amount,
      totalPages: user.totalPages,
      actualPage: user.actualPage,
      perPage: user.perPage,
    }
  }
}
