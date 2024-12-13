import { faker } from '@faker-js/faker'
import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()

    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to register a new gym', async () => {
    const result = await sut.execute({
      name: 'example name',
      description: 'example description',
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      phone: '4899654212',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      gym: inMemoryGymsRepository.items[0],
    })
  })
})
