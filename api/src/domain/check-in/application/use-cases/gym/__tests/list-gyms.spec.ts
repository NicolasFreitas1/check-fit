import { makeGym } from 'test/factories/make-gym'
import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { ListGymsUseCase } from '../list-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: ListGymsUseCase

describe('List Recent Gyms', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new ListGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to list  gyms', async () => {
    await inMemoryGymsRepository.create(makeGym({ name: 'gym-03' }))
    await inMemoryGymsRepository.create(makeGym({ name: 'gym-02' }))
    await inMemoryGymsRepository.create(makeGym({ name: 'gym-01' }))

    const result = await sut.execute({
      page: 1,
      perPage: 20,
      filter: {},
    })

    expect(result.value?.gyms.data).toEqual([
      expect.objectContaining({ name: 'gym-03' }),
      expect.objectContaining({ name: 'gym-02' }),
      expect.objectContaining({ name: 'gym-01' }),
    ])
  })

  it('should be able to list paginated recent gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create(makeGym())
    }

    const result = await sut.execute({
      page: 2,
      perPage: 20,
      filter: {},
    })

    expect(result.value?.gyms.data).toHaveLength(2)
  })
})
