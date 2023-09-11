export interface UserSnakeCase {
  id?: number
  auth0_id: string
  username: string
  favourite_colour: string
  location: string
  image: string
}

export interface User {
  id: number
  auth0Id: string
  username: string
  favouriteColour: string
  location: string
  image: string
}

export interface UpdateUser {
  username: string
  favouriteColour: string
  location: string
  image: string
}
