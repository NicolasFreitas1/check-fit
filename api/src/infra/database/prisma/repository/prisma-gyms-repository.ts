import { PaginationParams } from '@/core/repositories/pagination-params'
import { GymsRepository } from '@/domain/check-in/application/repositories/gyms-repository'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaGymMapper } from '../mappers/prisma-gym-mapper'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'

@Injectable()
export class PrismaGymsRepository implements GymsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<DataWithPagination<Gym>> {
    const gyms = await this.prisma.gym.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const countTotal = await this.prisma.gym.count()
    const totalPages = Math.max(1, Math.ceil(countTotal / perPage))

    return {
      data: gyms.map(PrismaGymMapper.toDomain),
      actualPage: page,
      amount: countTotal,
      perPage,
      totalPages,
    }
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await this.prisma.gym.findUnique({
      where: {
        id,
      },
    })

    if (!gym) {
      return null
    }

    return PrismaGymMapper.toDomain(gym)
  }

  async create(gym: Gym): Promise<void> {
    const data = PrismaGymMapper.toPrisma(gym)

    await this.prisma.gym.create({ data })
  }

  async save(gym: Gym): Promise<void> {
    const data = PrismaGymMapper.toPrisma(gym)

    await this.prisma.gym.update({ where: { id: data.id }, data })
  }

  async delete(gym: Gym): Promise<void> {
    const data = PrismaGymMapper.toPrisma(gym)

    await this.prisma.gym.delete({ where: { id: data.id } })
  }
}
