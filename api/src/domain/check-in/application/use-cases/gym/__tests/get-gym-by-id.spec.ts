import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { GetGymByIdUseCase } from '../get-gym-by-id'
import { makeGym } from 'test/factories/make-gym'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: GetGymByIdUseCase

describe('Get Gym by Id', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()

    sut = new GetGymByIdUseCase(inMemoryGymsRepository)
  })

  it('should be able to get an gym by id', async () => {
    const gym = makeGym({ name: 'Example Gym' }, new UniqueEntityId('1'))

    inMemoryGymsRepository.items.push(gym)

    const result = await sut.execute({
      gymId: '1',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.gym.name).toEqual('Example Gym')
    }
  })
})
