import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { DeleteUserUseCase } from '../delete-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(inMemoryUsersRepository)
  })

  it('should be able delete a user', async () => {
    const newUser = makeUser({}, new UniqueEntityId('user-1'))

    await inMemoryUsersRepository.create(newUser)

    await sut.execute({
      currentUserId: 'user-1',
      userId: 'user-1',
    })

    expect(inMemoryUsersRepository.items).toHaveLength(0)
  })
})
