import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { User } from '@/domain/check-in/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByEmailUseCaseRequest {
  userEmail: string
}

type GetUserByEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userEmail,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(userEmail)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({ user })
  }
}
