import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CheckInProps {
  userId: UniqueEntityId
  gymId: UniqueEntityId
  createdAt: Date
}

export class CheckIn extends Entity<CheckInProps> {
  get userId() {
    return this.props.userId
  }

  set userId(userId: UniqueEntityId) {
    this.props.userId = userId
  }

  get gymId() {
    return this.props.gymId
  }

  set gymId(gymId: UniqueEntityId) {
    this.props.gymId = gymId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<CheckInProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const checkIn = new CheckIn(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return checkIn
  }
}
