import { DataWithPagination } from '@/core/repositories/data-with-pagination'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { CheckInsRepository } from '@/domain/check-in/application/repositories/check-ins-repository'
import { CheckIn } from '@/domain/check-in/enterprise/entities/check-in'
import { InMemoryGymsRepository } from './in-memory-gyms-repository'
import { CheckInWithGym } from '@/domain/check-in/enterprise/entities/value-objects/check-in-with-gym'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  constructor(private gymsRepository: InMemoryGymsRepository) {}

  public items: CheckIn[] = []

  async findMany({ page, perPage }: PaginationParams): Promise<CheckIn[]> {
    const checkIns = this.items.slice((page - 1) * perPage, page * perPage)

    return checkIns
  }

  async findManyByUser(
    { page, perPage }: PaginationParams,
    userId: string,
  ): Promise<DataWithPagination<CheckInWithGym>> {
    const checkIns = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * perPage, page * perPage)
      .map((checkIn) => {
        const gym = this.gymsRepository.items.find((gym) =>
          gym.id.equals(checkIn.gymId),
        )

        if (!gym) {
          throw new Error(
            `Gym with id ${checkIn.gymId.toString()} does not exists`,
          )
        }

        return CheckInWithGym.create({
          checkInId: checkIn.id,
          createdAt: checkIn.createdAt,
          gym,
          gymId: checkIn.gymId,
          userId: checkIn.userId,
        })
      })

    return {
      data: checkIns,
      actualPage: page,
      perPage,
      amount: this.items.length,
      totalPages: Math.max(1, Math.ceil(this.items.length / perPage)),
    }
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id.toString() === id)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async findByIdWithGym(id: string): Promise<CheckInWithGym | null> {
    const checkIn = this.items.find((item) => item.id.toString() === id)

    if (!checkIn) {
      return null
    }

    const gym = this.gymsRepository.items.find((gym) =>
      gym.id.equals(checkIn.gymId),
    )

    if (!gym) {
      throw new Error(`Gym with id ${checkIn.gymId.toString()} does not exists`)
    }

    return CheckInWithGym.create({
      checkInId: checkIn.id,
      createdAt: checkIn.createdAt,
      gym,
      gymId: checkIn.gymId,
      userId: checkIn.userId,
    })
  }

  async findUniqueByUser(userId: string, date: Date): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => {
      const isSameUser = item.userId.toString() === userId

      const isSameDay = item.createdAt.toDateString() === date.toDateString()

      return isSameUser && isSameDay
    })
    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async create(checkIn: CheckIn): Promise<void> {
    this.items.push(checkIn)
  }

  async save(checkIn: CheckIn): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === checkIn.id)

    this.items[itemIndex] = checkIn
  }

  async delete(checkIn: CheckIn): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === checkIn.id)

    this.items.splice(itemIndex, 1)
  }
}
