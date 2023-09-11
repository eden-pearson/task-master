import { User, UpdateUser, UserSnakeCase } from '../../../models/users'
import db from '../connection'

export async function getAllProfiles(): Promise<User[]> {
  const allProfiles = await db('users').select()
  return allProfiles
}

export async function getUserProfile(username: string): Promise<User> {
  const userProfile = await db('users')
    .select(
      'id',
      'auth0_id as auth0Id',
      'username',
      'favourite_colour as favouriteColour',
      'location',
      'image'
    )
    .where('username', username)
    .first()
  return userProfile
}

export async function updateUserProfile(
  id: number,
  updatedUser: UpdateUser
): Promise<User> {
  const [updateProfile] = await db('users')
    .where('id', id)
    .update('username', updatedUser.username)
    .update('favourite_colour', updatedUser.favouriteColour)
    .update('location', updatedUser.location)
    .update('image', updatedUser.image)
    .returning('*')
  return updateProfile
}

//AUTH0 db Queries start here
export async function addUserProfile(user: UserSnakeCase): Promise<number[]> {
  const result = await db('users').insert(user)
  return result
}

export async function getUserById(auth0Id: string): Promise<User> {
  const user = await db('users')
    .where('auth0_id', auth0Id)
    .select(
      'id',
      'auth0_id as auth0Id',
      'username',
      'favourite_colour as favouriteColour',
      'location',
      'image'
    )
    .first()
  return user
}
