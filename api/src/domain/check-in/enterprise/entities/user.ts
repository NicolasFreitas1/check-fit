import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: string
  email: string
  password: string
  isAdmin: boolean
  createdAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get isAdmin() {
    return this.props.isAdmin
  }

  set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'isAdmin'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        isAdmin: props.isAdmin ?? false,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
