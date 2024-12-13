import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  CheckIn,
  CheckInProps,
} from '@/domain/check-in/enterprise/entities/check-in'

export function makeCheckIn(
  override: Partial<CheckInProps> = {},
  id?: UniqueEntityId,
) {
  const checkIn = CheckIn.create(
    {
      gymId: new UniqueEntityId(),
      userId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return checkIn
}
