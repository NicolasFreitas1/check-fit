import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { GymsRepository } from '@/domain/check-in/application/repositories/gyms-repository'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Gym>> {
    const gyms = this.items.slice((page - 1) * perPage, page * perPage)

    return {
      data: gyms,
      actualPage: page,
      perPage,
      amount: this.items.length,
      totalPages: Math.max(1, Math.ceil(this.items.length / perPage)),
    }
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id.toString() === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(gym: Gym): Promise<void> {
    this.items.push(gym)
  }

  async save(gym: Gym): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === gym.id)

    this.items[itemIndex] = gym
  }

  async delete(gym: Gym): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === gym.id)

    this.items.splice(itemIndex, 1)
  }
}
