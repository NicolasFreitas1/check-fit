import { Either, right } from '@/core/either'
import { User } from '@/domain/check-in/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../../repositories/users-repository'

interface ListUsersUseCaseRequest {
  page: number
  perPage: number
}

type ListUsersUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

@Injectable()
export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
    perPage,
  }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ page, perPage })

    return right({ users })
  }
}
