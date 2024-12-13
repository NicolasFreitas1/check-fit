import { makeCheckIn } from 'test/factories/make-check-in'
import { InMemoryCheckInsRepository } from 'test/repositories/in-memory-check-ins-repository'
import { ListCheckInsByUserUseCase } from '../list-check-ins-by-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: ListCheckInsByUserUseCase

describe('List Recent Check Ins', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new ListCheckInsByUserUseCase(
      inMemoryUsersRepository,
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to list  check ins by user', async () => {
    await inMemoryUsersRepository.create(makeUser({}, new UniqueEntityId('01')))

    await inMemoryCheckInsRepository.create(
      makeCheckIn({ userId: new UniqueEntityId('01') }),
    )
    await inMemoryCheckInsRepository.create(
      makeCheckIn({ userId: new UniqueEntityId('01') }),
    )
    await inMemoryCheckInsRepository.create(
      makeCheckIn({ userId: new UniqueEntityId('02') }),
    )

    const result = await sut.execute({
      page: 1,
      perPage: 20,
      userId: '01',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value?.checkIns).toHaveLength(2)
    }
  })
})
