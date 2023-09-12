import express from 'express'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0.js'
import {
  getUserProfile,
  updateUserProfile,
  addUserProfile,
  getUserById,
  getAllProfiles,
} from '../db/functions/users'
import { UpdateUser, UserSnakeCase } from '../../models/users'

const router = express.Router()

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const profiles = await getAllProfiles()

    res.json(profiles)
  } catch (error) {
    res.status(500).json({
      error: 'Uh oh! There was an error finding the user profiles',
    })
  }
})

// GET /api/v1/users/profiles/:username
router.get('/profiles/:username', async (req, res) => {
  try {
    const username = req.params.username
    const userProfile = await getUserProfile(username)
    res.json({ user: userProfile })
  } catch (error) {
    res.status(500).json({
      error: 'Uh oh! There was an error finding your user profile',
    })
  }
})

// PATCH /api/v1/users/profiles/:id
router.patch('/profiles/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const updateProfileData = req.body as UpdateUser
    const updatedProfile = await updateUserProfile(userId, updateProfileData)
    res.json(updatedProfile)
  } catch (error) {
    res.status(500).json({
      error: 'Uh oh! There was an error updating your user profile',
    })
  }
})

//AUTH0 PROTECTED ROUTES START HERE

// GET /api/v1/users/profile
router.get('/profile', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const user = await getUserById(auth0Id)
    res.json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).send('Uh oh! there was an error fetching your profile')
  }
})

// POST /api/v1/users
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const {
      username,
      favouriteColour: favourite_colour,
      location,
      image,
    } = req.body

    const newUser: UserSnakeCase = {
      username,
      favourite_colour,
      location,
      image,
      auth0_id: auth0Id,
    }

    const success = await addUserProfile(newUser)
    res.json(success)
  } catch (error) {
    res.status(500).json({
      error: 'Uh oh! there was an error adding your profile',
    })
  }
})

export default router
