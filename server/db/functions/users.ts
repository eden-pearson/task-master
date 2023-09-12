import { User, UserSnakeCase } from '../../../models/users'
import db from '../connection'

export async function getAllUsers(): Promise<number[]> {
  return await db('users').select('*')
}

export async function addUser(user: UserSnakeCase): Promise<number[]> {
  return await db('users').insert(user)
}

export async function getUserByAuthId(auth0Id: string): Promise<User> {
  return await db('users')
    .where('auth0_id', auth0Id)
    .select(
      'id',
      'auth0_id as auth0Id',
      'display_name as displayName',
      'favourite_colour as favouriteColour',
      'image'
    )
    .first()
}

export async function getUserById(id: number): Promise<User> {
  return await db('users')
    .where({ id })
    .select(
      'id',
      'auth0_id as auth0Id',
      'display_name as displayName',
      'favourite_colour as favouriteColour',
      'image'
    )
    .first()
}
