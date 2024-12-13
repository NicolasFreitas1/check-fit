import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditUserUseCase } from '../edit-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditUserUseCase

describe('Edit User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new EditUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to get an user by email', async () => {
    const user = makeUser(
      { email: 'jhon.doe@email.com', name: 'Jhon Doe' },
      new UniqueEntityId('1'),
    )

    inMemoryUsersRepository.items.push(user)

    const result = await sut.execute({
      email: 'jhon.doe2@email.com',
      name: 'Jhon',
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.name).toEqual('Jhon')
    }
  })
})
