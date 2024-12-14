import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { Prisma, Gym as PrismaGym } from '@prisma/client'

export class PrismaGymMapper {
  static toDomain(raw: PrismaGym): Gym {
    return Gym.create(
      {
        description: raw.description,
        latitude: raw.latitude.toNumber(),
        longitude: raw.longitude.toNumber(),
        name: raw.name,
        phone: raw.phone,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(gym: Gym): Prisma.GymUncheckedCreateInput {
    return {
      id: gym.id.toString(),
      name: gym.name,
      description: gym.description,
      latitude: gym.latitude,
      longitude: gym.longitude,
      phone: gym.phone,
      createdAt: gym.createdAt,
    }
  }
}
