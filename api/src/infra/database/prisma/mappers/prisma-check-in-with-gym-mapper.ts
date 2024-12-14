import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CheckInWithGym } from '@/domain/check-in/enterprise/entities/value-objects/check-in-with-gym'
import { CheckIn as PrismaCheckIn, Gym as PrismaGym } from '@prisma/client'
import { PrismaGymMapper } from './prisma-gym-mapper'

type PrismaCheckInWithGym = PrismaCheckIn & {
  gym: PrismaGym
}

export class PrismaCheckInWithGymMapper {
  static toDomain(raw: PrismaCheckInWithGym): CheckInWithGym {
    return CheckInWithGym.create({
      checkInId: new UniqueEntityId(raw.id),
      createdAt: raw.createdAt,
      gym: PrismaGymMapper.toDomain(raw.gym),
      gymId: new UniqueEntityId(raw.gymId),
      userId: new UniqueEntityId(raw.userId),
    })
  }
}
