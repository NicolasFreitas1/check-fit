import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface GymProps {
  name: string
  description: string
  phone: string
  latitude: number
  longitude: number
  createdAt: Date
}

export class Gym extends Entity<GymProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description) {
    this.props.description = description
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<GymProps, 'createdAt'>, id?: UniqueEntityId) {
    const gym = new Gym(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return gym
  }
}
