import { CheckInWithGym } from '@/domain/check-in/enterprise/entities/value-objects/check-in-with-gym'
import { GymPresenter } from './gym-presenter'

export class CheckInWithGymPresenter {
  static toHTTP(checkIn: CheckInWithGym) {
    return {
      id: checkIn.checkInId.toString(),
      userId: checkIn.userId.toString(),
      gymId: checkIn.gymId.toString(),
      createdAt: checkIn.createdAt,
      gym: GymPresenter.toHTTP(checkIn.gym),
    }
  }
}
