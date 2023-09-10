import express from 'express'
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getIncompleteTasks,
  getCompletedTasks,
  getTask,
  updateTaskStatus,
} from '../db/functions/tasks.ts'

const router = express.Router()

// GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks()
    res.json(tasks)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'Uh oh! Something went wrong when getting the list of tasks',
    })
  }
})

// GET /api/v1/tasks/task/:id
router.get('/task/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Task ID must be a number' })
      return
    }
    const task = await getTask(id)
    res.json(task)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Uh oh! Something fetching the task' })
  }
})

// GET /api/v1/tasks/incomplete
router.get('/incomplete', async (req, res) => {
  try {
    const tasks = await getIncompleteTasks()
    res.json(tasks)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'Uh oh! Something getting the list of incomplete tasks' })
  }
})

// GET /api/v1/tasks/complete
router.get('/complete', async (req, res) => {
  try {
    const tasks = await getCompletedTasks()
    res.json(tasks)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ error: 'Uh oh! Something getting the list of completed tasks' })
  }
})

// POST /api/v1/tasks
router.post('/', async (req, res) => {
  try {
    const task = req.body.name
    const response = await createTask(task)
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

// PATCH /api/v1/tasks/:id/:status
router.patch('/:id/:status', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Task ID must be a number' })
      return
    }
    const status = Boolean(req.params.status)
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
