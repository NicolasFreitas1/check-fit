import { Either, left, right } from '@/core/either'
import { User } from '@/domain/check-in/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'
import { HashGenerator } from '../../cryptography/hash-generator'
import { EmailAlreadyInUseError } from '../__errors/email-already-in-use-error'

interface CreateUserUseCaseRequest {
  email: string
  name: string
  password: string
}

type CreateUserUseCaseResponse = Either<EmailAlreadyInUseError, { user: User }>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new EmailAlreadyInUseError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      email,
      name,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
