import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { Gym } from '../gym'

export interface CheckInWithGymProps {
  checkInId: UniqueEntityId
  userId: UniqueEntityId
  gymId: UniqueEntityId
  createdAt: Date
  gym: Gym
}

export class CheckInWithGym extends ValueObject<CheckInWithGymProps> {
  get checkInId() {
    return this.props.checkInId
  }

  get userId() {
    return this.props.userId
  }

  get gymId() {
    return this.props.gymId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get gym() {
    return this.props.gym
  }

  static create(props: CheckInWithGymProps) {
    return new CheckInWithGym(props)
  }
}
