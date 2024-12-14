import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CheckIn } from '@/domain/check-in/enterprise/entities/check-in'
import { Prisma, CheckIn as PrismaCheckIn } from '@prisma/client'

export class PrismaCheckInMapper {
  static toDomain(raw: PrismaCheckIn): CheckIn {
    return CheckIn.create(
      {
        gymId: new UniqueEntityId(raw.gymId),
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(checkIn: CheckIn): Prisma.CheckInUncheckedCreateInput {
    return {
      id: checkIn.id.toString(),
      gymId: checkIn.gymId.toString(),
      userId: checkIn.userId.toString(),
      createdAt: checkIn.createdAt,
    }
  }
}
