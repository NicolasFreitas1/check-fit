import { makeGym } from 'test/factories/make-gym'
import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { DeleteGymUseCase } from '../delete-gym'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: DeleteGymUseCase

describe('Delete Gym', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new DeleteGymUseCase(inMemoryGymsRepository)
  })

  it('should be able delete a gym', async () => {
    const newGym = makeGym({}, new UniqueEntityId('gym-1'))

    await inMemoryGymsRepository.create(newGym)

    await sut.execute({
      gymId: 'gym-1',
    })

    expect(inMemoryGymsRepository.items).toHaveLength(0)
  })
})
