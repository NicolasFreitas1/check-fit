import { Injectable } from '@nestjs/common'
import { GymsRepository } from '../../repositories/gyms-repository'
import { Either, right } from '@/core/either'
import { Gym } from '@/domain/check-in/enterprise/entities/gym'

interface CreateGymUseCaseRequest {
  name: string
  description: string
  phone: string
  latitude: number
  longitude: number
}

type CreateGymUseCaseResponse = Either<
  null,
  {
    gym: Gym
  }
>

@Injectable()
export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    name,
    phone,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = Gym.create({
      description,
      latitude,
      longitude,
      name,
      phone,
    })

    await this.gymsRepository.create(gym)

    return right({
      gym,
    })
  }
}
