import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeCheckIn } from 'test/factories/make-check-in'
import { InMemoryCheckInsRepository } from 'test/repositories/in-memory-check-ins-repository'
import { GetCheckInByIdUseCase } from '../get-check-in-by-id'
import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { makeGym } from 'test/factories/make-gym'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: GetCheckInByIdUseCase

describe('Get Check In by Id', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()

    inMemoryCheckInsRepository = new InMemoryCheckInsRepository(
      inMemoryGymsRepository,
    )

    sut = new GetCheckInByIdUseCase(inMemoryCheckInsRepository)
  })

  it('should be able to get an check in by id', async () => {
    await inMemoryGymsRepository.create(makeGym({}, new UniqueEntityId('01')))
    const checkIn = makeCheckIn(
      { gymId: new UniqueEntityId('01') },
      new UniqueEntityId('1'),
    )

    inMemoryCheckInsRepository.items.push(checkIn)

    const result = await sut.execute({
      checkInId: '1',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.checkIn.checkInId.toString()).toEqual('1')
    }
  })
})
