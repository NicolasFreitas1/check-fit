import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  CheckIn,
  CheckInProps,
} from '@/domain/check-in/enterprise/entities/check-in'
import { PrismaCheckInMapper } from '@/infra/database/prisma/mappers/prisma-check-in-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeCheckIn(
  override: Partial<CheckInProps> = {},
  id?: UniqueEntityId,
) {
  const checkIn = CheckIn.create(
    {
      gymId: new UniqueEntityId(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return checkIn
}
@Injectable()
export class CheckInFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCheckIn(data: Partial<CheckInProps> = {}): Promise<CheckIn> {
    const checkIn = makeCheckIn(data)

    await this.prisma.checkIn.create({
      data: PrismaCheckInMapper.toPrisma(checkIn),
    })

    return checkIn
  }
}
