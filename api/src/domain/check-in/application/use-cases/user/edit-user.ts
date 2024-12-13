import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { User } from '@/domain/check-in/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error'

interface EditUserUseCaseRequest {
  userId: string
  name: string
  email: string
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError | EmailAlreadyInUseError,
  {
    user: User
  }
>

@Injectable()
export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    userId,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const emailInUse = await this.usersRepository.findByEmail(email)

    if (emailInUse) {
      return left(new EmailAlreadyInUseError(email))
    }

    user.name = name
    user.email = email

    await this.usersRepository.save(user)

    return right({ user })
  }
}
