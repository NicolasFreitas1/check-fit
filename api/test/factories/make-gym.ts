import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Gym, GymProps } from '@/domain/check-in/enterprise/entities/gym'

export function makeGym(override: Partial<GymProps> = {}, id?: UniqueEntityId) {
  const gym = Gym.create(
    {
      name: faker.company.name(),
      description: faker.lorem.sentence({ max: 100, min: 10 }),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      phone: faker.phone.number(),
      ...override,
    },
    id,
  )

  return gym
}
