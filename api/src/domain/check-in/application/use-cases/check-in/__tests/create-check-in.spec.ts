import { makeGym } from 'test/factories/make-gym'
import { makeUser } from 'test/factories/make-user'
import { InMemoryCheckInsRepository } from 'test/repositories/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from 'test/repositories/in-memory-gyms-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { CreateCheckInUseCase } from '../create-check-in'
import { makeCheckIn } from 'test/factories/make-check-in'
import { UserAlreadyCheckedInError } from '../../__errors/user-already-checked-in-error'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateCheckInUseCase

describe('Create Check In', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()

    sut = new CreateCheckInUseCase(
      inMemoryUsersRepository,
      inMemoryGymsRepository,
      inMemoryCheckInsRepository,
    )
  })

  it('should be able to create a new check in', async () => {
    const gym = makeGym()
    const user = makeUser()

    await Promise.all([
      inMemoryGymsRepository.create(gym),
      inMemoryUsersRepository.create(user),
    ])

    const result = await sut.execute({
      gymId: gym.id.toString(),
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      checkIn: inMemoryCheckInsRepository.items[0],
    })
  })

  it('should be not able check in twice in same day', async () => {
    const gym = makeGym()
    const user = makeUser()
    const checkIn = makeCheckIn({ gymId: gym.id, userId: user.id })

    await Promise.all([
      inMemoryGymsRepository.create(gym),
      inMemoryUsersRepository.create(user),
      inMemoryCheckInsRepository.create(checkIn),
    ])

    const result = await sut.execute({
      gymId: gym.id.toString(),
      userId: user.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyCheckedInError)
  })
})
