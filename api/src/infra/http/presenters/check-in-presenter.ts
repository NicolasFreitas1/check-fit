import { CheckIn } from '@/domain/check-in/enterprise/entities/check-in'

export class CheckInPresenter {
  static toHTTP(checkIn: CheckIn) {
    return {
      id: checkIn.id.toString(),
      userId: checkIn.userId.toString(),
      gymId: checkIn.gymId.toString(),
      createdAt: checkIn.createdAt,
    }
  }
}
