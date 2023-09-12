import express from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0.js'
import {
  addUser,
  getAllUsers,
  getUserByAuthId,
  getUserById,
} from '../db/functions/users'
import { UserSnakeCase } from '../../models/users'

const router = express.Router()

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json({ users })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error: 'Uh oh! there was an error fetching all users' })
  }
})

// GET /api/v1/users/info
router.get('/info', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    console.log(auth0Id)
    const user = await getUserByAuthId(auth0Id)
    console.log(user)
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Uh oh! there was an error fetching your user information',
    })
  }
})

// // GET /api/v1/users/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const id = Number(req.params.id)
//     const user = await getUserById(id)
//     res.json({ user })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({
//       error: 'Uh oh! there was an error fetching your user information',
//     })
//   }
// })

// POST /api/v1/users
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const {
      displayName: display_name,
      favouriteColour: favourite_colour,
      image,
    } = req.body

    const newUser: UserSnakeCase = {
      display_name,
      favourite_colour,
      image,
      auth0_id: auth0Id,
    }

    const success = await addUser(newUser)
    res.json(success)
  } catch (error) {
    res.status(500).json({
      error: 'Uh oh! there was an error adding your user information',
    })
  }
})

export default router
