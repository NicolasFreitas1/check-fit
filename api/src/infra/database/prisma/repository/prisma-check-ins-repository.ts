import { PaginationParams } from '@/core/repositories/pagination-params'
import { CheckInsRepository } from '@/domain/check-in/application/repositories/check-ins-repository'
import { CheckIn } from '@/domain/check-in/enterprise/entities/check-in'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaCheckInMapper } from '../mappers/prisma-check-in-mapper'
import { endOfDay, startOfDay } from 'date-fns'
import { DataWithPagination } from '@/core/repositories/data-with-pagination'

@Injectable()
export class PrismaCheckInsRepository implements CheckInsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({ page, perPage }: PaginationParams): Promise<CheckIn[]> {
    const checkIns = await this.prisma.checkIn.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    })

    return checkIns.map(PrismaCheckInMapper.toDomain)
  }

  async findManyByUser(
    { page, perPage }: PaginationParams,
    userId: string,
  ): Promise<DataWithPagination<CheckIn>> {
    const checkIns = await this.prisma.checkIn.findMany({
      where: { userId },
      skip: (page - 1) * perPage,
      take: perPage,
    })

    const countTotal = await this.prisma.checkIn.count({ where: { userId } })
    const totalPages = Math.max(1, Math.ceil(countTotal / perPage))

    return {
      data: checkIns.map(PrismaCheckInMapper.toDomain),
      actualPage: page,
      amount: countTotal,
      perPage,
      totalPages,
    }
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await this.prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    if (!checkIn) {
      return null
    }

    return PrismaCheckInMapper.toDomain(checkIn)
  }

  async findUniqueByUser(userId: string, date: Date): Promise<CheckIn | null> {
    const checkIn = await this.prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    })

    if (!checkIn) {
      return null
    }

    return PrismaCheckInMapper.toDomain(checkIn)
  }

  async create(checkIn: CheckIn): Promise<void> {
    const data = PrismaCheckInMapper.toPrisma(checkIn)

    await this.prisma.checkIn.create({ data })
  }

  async save(checkIn: CheckIn): Promise<void> {
    const data = PrismaCheckInMapper.toPrisma(checkIn)

    await this.prisma.checkIn.update({ where: { id: data.id }, data })
  }

  async delete(checkIn: CheckIn): Promise<void> {
    const data = PrismaCheckInMapper.toPrisma(checkIn)

    await this.prisma.checkIn.delete({ where: { id: data.id } })
  }
}
