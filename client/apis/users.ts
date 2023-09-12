import request from 'superagent'
import type { User } from '../../models/users'

const rootUrl = '/api/v1/users'

export async function fetchAllUsers(): Promise<User[]> {
  try {
    const res = await request.get(rootUrl)
    console.log(res.body.users)
    return res.body.users
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchUserById(id: number): Promise<User> {
  try {
    const res = await request.get(`/${rootUrl}/${id}`)
    console.log(res.body.user)
    return res.body.user
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function addUser({
  newUser,
  token,
}: {
  newUser: User
  token: string
}): Promise<User> {
  console.log(newUser)
  const res = await request
    .post(rootUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(newUser)
  console.log(res.body)
  return res.body
}

export async function fetchUserByToken(token: string): Promise<User> {
  const res = await request
    .get(`${rootUrl}/info`)
    .set('Authorization', `Bearer ${token}`)
  console.log(res.body)
  return res.body.user ? res.body.user : null
}

// **WITHOUT ERROR HANDLING**
// export async function fetchProfile(username: string): Promise<User> {
//   const res = await request.get(`/${rootUrl}/profiles/${username}`)
//   return res.body.user
// }

// export async function addProfile({
//   newUser,
//   token,
// }: {
//   newUser: UpdateUser
//   token: string
// }): Promise<User> {
//     const res = await request
//       .post(rootUrl)
//       .set('Authorization', `Bearer ${token}`)
//       .send(newUser)
//     return res.body
//   }

// export async function fetchProfileByToken(token: string): Promise<User> {
//     const res = await request
//       .get(`${rootUrl}/profile`)
//       .set('Authorization', `Bearer ${token}`)
//     return res.body.user || null
// }

// **SAME FORMAT as kes ke say**
// export async function fetchProfile(username: string): Promise<User> {
//   return request
//     .get(`/${rootUrl}/profiles/${username}`)
//     .then((res) => res.body.user)
// }

// export async function addProfile({
//   newUser,
//   token,
// }: {
//   newUser: UpdateUser
//   token: string
// }): Promise<User> {
//   return request
//     .post(rootUrl)
//     .set('Authorization', `Bearer ${token}`)
//     .send(newUser)
//     .then((res) => res.body)
//     .catch((error) => console.log(error))
// }

// export async function fetchProfileByToken(token: string): Promise<User> {
//   return request
//     .get(`${rootUrl}/profile`)
//     .set('Authorization', `Bearer ${token}`)
//     .then((res) => (res.body.user ? res.body.user : null))
//     .catch((error) => console.log(error))
// }
