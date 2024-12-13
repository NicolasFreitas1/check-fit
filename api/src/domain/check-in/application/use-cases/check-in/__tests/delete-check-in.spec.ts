import { makeCheckIn } from 'test/factories/make-check-in'
import { InMemoryCheckInsRepository } from 'test/repositories/in-memory-check-ins-repository'
import { DeleteCheckInUseCase } from '../delete-check-in'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: DeleteCheckInUseCase

describe('Delete Check In', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new DeleteCheckInUseCase(inMemoryCheckInsRepository)
  })

  it('should be able delete a check in', async () => {
    const newCheckIn = makeCheckIn({}, new UniqueEntityId('check-in-1'))

    await inMemoryCheckInsRepository.create(newCheckIn)

    await sut.execute({
      checkInId: 'check-in-1',
    })

    expect(inMemoryCheckInsRepository.items).toHaveLength(0)
  })
})
