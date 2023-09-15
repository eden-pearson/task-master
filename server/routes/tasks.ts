import express from 'express'
import {
  getTasksByAuthId,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from '../db/functions/tasks.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()

// GET /api/v1/tasks/
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const tasks = await getTasksByAuthId(auth0Id)
    res.json(tasks)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'Uh oh! Something went wrong when getting the list of tasks',
    })
  }
})

// POST /api/v1/tasks
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const task = req.body.name
    const response = await createTask(task, auth0Id)
    res.json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error:
        'Uh oh! Something went wrong when adding your task to the database',
    })
  }
})

// PATCH /api/v1/tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Task ID must be a number' })
      return
    }
    const updatedTask = req.body.name
    const response = await updateTask(id, updatedTask)
    res.json(response)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'Uh oh! Something went wrong when updating your task' })
  }
})

// PATCH /api/v1/tasks/:id/status/:status
router.patch('/:id/status/:status', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Task ID must be a number' })
      return
    }
    const status = req.params.status === 'true' ? true : false
    const response = await updateTaskStatus(id, status)
    res.json(response)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'Uh oh! Something went wrong when updating your task status',
    })
  }
})

// DELETE /api/v1/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Task ID must be a number' })
      return
    }
    const response = await deleteTask(id)
    res.json(response)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'Uh oh! Something went wrong when deleting your task' })
  }
})

export default router
