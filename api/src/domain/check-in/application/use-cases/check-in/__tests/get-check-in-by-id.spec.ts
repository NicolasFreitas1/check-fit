import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeCheckIn } from 'test/factories/make-check-in'
import { InMemoryCheckInsRepository } from 'test/repositories/in-memory-check-ins-repository'
import { GetCheckInByIdUseCase } from '../get-check-in-by-id'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetCheckInByIdUseCase

describe('Get Check In by Id', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()

    sut = new GetCheckInByIdUseCase(inMemoryCheckInsRepository)
  })

  it('should be able to get an check in by id', async () => {
    const checkIn = makeCheckIn({}, new UniqueEntityId('1'))

    inMemoryCheckInsRepository.items.push(checkIn)

    const result = await sut.execute({
      checkInId: '1',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.checkIn.id.toString()).toEqual('1')
    }
  })
})
