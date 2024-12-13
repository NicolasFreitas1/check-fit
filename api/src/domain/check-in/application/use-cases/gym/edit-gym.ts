import { Injectable } from '@nestjs/common'
import { GymsRepository } from '../../repositories/gyms-repository'
import { Either, left, right } from '@/core/either'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditGymUseCaseRequest {
  gymId: string
  name: string
  description: string
  phone: string
  latitude: number
  longitude: number
}

type EditGymUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    gym: Gym
  }
>

@Injectable()
export class EditGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    gymId,
    description,
    latitude,
    longitude,
    name,
    phone,
  }: EditGymUseCaseRequest): Promise<EditGymUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    gym.description = description
    gym.name = name
    gym.latitude = latitude
    gym.longitude = longitude
    gym.phone = phone

    await this.gymsRepository.save(gym)

    return right({
      gym,
    })
  }
}
