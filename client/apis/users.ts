import request from 'superagent'
import type { UpdateUser, User } from '../../models/users'

const rootUrl = '/api/v1/users'

export async function fetchProfile(username: string): Promise<User> {
  return request
    .get(`/${rootUrl}/profiles/${username}`)
    .then((res) => res.body.user)
}

export async function addProfile({
  newUser,
  token,
}: {
  newUser: UpdateUser
  token: string
}): Promise<User> {
  return request
    .post(rootUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
    .then((res) => res.body)
    .catch((error) => console.log(error))
}

export async function fetchProfileByToken(token: string): Promise<User> {
  return request
    .get(`${rootUrl}/profile`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.user ? res.body.user : null))
    .catch((error) => console.log(error))
}
