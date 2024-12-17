import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { UsersRepository } from '@/domain/check-in/application/repositories/users-repository'
import { User } from '@/domain/check-in/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findMany({
    page,
  }: PaginationParams): Promise<DataWithPagination<User>> {
    const users = this.items.slice((page - 1) * 20, page * 20)

    return {
      data: users,
      actualPage: page,
      perPage: 20,
      amount: this.items.length,
      totalPages: Math.max(1, Math.ceil(this.items.length / 20)),
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async delete(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items.splice(itemIndex, 1)
  }
}
