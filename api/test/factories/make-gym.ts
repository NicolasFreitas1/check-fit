import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Gym, GymProps } from '@/domain/check-in/enterprise/entities/gym'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaGymMapper } from '@/infra/database/prisma/mappers/prisma-gym-mapper'

export function makeGym(override: Partial<GymProps> = {}, id?: UniqueEntityId) {
  const gym = Gym.create(
    {
      name: faker.company.name(),
      description: faker.lorem.sentence({ max: 100, min: 10 }),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      phone: faker.phone.number().slice(1, 15)[0],
      ...override,
    },
    id,
  )

  return gym
}

@Injectable()
export class GymFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaGym(data: Partial<GymProps> = {}): Promise<Gym> {
    const gym = makeGym(data)

    await this.prisma.gym.create({
      data: PrismaGymMapper.toPrisma(gym),
    })

    return gym
  }
}
