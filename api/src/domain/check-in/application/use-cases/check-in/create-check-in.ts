import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { UserAlreadyCheckedInError } from '../__errors/user-already-checked-in-error'
import { CheckIn } from '@/domain/check-in/enterprise/entities/check-in'
import { UsersRepository } from '../../repositories/users-repository'
import { GymsRepository } from '../../repositories/gyms-repository'
import { CheckInsRepository } from '../../repositories/check-ins-repository'

interface CreateCheckInUseCaseRequest {
  userId: string
  gymId: string
}

type CreateCheckInUseCaseResponse = Either<
  ResourceNotFoundError | UserAlreadyCheckedInError,
  {
    checkIn: CheckIn
  }
>

@Injectable()
export class CreateCheckInUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private gymsRepository: GymsRepository,
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: CreateCheckInUseCaseRequest): Promise<CreateCheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const actualDate = new Date()

    const userAlreadyChecked = await this.checkInsRepository.findUniqueByUser(
      userId,
      actualDate,
    )

    if (userAlreadyChecked) {
      return left(new UserAlreadyCheckedInError())
    }

    const checkIn = CheckIn.create({
      gymId: gym.id,
      userId: user.id,
    })

    await this.checkInsRepository.create(checkIn)

    return right({
      checkIn,
    })
  }
}
