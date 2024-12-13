import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserByEmailUseCase } from '../get-user-by-email'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserByEmailUseCase

describe('Get User by Email', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new GetUserByEmailUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user by email', async () => {
    const user = makeUser(
      { email: 'jhon.doe', name: 'Jhon Doe' },
      new UniqueEntityId('1'),
    )

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      userEmail: 'jhon.doe',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.name).toEqual('Jhon Doe')
    }
  })
})
