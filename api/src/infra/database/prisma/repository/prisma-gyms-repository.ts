import { PaginationParams } from '@/core/repositories/pagination-params'
import { GymsRepository } from '@/domain/check-in/application/repositories/gyms-repository'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaGymMapper } from '../mappers/prisma-gym-mapper'

@Injectable()
export class PrismaGymsRepository implements GymsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page, perPage }: PaginationParams): Promise<Gym[]> {
    const gyms = await this.prisma.gym.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return gyms.map(PrismaGymMapper.toDomain)
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
