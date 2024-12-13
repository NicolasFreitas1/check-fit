import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeGym } from 'test/factories/make-gym'
import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { EditGymUseCase } from '../edit-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: EditGymUseCase

describe('Edit Gym', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()

    sut = new EditGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to get an gym by email', async () => {
    const gym = makeGym(
      { description: 'Example Gym Description', name: 'Gym 01' },
      new UniqueEntityId('1'),
    )

    inMemoryGymsRepository.items.push(gym)

    const result = await sut.execute({
      description: 'Example Gym Description',
      name: 'Gym',
      latitude: gym.latitude,
      longitude: gym.longitude,
      phone: gym.phone,
      gymId: gym.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.gym.name).toEqual('Gym')
    }
  })
})
