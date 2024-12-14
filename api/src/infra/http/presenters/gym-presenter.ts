import { Gym } from '@/domain/check-in/enterprise/entities/gym'

export class GymPresenter {
  static toHTTP(gym: Gym) {
    return {
      id: gym.id.toString(),
      name: gym.name,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude,
      longitude: gym.longitude,
      createdAt: gym.createdAt,
    }
  }
}
