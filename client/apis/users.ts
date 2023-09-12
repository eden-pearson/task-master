import request from 'superagent'
import type { User } from '../../models/users'

const rootUrl = '/api/v1/users'

export async function addUser({
  newUser,
  token,
}: {
  newUser: User
  token: string
}): Promise<User> {
  const res = await request
    .post(rootUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
  return res.body
}

export async function fetchUserByToken(token: string): Promise<User> {
  const res = await request
    .get(`${rootUrl}/info`)
    .set('Authorization', `Bearer ${token}`)
  return res.body.user ? res.body.user : null
}

// export async function fetchAllUsers(): Promise<User[]> {
//   const res = await request.get(rootUrl)
//   console.log(res.body.users)
//   return res.body.users
// }

// export async function fetchUserById(id: number): Promise<User> {
//   const res = await request.get(`/${rootUrl}/${id}`)
//   console.log(res.body.user)
//   return res.body.user
// }
